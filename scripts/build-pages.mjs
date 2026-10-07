import { spawnSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'chen-yanzhi-homepage';
const basePath = process.env.PAGES_BASE_PATH ?? `/${repository}`;
if (basePath && !/^\/[A-Za-z0-9_.-]+$/.test(basePath)) throw new Error('Invalid Pages base path');
const result = spawnSync(process.execPath, ['node_modules/vinext/dist/cli.js', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, GITHUB_PAGES: 'true', NEXT_PUBLIC_BASE_PATH: basePath },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
if (!existsSync('dist/client/index.html')) throw new Error('Static homepage was not exported');
writeFileSync('dist/client/.nojekyll', '');
console.log(`GitHub Pages export ready in dist/client (base path: ${basePath || '/'}).`);
