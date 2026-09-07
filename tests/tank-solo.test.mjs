import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

// Bundle the imported port's extensionless TypeScript imports for Node tests.
const compiled = await build({entryPoints:[fileURLToPath(new URL('../app/tank/solo-session.ts',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm',target:'es2022'});
const { SoloSession } = await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].text).toString('base64'));

test('default legacy stick turns immediately, drives beyond half radius and never auto-reverses',()=>{
  const session = new SoloSession(123);
  session.match.root.game.tank0._rotation=0;
  session.stick={x:.2,y:0};
  assert.equal(session.input().legacy.angle,90);
  assert.equal(session.input().forward,false);
  session.stick={x:0,y:-.5};assert.equal(session.input().forward,false);
  session.stick={x:0,y:-.501};assert.equal(session.input().forward,true);
  session.stick={x:0,y:1};assert.equal(session.input().backup,false);assert.equal(session.input().legacy.angle,-180);
  session.stick={x:.05,y:0};assert.equal(session.input().legacy.distance,0);assert.equal(session.input().legacy.angle,0);
  session.clearInput();assert.equal(session.input().fire,false);assert.equal(session.input().forward,false);
});

test('legacy heading reaches the physics engine and keyboard remains usable after release',()=>{
  const session=new SoloSession(123);session.resume();
  const tank=session.match.root.game.tank0;session.match.walls=[];
  tank._x=tank.x=200;tank._y=tank.y=200;tank._rotation=0;
  session.stick={x:.2,y:0};session.advance(40);
  assert.equal(tank._rotation,90);assert.equal(tank.x,200);assert.equal(tank.y,200);
  session.stick={x:1,y:0};session.advance(40);assert.ok(tank.x>200);
  session.clearInput();const angle=tank._rotation;session.keyboard.turnLeft=true;session.advance(40);
  assert.equal(tank._rotation,angle-10);
});

test('pause freezes simulation, clears all controls, and does not catch up on resume',()=>{
  const session=new SoloSession(123);
  session.advance(200);assert.equal(session.match.tick,0);
  session.resume();session.advance(40);assert.equal(session.match.tick,1);
  session.stick={x:0,y:-1};session.keyboard.fire=true;session.fireHeld=true;session.firePulse=true;
  session.pause();session.advance(100000);assert.equal(session.match.tick,1);
  const cleared=session.input();assert.ok(['forward','backup','turnLeft','turnRight','fire'].every(key=>cleared[key]===false));assert.equal(cleared.legacy.distance,0);
  session.resume();session.advance(40);assert.equal(session.match.tick,2);
});

test('a quick fire tap survives until the next tick and projectiles reflect from a wall',()=>{
  const session=new SoloSession(123),m=session.match,t=m.root.game.tank0;
  t._x=t.x=200;t._y=t.y=200;t._rotation=90;
  m.walls=[{x1:240,y1:0,x2:240,y2:500,half:3}];
  session.resume();session.firePulse=true;session.advance(40);
  assert.equal(m.inputs[0].fire,true);assert.equal(session.firePulse,false);
  let reflected=false;
  for(let i=0;i<10;i++){session.advance(40);reflected ||= m.root.game.children.some(c=>c.kind==='bullet'&&!c.removed&&c.xSpeed<0);}
  assert.ok(reflected);
});

test('Laika moves and fires autonomously; rounds settle and restart resets scores',()=>{
  const session=new SoloSession(573),m=session.match;
  const start={x:m.root.game.tank1.x,y:m.root.game.tank1.y};let moved=false,fired=false;
  session.resume();
  for(let i=0;i<1800;i++){session.advance(40);const tank=m.root.game.tank1;moved ||= Math.hypot(tank.x-start.x,tank.y-start.y)>5;fired ||= tank.bulletsFired>0;}
  assert.ok(moved);assert.ok(fired);assert.ok(m.round>1);
  assert.deepEqual(m.config.weapons,['laser']);assert.equal(m.history.length,0);
  session.restart(123);assert.equal(session.playing,false);assert.deepEqual(session.match.scores,[0,0]);assert.equal(session.match.round,1);
});

test('destroying Laika awards the player a point and automatically starts another round',()=>{
  const session=new SoloSession(123);session.resume();session.match.root.destroyTank(1);
  for(let i=0;i<75;i++)session.advance(40);
  assert.deepEqual(session.match.scores,[1,0]);
  for(let i=0;i<54;i++)session.advance(40);
  assert.equal(session.match.round,2);
  assert.equal(session.match.view().entities.filter(e=>e.kind==='gameTank').length,2);
});
