import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';

const compiled = await build({ entryPoints: [fileURLToPath(new URL('../app/wukong-data.ts', import.meta.url))], bundle: true, write: false, platform: 'node', format: 'esm' });
const { buildFrames, playbackReducer: reduce, initialPlayback, connections, roles } = await import('data:text/javascript;base64,' + Buffer.from(compiled.outputFiles[0].text).toString('base64'));

test('first run pauses at the event gate; paused timers and unreached seeks do nothing', () => {
  let state = reduce(initialPlayback, { type: 'play' });
  for (let i = 0; i < 20; i++) state = reduce(state, { type: 'tick' });
  assert.deepEqual(state, { scene: null, step: 4, reached: 4, playing: false });
  assert.deepEqual(reduce(initialPlayback, { type: 'event', scene: 'news' }), initialPlayback);
  assert.equal(reduce(state, { type: 'seek', step: 99 }).step, 4);
  state = reduce(state, { type: 'seek', step: 2 });
  assert.equal(state.playing, false);
  assert.deepEqual(reduce(state, { type: 'tick' }), state);
  state = reduce(reduce(state, { type: 'play' }), { type: 'next' });
  assert.equal(state.step, 3);
  assert.equal(state.playing, false);
});

test('each branch finishes, can be rewound, replaced from V1 and completely reset', () => {
  let state = { ...initialPlayback, step: 4, reached: 4 };
  for (const scene of ['breakout', 'news', 'reversal']) {
    state = reduce(state, { type: 'event', scene });
    assert.deepEqual(state, { scene, step: 5, reached: 5, playing: true });
    for (let i = 0; i < 20; i++) state = reduce(state, { type: 'tick' });
    assert.equal(state.step, 10);
    assert.equal(state.playing, false);
    state = reduce(state, { type: 'seek', step: 4 });
    assert.equal(buildFrames(scene)[state.step].decision.version, 1);
  }
  assert.deepEqual(reduce(state, { type: 'reset' }), initialPlayback);
});

test('historical snapshots do not reveal future messages, strategies, prices or memories', () => {
  const base = buildFrames(null);
  for (const scene of ['breakout', 'news', 'reversal']) {
    const frames = buildFrames(scene);
    assert.equal(frames.length, 11);
    assert.deepEqual(frames.slice(0, 5), base);
    assert.equal(frames[0].decision, null);
    assert.equal(frames[4].messages.receipt, undefined);
    assert.equal(frames[4].outputs.sub, undefined);
    assert.deepEqual(frames[8].memory, []);
    assert.equal(frames[9].memory.length, 3);
    assert.equal(frames[9].messages.restore, undefined);
    assert.ok(frames[10].messages.restore);
    assert.notDeepEqual(frames[5].prices, frames[4].prices);
    assert.deepEqual(buildFrames(null), base);
  }
});

test('execution follows receipts and distinguishes unchanged strategy from strategy revision', () => {
  const breakout = buildFrames('breakout');
  assert.match(breakout[6].decision.execution, /等待规则校验/);
  assert.equal(breakout[6].messages.receipt, undefined);
  assert.match(breakout[7].decision.execution, /3% 已确认，2% 待成交/);
  assert.match(breakout[8].decision.execution, /全部成交/);
  assert.ok(breakout.slice(3).every(frame => frame.decision.version === 1 && frame.previous === null));
  const news = buildFrames('news');
  assert.equal(news[6].decision.version, 1);
  assert.equal(news[7].decision.version, 2);
  assert.equal(news[7].previous.version, 1);
  assert.match(news[8].outputs.watcher, /V2 已生效/);
  const reversal = buildFrames('reversal');
  assert.match(reversal[8].messages.receipt, /没有提交订单，没有成交/);
  assert.equal(reversal[8].decision.version, 2);
});

test('all active paths carry a message and refer to valid graph roles', () => {
  const ids = new Set(connections.map(edge => edge.id));
  for (const edge of connections) assert.ok(roles[edge.from] && roles[edge.to]);
  for (const scene of [null, 'breakout', 'news', 'reversal']) {
    for (const frame of buildFrames(scene)) {
      for (const id of [...frame.active, ...frame.warning]) assert.ok(roles[id]);
      for (const id of frame.edges) {
        assert.ok(ids.has(id));
        assert.ok(frame.messages[id], `${scene} ${frame.title}: ${id} must carry a message`);
      }
    }
  }
});
