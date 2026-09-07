import { test } from 'node:test';
import assert from 'node:assert/strict';
import { distributeRequests, rankedArticles, readingArticles } from '../app/demo-data.ts';

test('every request is assigned or queued, with no disabled or overloaded nodes', () => {
  for (let mask = 0; mask < 8; mask++) {
    const enabled = [0, 1, 2].map(i => Boolean(mask & (1 << i)));
    for (let count = 1; count <= 20; count++) {
      const result = distributeRequests(count, enabled);
      assert.equal(result.assigned.reduce((a, b) => a + b, 0) + result.remaining, count);
      assert.equal(result.remaining, Math.max(0, count - result.totalCapacity));
      result.assigned.forEach((load, i) => {
        assert.ok(load >= 0 && load <= result.capacity[i]);
        if (!enabled[i]) assert.equal(load, 0);
      });
    }
  }
});

test('pausing a node reroutes available capacity; restoring it drains queued requests', () => {
  const paused = distributeRequests(15, [true, false, true]);
  assert.deepEqual(paused.assigned, [6, 0, 5]);
  assert.equal(paused.remaining, 4);
  assert.equal(distributeRequests(15, [true, true, true]).remaining, 0);
  assert.equal(distributeRequests(9, [false, false, false]).remaining, 9);
});

test('reading preferences change ranking and reasons without losing or altering articles', () => {
  const snapshot = JSON.stringify(readingArticles);
  const topArticles = [];
  for (let profile = 0; profile < 3; profile++) {
    const ranked = rankedArticles(profile);
    assert.equal(new Set(ranked.map(article => article.index)).size, 3);
    assert.ok(ranked.every((article, i) => i === 0 || ranked[i-1].score >= article.score));
    ranked.forEach(article => {
      assert.equal(article.text, readingArticles[article.index].text);
      assert.equal(article.reason, readingArticles[article.index].reasons[profile]);
    });
    topArticles.push(ranked[0].index);
  }
  assert.equal(new Set(topArticles).size, 3);
  assert.equal(JSON.stringify(readingArticles), snapshot);
});
