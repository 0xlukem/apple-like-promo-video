import {readFileSync, writeFileSync} from 'node:fs';
const root = new URL('../', import.meta.url);
const source = readFileSync(new URL('src/promo/ProductStage.tsx', root), 'utf8');
const excerpt = source.match(/  let yaw = spinYaw\([\s\S]*?\n  \);/)?.[0];
if (!excerpt) throw new Error('The displayed source excerpt must match ProductStage.tsx');
writeFileSync(new URL('src/promo/source-excerpt.json', root), JSON.stringify({
  file: 'ProductStage.tsx', lines: excerpt.split('\n').map(line => line.slice(2)),
}, null, 2) + '\n');
