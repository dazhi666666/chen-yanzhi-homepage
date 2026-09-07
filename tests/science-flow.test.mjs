import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const compiled = await build({entryPoints:[fileURLToPath(new URL('../app/science-data.ts',import.meta.url))],bundle:true,write:false,platform:'node',format:'esm'});
const {scienceReducer:reduce,initialScience,experiment}=await import('data:text/javascript;base64,'+Buffer.from(compiled.outputFiles[0].text).toString('base64'));
const submit=state=>reduce(state,{type:'submit'});
const advance=state=>reduce(state,{type:'advance'});

test('duplicate submissions reuse an operation without starting the instrument or reserving more budget',()=>{
  let state=submit(initialScience);
  for(let i=0;i<10;i++) state=submit(state);
  assert.equal(state.status,'registered');assert.equal(state.submissions,11);assert.equal(state.starts,0);
  assert.equal(state.reserved,true);assert.equal(state.readings.length,0);
  state=advance(state);const readings=[...state.readings];
  state=submit(state);assert.deepEqual(state.readings,readings);assert.equal(state.starts,1);
  assert.equal(state.result,null);
});

test('unknown state blocks execution and retains resources until device facts can be verified',()=>{
  let state=advance(submit(initialScience));
  state=reduce(state,{type:'interrupt'});
  assert.equal(state.status,'unknown');assert.equal(state.connected,false);assert.equal(state.reserved,true);
  assert.deepEqual(advance(state),state);assert.deepEqual(submit(state),state);
  state=reduce(state,{type:'reconcile',available:false});
  assert.equal(state.connected,true);assert.equal(state.status,'unknown');assert.equal(state.reserved,true);
  assert.deepEqual(advance(state),state);
  const unknown=submit(state);assert.equal(unknown.status,'unknown');assert.equal(unknown.starts,1);
  state=reduce(unknown,{type:'reconcile',available:true});
  assert.equal(state.status,'running');assert.equal(state.starts,1);assert.deepEqual(state.readings,[0.98]);
  state=advance(advance(advance(state)));
  assert.equal(state.status,'completed');assert.equal(state.starts,1);assert.equal(state.reserved,false);
  assert.equal(state.result.mean,1);assert.deepEqual(state.readings,experiment.readings);
});

test('recovery at every boundary retains observations and never duplicates device execution',()=>{
  for(let progress=0;progress<=3;progress++){
    let state=submit(initialScience);
    for(let i=0;i<progress;i++)state=advance(state);
    const before=[...state.readings];
    state=reduce(reduce(state,{type:'interrupt'}),{type:'reconcile',available:true});
    assert.deepEqual(state.readings,before);
    assert.equal(state.starts,progress?1:0);
    if(progress===3)assert.equal(state.status,'completed');
    while(state.status!=='completed')state=advance(state);
    assert.equal(state.starts,1);assert.equal(state.result.id,experiment.resultId);
    assert.deepEqual(state.readings,experiment.readings);
    assert.deepEqual(advance(state),state);
    const duplicate=submit(state);assert.deepEqual(duplicate.result,state.result);assert.equal(duplicate.reserved,false);
  }
});

test('reset clears the simulated experiment; repeated requests keep bounded log history',()=>{
  let state=submit(initialScience);
  for(let i=0;i<100;i++)state=submit(state);
  assert.equal(state.logs.length,40);assert.equal(state.sequence,101);
  assert.deepEqual(reduce(state,{type:'reset'}),initialScience);
  assert.deepEqual(initialScience.readings,[]);assert.deepEqual(initialScience.logs,[]);
});

test('project includes the exact original introduction and all four original images',()=>{
  const projects=JSON.parse(readFileSync(new URL('../app/projects.json',import.meta.url),'utf8'));
  assert.equal(projects.length,7);
  const project=projects.find(p=>p.id==='science-harness');
  const source=new URL('../../陈炎志项目介绍/science-harness/',import.meta.url);
  assert.equal(project.originalIntroduction,readFileSync(new URL('science-harness项目介绍.md',source),'utf8'));
  const names=['16730f355f7b1695bfa6a26905a0ff42.png','5c284264124c9caa199cdad493f9b283.png','eeb6e486cbf9201fa8bbb4c62daf4258.png','ad3759ebb0de60bb067db5a0f5469eb3.png'];
  assert.equal(project.images.length,4);
  for(let i=0;i<names.length;i++) assert.deepEqual(readFileSync(new URL('../public'+project.images[i].src,import.meta.url)),readFileSync(new URL(names[i],source)));
});
