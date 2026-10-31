import { copyFile } from 'node:fs/promises';

await copyFile(
  'dist/bettercallmilan/browser/index.html',
  'dist/bettercallmilan/browser/404.html',
);
