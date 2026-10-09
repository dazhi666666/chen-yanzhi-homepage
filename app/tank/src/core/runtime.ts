// Minimal AVM1 display/geometry bridge. Gameplay scripts are built ahead of time.
import {installCore,installTank,installLaika,installers,tickCrates} from '../generated/original.js';
import {idleInput,wrap,validateInput,type TankInput} from './input';
import geometry from '../generated/geometry.json';
import masks from '../generated/collision.json';
import soundBindings from '../generated/sound-bindings.json';
export const TICK_MS=40;
export const DEFAULT_WEAPONS=['laser','frag','gatling','homing','deathRay','mine','remote'];
export const EXTRA_WEAPONS=['electric','shield','elToro'];
export interface MatchConfig { players:{name:string;ai:boolean}[]; weapons?:string[] }
export interface Point {x:number;y:number}
export interface Wall {x1:number;y1:number;x2:number;y2:number;half:number}
export interface Gradient {type:string;colors:number[];alphas:number[];ratios:number[];box:{x:number;y:number;w:number;h:number;r:number}}
export interface DrawPath {points:Point[];width:number;color:number;alpha:number;fill?:number;fillAlpha?:number;gradient?:Gradient;fillGradient?:Gradient}
export interface RenderEntity {id:number;kind:string;x:number;y:number;rotation:number;sx:number;sy:number;alpha:number;frame:number;color:number;paths:DrawPath[];weapon?:string;alive?:boolean;player?:number;equipment?:string;ownerPlayer?:number;visualAge?:number;motion?:any}
export interface SoundEvent {name:string;action:'start'|'stop';offset?:number;loops?:number}
export interface ViewState {tick:number;round:number;phase:string;width:number;height:number;scale:number;walls:Wall[];entities:RenderEntity[];scores:number[];names:string[];sounds:SoundEvent[]}
export interface MatchSnapshot {version:1;seed:number;config:MatchConfig;tick:number;runs:{count:number;inputs:(number|TankInput)[]}[]}
const noop=()=>{};
export class RNG {
  constructor(public state:number) {this.state=state>>>0||1;}
  next=()=>{let x=this.state;x^=x<<13;x^=x>>>17;x^=x<<5;this.state=x>>>0;return this.state/4294967296;};
}
export class Clip {
  [key:string]:any;
  _x=0;_y=0;_rotationValue=0;_xscale=100;_yscale=100;_alpha=100;_visible=true;_currentframe=1;
  removed=false;playing=false;visualAge=0;paths:DrawPath[]=[];children:Clip[]=[];kind='';color=0;uid:number;
  localWidth=1;localHeight=1;
  constructor(public match:Match,public _parent:Clip|null,public name:string,kind=''){
    this.uid=match.nextId++;this.kind=kind;
    // AVM1 member enumeration exposes child clips; infrastructure must not enter AI entity scans.
    for(const key of Object.keys(this))Object.defineProperty(this,key,{enumerable:false,writable:true,configurable:true,value:this[key]});
  }
  get _X(){return this._x;}set _X(v:number){this._x=v;}
  get _Y(){return this._y;}set _Y(v:number){this._y=v;}
  get _rotation(){return this._rotationValue;}set _rotation(v:number){this._rotationValue=wrap(v);}
  get _width(){return this.localWidth*Math.abs(this._xscale)/100;}set _width(v:number){this.localWidth=v;}
  get _height(){return this.localHeight*Math.abs(this._yscale)/100;}set _height(v:number){this.localHeight=v;}
  getNextHighestDepth(){return this.match.nextDepth++;}
  getDepth(){return this.depth??this.uid;}
  swapDepths(other:Clip|number){this.depth=typeof other==='number'?other:other.getDepth();}
  createEmptyMovieClip(name:string,depth:number){return this.attachMovie('',name,depth);}
  attachMovie(kind:string,name:string,depth:number){
    const old=this[name];if(old instanceof Clip)old.removeMovieClip();
    const clip=new Clip(this.match,this,name,kind);clip.depth=depth;this.children.push(clip);this[name]=clip;
    clip.prepare();
    const installer=(installers as Record<string,Function>)[kind];
    if(installer)this.match.pending.push(()=>installer.call(clip,clip,this.match.environment(clip)));
    return clip;
  }
  prepare(){
    if(['bullet','fragbomb','gatlingBullet','homingbullet','rCMissile','electricbullet','mine','fragbombfragment'].includes(this.kind)){
      this.background=new Clip(this.match,this,'background');this.localWidth=6;this.localHeight=6;
    }
    if(this.kind==='gameTank'){
      this.base=new Clip(this.match,this,'base','base');this.base.localWidth=geometry.base[0][2];this.base.localHeight=geometry.base[0][3];
      this.turret=new Clip(this.match,this,'turret','turret');this.turret.localWidth=geometry.turret[0][2];this.turret.localHeight=geometry.turret[0][3];
      this.base.background=new Clip(this.match,this.base,'background');this.turret.background=new Clip(this.match,this.turret,'background');
      this.localWidth=61;this.localHeight=95.5;
    }
    if(this.kind==='crate'){this.localWidth=30;this.localHeight=30;}
  }
  removeMovieClip(){
    if(this.removed)return;this.removed=true;
    if(this._parent?.[this.name]===this)delete this._parent[this.name];
    this.children.forEach(c=>c.removeMovieClip());
  }
  gotoAndStop(frame:number|string){this._currentframe=typeof frame==='number'?frame:1;this.playing=false;if(this.kind==='turret'){const b=geometry.turret[Math.min(this._currentframe-1,geometry.turret.length-1)];this.localWidth=b[2];this.localHeight=b[3];}}
  gotoAndPlay(frame:number|string){this.gotoAndStop(frame);this.playing=true;}
  play(){this.playing=true;}stop(){this.playing=false;}
  clear(){this.paths=[];this.currentPath=undefined;this.pen=undefined;}
  lineStyle(width=0,color=0,alpha=100){const last=this.currentPath?.points.at(-1)??this.pen;this.style={width:width||0,color,alpha};this.currentPath=undefined;this.pen=last;}
  lineGradientStyle(type:string,colors:number[],alphas:number[],ratios:number[],box:Gradient['box']){this.style={...this.style,alpha:100,gradient:{type,colors:[...colors],alphas:[...alphas],ratios:[...ratios],box:{...box}}};}
  beginGradientFill(type:string,colors:number[],alphas:number[],ratios:number[],box:Gradient['box']){this.beginFill(colors[0],100);this.fillGradient={type,colors:[...colors],alphas:[...alphas],ratios:[...ratios],box:{...box}};}
  beginFill(color:number,alpha=100){this.fill=color;this.fillAlpha=alpha;this.currentPath=undefined;}
  endFill(){this.fill=undefined;this.fillGradient=undefined;this.currentPath=undefined;}
  moveTo(x:number,y:number){const p={points:[{x,y}],...(this.style??{width:0,color:0,alpha:100}),fill:this.fill,fillAlpha:this.fillAlpha,fillGradient:this.fillGradient};this.paths.push(p);this.currentPath=p;this.pen={x,y};}
  lineTo(x:number,y:number){if(!this.currentPath)this.moveTo(this.pen?.x??0,this.pen?.y??0);this.currentPath.points.push({x,y});this.pen={x,y};}
  curveTo(cx:number,cy:number,x:number,y:number){
    const p=this.currentPath?.points.at(-1)??{x:0,y:0};for(let i=1;i<=8;i++){const t=i/8;this.lineTo((1-t)**2*p.x+2*(1-t)*t*cx+t*t*x,(1-t)**2*p.y+2*(1-t)*t*cy+t*t*y);}
  }
  localToGlobal(p:Point){
    let c:Clip|null=this;
    while(c){const a=c._rotation*Math.PI/180,x=p.x*c._xscale/100,y=p.y*c._yscale/100;p.x=c._x+x*Math.cos(a)-y*Math.sin(a);p.y=c._y+x*Math.sin(a)+y*Math.cos(a);c=c._parent;}
  }
  globalToLocal(p:Point){
    const chain:Clip[]=[];let c:Clip|null=this;while(c){chain.unshift(c);c=c._parent;}
    for(c of chain){const a=-c._rotation*Math.PI/180,x=p.x-c._x,y=p.y-c._y;p.x=(x*Math.cos(a)-y*Math.sin(a))*100/c._xscale;p.y=(x*Math.sin(a)+y*Math.cos(a))*100/c._yscale;}
  }
  hitTest(x:number,y:number,shape=true){
    const p={x,y};this.globalToLocal(p);
    if(this.kind==='mazeBackground'){const r=this.match.root,half=Math.floor(r.SCALE/16)+1;return Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=-half&&p.y>=-half&&p.x<=r.WIDTH*r.SCALE+half&&p.y<=r.HEIGHT*r.SCALE+half;}
    if(this.kind==='maze')return this.match.walls.some(w=>p.x>=Math.min(w.x1,w.x2)-w.half&&p.x<=Math.max(w.x1,w.x2)+w.half&&p.y>=Math.min(w.y1,w.y2)-w.half&&p.y<=Math.max(w.y1,w.y2)+w.half);
    if(this.kind==='gameTank'){
      if(!shape){const q={x:0,y:0};this.localToGlobal(q);const a=this._rotation*Math.PI/180,w=this.localWidth*this._xscale/100,h=this.localHeight*this._yscale/100;return Math.abs(x-q.x)<=(Math.abs(w*Math.cos(a))+Math.abs(h*Math.sin(a)))/2&&Math.abs(y-q.y)<=(Math.abs(w*Math.sin(a))+Math.abs(h*Math.cos(a)))/2;}
      const sample=(mask:typeof masks.base[0])=>{const row=mask.rows[Math.floor((p.y-mask.y)*mask.scale)],x=Math.floor((p.x-mask.x)*mask.scale);if(!row)return false;for(let i=0;i<row.length;i+=2)if(x>=row[i]&&x<row[i+1])return true;return false;};
      return sample(masks.base[0])||sample(masks.turret[Math.max(0,Math.min(this.turret._currentframe-1,masks.turret.length-1))]);
    }
    // Dynamic ray/arc geometry is tested in local coordinates, independent of raster resolution.
    for(const line of this.paths)for(let i=1;i<line.points.length;i++){
      const a=line.points[i-1],b=line.points[i],dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1)));
      if(Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy)<=Math.max(.5,line.width/2))return true;
    }
    return false;
  }
}
export class Match {
  pending:(()=>void)[]=[];
  flush(){while(this.pending.length){const jobs=this.pending.splice(0);jobs.forEach(f=>f());}}
  root:Clip; rng:RNG;nextId=1;nextDepth=1;tick=0;round=0;walls:Wall[]=[];scores:number[];inputs:TankInput[]=[];sounds:SoundEvent[]=[];config:MatchConfig;
  seed:number;history:{count:number;inputs:(number|TankInput)[]}[]=[];
  visualRng=new RNG(0x9e3779b9);
  constructor(config:MatchConfig,seed=1){
    if(config.players.length<2||config.players.length>3)throw Error('需要 2 至 3 个席位');
    this.config={players:config.players.map(p=>({...p})),weapons:config.players.some(p=>p.ai)?['laser']:[...(config.weapons??DEFAULT_WEAPONS)]};
    this.seed=seed;this.rng=new RNG(seed);this.visualRng=new RNG(seed^0x9e3779b9);this.scores=config.players.map(()=>0);this.root=new Clip(this,null,'root');
    const r=this.root;r.DEBUG=false;r.soundOn=true;r.settingsUseSmoothCollision=true;r.settingsUseNewMouseControl=true;
    r.scopeCross=new Clip(this,null,'scopeCross');r.scopeCircle=new Clip(this,null,'scopeCircle');
    r.settingsMaxBullets=5;r.settingsMaxCrates=3;r.settingsCrateSpawnModifier=1;r.settingsActiveWeapons=this.config.weapons;r.TANKS=config.players.length;
    installCore(r,this.environment(r));
    r.BULLETSPEED=6;// Demo pacing: faster shells than the ported default of 4.5.
    const setWeapon=r.setWeapon;
    r.setWeapon=(owner:Clip,weapon:string)=>{
      // Shield is equipment in the original, never a weapon that replaces the fire action.
      if(weapon==='shield'){r.setEquipment(owner,'shield');return;}
      setWeapon(owner,weapon);
    };
    r.drawMaze=(maze:any,scale:number)=>this.drawMaze(maze,scale);
    const destroy=r.destroyTank;r.destroyTank=(n:number)=>{if(r.game['tank'+n]?.alive)destroy(n);};r.registerHit=noop;
    r.loginInfo={};this.config.players.forEach((_,i)=>{r.loginInfo['p'+(i+1)+'trac']=r.loginInfo['p'+(i+1)+'turc']=[0xb53532,0x428251,0x385fa2][i];});
    // No rank/achievement/legacy web service side effects.
    r.log=noop;r.achievementProgress=noop;r.Laika={growl:noop,scoff:noop};
    const soundAliases={soundExplosion:'explosion3',soundExplosion2:'explosion4',soundBullet:'soundBullet',soundBounce0:'pingpong',soundBounce1:'pingpong2',soundPoof:'soundPoof',soundLaser:'soundLaser',soundFragBomb:'soundFragBomb',soundFragment:'soundFragment',soundFragmentHit:'soundFragmentHit',soundFragmentHit2:'soundFragmentHit2',soundCrate:'crateSpawn',soundClick:'click',soundHoming:'soundHoming',soundHoming2:'soundHoming2',soundHoming3:'soundHomingFire',soundMineLand:'soundMineLand',soundMineActivate:'soundMineActivate',soundMineArm:'soundMineArm',soundMineDetonate:'soundMineDetonateCharge',soundRemoteSignal:'soundRemoteSignal',soundCrateLand:'soundCrateLand',soundDeathRayCharge:'soundDeathRayCharge',soundDeathRayFire:'soundDeathRayFire',soundGatlingMotor:'soundGatlingMotor',soundGatlingMotorStart:'soundGatlingMotorStart',soundGatlingMotorStop:'soundGatlingMotorStop',soundGatlingShot:'soundGatlingShot'};
    for(const [k,name] of Object.entries({...soundAliases,...soundBindings}))r[k]={start:(offset=0,loops=1)=>{if(this.sounds.length<40)this.sounds.push({name,action:'start',offset,loops});},stop:()=>{if(this.sounds.length<40)this.sounds.push({name,action:'stop'});}};
    this.nextRound();
  }
  environment(clip:Clip):any {
    const math=Object.create(Math);math.random=this.rng.next;
    const visualMath=Object.create(Math);visualMath.random=this.visualRng.next;
    return {_root:this.root,MovieClip:Clip,Math:math,visualMath,visualRandom:(n:number)=>Math.floor(this.visualRng.next()*n),random:(n:number)=>Math.floor(this.rng.next()*n),substring:(s:any,start:number,length:number)=>String(s).substr(Math.max(0,start-1),length),trace:noop,
      Color:class {constructor(public clip:Clip){}setRGB(c:number){this.clip.color=c;}setTransform(_:any){}},
      Key:{isDown:(key:number)=>{const tank=clip.kind==='rCMissile'?clip.owner:clip;return !!this.inputs[tank?.playerNumber]?.[(['turnLeft','forward','turnRight','backup','fire'] as const)[key%10]];}}};
  }
  drawMaze(maze:number[][][],scale:number){
    const r=this.root;r.game.createEmptyMovieClip('mazebg',-1000).kind='mazeBackground';const mc=r.game.createEmptyMovieClip('mazemc',-999);mc.kind='maze';this.walls=[];
    const w=maze.length,h=maze[0].length,half=Math.floor(scale/16);
    const add=(x1:number,y1:number,x2:number,y2:number)=>this.walls.push({x1:Math.floor(x1*scale),y1:Math.floor(y1*scale),x2:Math.floor(x2*scale),y2:Math.floor(y2*scale),half});
    for(let x=0;x<w;x++)for(let y=0;y<h;y++){
      if(maze[x][y][1])add(x,y+1,x+1,y+1);if(maze[x][y][2])add(x,y,x,y+1);
    }
    add(0,0,w,0);add(w,0,w,h);add(0,h,w,h);add(0,0,0,h);
  }
  nextRound(){
    const r=this.root;this.round++;if(r.game)r.game.removeMovieClip();r.createEmptyMovieClip('game',0);
    r.reachable=[];const spawns:any[]=[];r.setupStandardMaze(spawns);r.crateSpawnPoints=[];
    r.distancesForMaze=Array.from({length:r.maze.length},()=>[]);
    for(const p of r.reachable)r.distancesForMaze[p.x][p.y]=r.calcDistances(r.maze,p.x,p.y);
    r.deadEnds=r.findDeadEnds(r.maze,r.reachable);r.tankFields=spawns.map(p=>({x:p.x,y:p.y}));
    r.aliveCount=r.TANKS;r.endCount=-1;r.resetCount=-1;r.frozen=false;r.shake=0;
    r.crateTimer=r.CRATESPAWNTIMEBASE+Math.floor(this.rng.next()*r.CRATESPAWNTIMERANDOM);
    for(let i=0;i<r.TANKS;i++){
      const t=r.game.attachMovie('gameTank','tank'+i,r.game.getNextHighestDepth());t._x=(spawns[i].x+.5)*r.SCALE;t._y=(spawns[i].y+.5)*r.SCALE;t._rotation=Math.floor(this.rng.next()*36)*10;t._xscale=t._yscale=.55*r.SCALE;
      t.playerNumber=i;t.username=this.config.players[i].name;t.mouseTank=false;t.scoreboard={tankIcon:{setTurretColor:noop,setTracksColor:noop}};
      t.baseColor=t.turretColor=[0xb53532,0x428251,0x385fa2][i];
      ['KEYTURNLEFT','KEYFORWARD','KEYTURNRIGHT','KEYBACKUP','KEYFIRE'].forEach((k,j)=>t[k]=i*10+j);
      installTank(t,this.environment(t));r.setEquipment(t,'none');r.setWeapon(t,'bullet');
      if(this.config.players[i].ai){const ai=new Clip(this,t,'AI','AI');t.AI=ai;installLaika(ai,this.environment(ai));ai.myTank=t;ai.myMaze=r.maze;}
    }
  }
  step(inputs:TankInput[]=[]){
    this.tick++;this.sounds=[];this.inputs=this.config.players.map((_,i)=>inputs[i]??idleInput());const r=this.root;
    const keys=['forward','backup','turnLeft','turnRight','fire'] as const;
    const bits=this.inputs.map(input=>input.legacy?JSON.parse(JSON.stringify(input)):keys.reduce((mask,key,i)=>mask|(input[key]?1<<i:0),0));const last=this.history.at(-1);
    if(last&&JSON.stringify(last.inputs)===JSON.stringify(bits))last.count++;else this.history.push({count:1,inputs:bits});
    // Update global maze fields and crate scheduling before clip scripts.
    this.flush();tickCrates(r,this.environment(r));this.flush();
    const clips:Clip[]=[];const gather=(c:Clip)=>{for(const child of c.children)if(!child.removed){clips.push(child);gather(child);}};gather(r.game);
    for(const c of clips){
      if(c.removed)continue;
      if(!r.frozen)c.visualAge++;
      if(c.kind==='shieldGraphic'){
        if(c.shield?.removed||!c.owner?.alive){c.removeMovieClip();continue;}
        if(!c.inited)c.init();
      }
      const legacy=c.kind==='gameTank'&&!c.AI?this.inputs[c.playerNumber]?.legacy:undefined;
      const previousMouseControl=r.settingsUseNewMouseControl;
      if(c.kind==='gameTank'&&!c.AI)c.mouseTank=!!legacy;
      if(legacy){c.mouseTank=true;r.settingsUseNewMouseControl=false;const angle=(legacy.angle-90)*Math.PI/180;c.deltaX=Math.cos(angle)*Math.max(.001,legacy.distance);c.deltaY=Math.sin(angle)*Math.max(.001,legacy.distance);c.deltaLength=legacy.distance;r.xMouse=c._x+c.deltaX;r.yMouse=c._y+c.deltaY;c.fire=this.inputs[c.playerNumber].fire;}
      if(c.kind==='rCMissile'&&c.owner?.mouseTank){const input=this.inputs[c.owner.playerNumber]?.legacy;if(input){const a=(input.angle-90)*Math.PI/180;r.game.mazemc._xmouse=c._x+Math.cos(a)*120;r.game.mazemc._ymouse=c._y+Math.sin(a)*120;}}
      if(c.onEnterFrame)c.onEnterFrame.call(c);this.flush();
      if(c.kind==='gameTank'&&!c.AI)c.mouseTank=!!legacy;
      r.settingsUseNewMouseControl=previousMouseControl;
      if(c.kind==='gameTank'){
        const turret=c.turret;if(turret.playing){turret._currentframe++;if(turret._currentframe===4)turret.gotoAndStop(1);if(turret._currentframe===12)turret.gotoAndStop(7);if(turret._currentframe===31)turret.stop();}
      }
    }
    const prune=(c:Clip)=>{c.children=c.children.filter(ch=>!ch.removed);c.children.forEach(prune);};prune(r.game);
    if(r.aliveCount<=1){
      if(r.endCount>=0)r.endCount--;
      if(r.endCount===r.NUMBEROFFRAMESFROZEN){r.frozen=true;for(let i=0;i<r.TANKS;i++)if(r.game['tank'+i].alive)this.scores[i]++;}
      if(r.endCount===0)r.resetCount=r.NUMBEROFFRAMESBEFORERESET;
    }
    if(r.resetCount>=0)r.resetCount--;if(r.resetCount===0)this.nextRound();
  }
  view():ViewState {
    const entities:RenderEntity[]=[];
    const visit=(c:Clip)=>{
      if(c.removed)return;
      if(c._visible&&c.kind!=='maze'&&(c.kind||c.paths.length)){
        const p={x:0,y:0};c.localToGlobal(p);
        let motion:any;
        if(c.kind==='gameTank'){
          motion={};for(const key of ['forwardSpeed','backUpSpeed','turnSpeed','hitPointsFront','hitPointsRear','hitPointsLeft','hitPointsRight'])motion[key]=c[key];
          motion.locked=this.root.lockedControl(c,c.currentWeapon)||this.root.frozen;
        }
        entities.push({id:c.uid,kind:c.kind||'effect',x:p.x,y:p.y,rotation:c._rotation,sx:c._xscale/100,sy:c._yscale/100,alpha:c._alpha/100,frame:c.kind==='gameTank'?c.turret._currentframe:c._currentframe,color:c.turretColor??c.background?.color??c.color,paths:c.paths,weapon:c.currentWeapon??c.weapon,alive:c.alive,player:c.playerNumber,equipment:c.currentEquipment,ownerPlayer:c.owner?.playerNumber,visualAge:c.visualAge,motion});
      }
      c.children.forEach(visit);
    };visit(this.root.game);
    return {tick:this.tick,round:this.round,phase:this.root.frozen?'结算':this.root.aliveCount<=1?'回合即将结束':'对战中',width:this.root.WIDTH*this.root.SCALE,height:this.root.HEIGHT*this.root.SCALE,scale:this.root.SCALE,walls:this.walls,entities,scores:[...this.scores],names:this.config.players.map(p=>p.name),sounds:[...this.sounds]};
  }
  // Portable checkpoint reconstructs AVM closures through deterministic replay. Cost is O(tick).
  // Network reconnection sends the current authoritative view and does not replay history.
  snapshot():MatchSnapshot{return {version:1,seed:this.seed,config:JSON.parse(JSON.stringify(this.config)),tick:this.tick,runs:this.history.map(r=>({count:r.count,inputs:[...r.inputs]}))};}
  static restore(snapshot:MatchSnapshot):Match {
    if(snapshot.version!==1||!Number.isSafeInteger(snapshot.tick)||snapshot.tick<0||snapshot.tick>1000000||!Array.isArray(snapshot.runs))throw Error('不支持的回放快照');
    let total=0;for(const run of snapshot.runs){if(!Number.isSafeInteger(run.count)||run.count<1||!Array.isArray(run.inputs)||run.inputs.length!==snapshot.config.players.length||run.inputs.some(b=>typeof b==='number'?(!Number.isInteger(b)||b<0||b>31):!validateInput(b)))throw Error('回放输入损坏');total+=run.count;}if(total!==snapshot.tick)throw Error('回放帧数不符');
    const m=new Match(snapshot.config,snapshot.seed),keys=['forward','backup','turnLeft','turnRight','fire'] as const;
    for(const run of snapshot.runs){const inputs=run.inputs.map(bits=>typeof bits!=='number'?bits:Object.fromEntries(keys.map((k,i)=>[k,!!(bits&(1<<i))])) as unknown as TankInput);for(let i=0;i<run.count;i++)m.step(inputs);}
    return m;
  }
}
export function createMatch(config:MatchConfig,seed:number){return new Match(config,seed);}
export function restore(snapshot:MatchSnapshot){return Match.restore(snapshot);}
