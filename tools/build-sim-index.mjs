#!/usr/bin/env node
/**
 * build-sim-index.mjs — regenerates the Full Archive Index data island
 * in simulations.html.
 *
 * Parses every .simulation-card in simulations-world.html and
 * simulations-residents.html — title, section (nearest preceding
 * h2.text-4xl), simulation type, classification, doctrine snapshot,
 * outcome line, content-div anchor — and writes the result as a JSON
 * array between the SIM-INDEX-DATA markers in simulations.html
 * (replacing whatever is there, so the script is re-runnable).
 *
 * Fails loudly if the parsed card count drifts from the raw
 * class="simulation-card occurrence count, if any card is missing a
 * field, or if the markers are gone.
 *
 * Run:  node tools/build-sim-index.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/* Strip tags, decode the entities the archive pages actually use,
   collapse whitespace. Display text only — never re-emitted as HTML. */
const ENTITIES = {
  nbsp: ' ', amp: '&', mdash: '—', ndash: '–', hellip: '…',
  rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“',
  quot: '"', lt: '<', gt: '>', minus: '−',
  rarr: '→', larr: '←', times: '×', deg: '°', middot: '·',
};
const decode = (s) => s
  .replace(/<[^>]+>/g, '')
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
  .replace(/\s+/g, ' ')
  .trim();

const problems = [];
const variants = []; // meta lines using non-standard keys, handled positionally

function parse(file, collection) {
  const html = readFileSync(join(ROOT, file), 'utf8');
  const rawCount = (html.match(/class="simulation-card/g) || []).length;

  const sections = [...html.matchAll(/<h2 class="text-4xl[^>]*>([^<]*)<\/h2>/g)]
    .map((m) => ({ at: m.index, name: decode(m[1]) }));

  const starts = [...html.matchAll(/<div class="simulation-card/g)].map((m) => m.index);
  const entries = [];

  starts.forEach((at, i) => {
    const chunk = html.slice(at, starts[i + 1] ?? html.length);
    const grab = (re, what) => {
      const m = chunk.match(re);
      if (!m) problems.push(`${file} card ${i + 1}: missing ${what}`);
      return m ? m[1] : '';
    };
    const anchorId = grab(/aria-controls="([^"]+)"/, 'aria-controls');
    const title = decode(grab(/<h2 class="text-3xl[^>]*>([\s\S]*?)<\/h2>/, 'title'));
    const metaRaw = grab(/<p class="text-sm text-\[var\(--text-muted\)\] mt-1">([\s\S]*?)<\/p>/, 'meta line');
    const outcome = decode(grab(/<p class="text-\[var\(--text-muted\)\]">([\s\S]*?)<\/p>/, 'outcome line'));
    if (anchorId && !chunk.includes(`id="${anchorId}"`)) {
      problems.push(`${file} "${title}": aria-controls "${anchorId}" has no matching content-div id`);
    }

    /* Meta line: Key: Value pairs joined by &nbsp;·&nbsp; (split on the raw
       separator so decoded values may safely contain "·"). Standard keys are
       Simulation Type / Classification / Doctrine Snapshot; the Cyberpunk
       2077 section uses Cyberpunk 2077 Element / VMSS Analog, mapped
       positionally into the same slots. */
    const fields = metaRaw.split('&nbsp;·&nbsp;').map((seg) => {
      const text = decode(seg);
      const colon = text.indexOf(':');
      return colon === -1 ? ['', text] : [text.slice(0, colon).trim(), text.slice(colon + 1).trim()];
    });
    const byKey = Object.fromEntries(fields);
    const type = byKey['Simulation Type'] ?? fields[0]?.[1] ?? '';
    const klass = byKey['Classification'] ?? fields[1]?.[1] ?? '';
    const snapshot = byKey['Doctrine Snapshot'] ?? '';
    if (!('Simulation Type' in byKey) || !('Classification' in byKey)) {
      variants.push(`${file} "${title}": keys [${fields.map((f) => f[0]).join(' / ')}]`);
    }
    if (!snapshot) problems.push(`${file} "${title}": no Doctrine Snapshot`);

    const section = sections.filter((s) => s.at < at).pop();
    if (!section) problems.push(`${file} "${title}": no preceding section header`);

    entries.push({
      t: title, c: collection, s: section?.name ?? '', y: type, k: klass,
      v: snapshot, o: outcome, a: `${file}#${anchorId}`,
    });
  });

  if (entries.length !== rawCount) {
    throw new Error(`${file}: parsed ${entries.length} cards but counted ${rawCount} class="simulation-card occurrences`);
  }
  return entries;
}

const entries = [
  ...parse('simulations-world.html', 'world'),
  ...parse('simulations-residents.html', 'residents'),
];

if (problems.length) {
  for (const p of problems) console.error(`  FAIL  ${p}`);
  throw new Error(`${problems.length} card(s) did not parse cleanly`);
}
const anchors = entries.map((e) => e.a);
if (new Set(anchors).size !== anchors.length) {
  throw new Error('duplicate anchors detected — deep links would collide');
}

/* Inject between the markers in simulations.html (re-runnable). */
const BEGIN = '<!-- SIM-INDEX-DATA:BEGIN -->';
const END = '<!-- SIM-INDEX-DATA:END -->';
const hubPath = join(ROOT, 'simulations.html');
const hub = readFileSync(hubPath, 'utf8');
const a = hub.indexOf(BEGIN);
const b = hub.indexOf(END);
if (a === -1 || b === -1 || b < a) {
  throw new Error('SIM-INDEX-DATA markers missing or malformed in simulations.html');
}
const json = JSON.stringify(entries).replace(/</g, '\\u003c');
const island = `${BEGIN}\n<script type="application/json" id="sim-index-data">${json}</script>\n${END}`;
writeFileSync(hubPath, hub.slice(0, a) + island + hub.slice(b + END.length));

/* Report */
const distinct = (key) => [...new Set(entries.map((e) => e[key]))];
const per = (c) => entries.filter((e) => e.c === c).length;
console.log(`sim index built: ${entries.length} entries (world=${per('world')}, residents=${per('residents')}) → simulations.html`);
console.log(`sections (${distinct('s').length}): ${distinct('s').join(' | ')}`);
console.log(`snapshots (${distinct('v').length}): ${distinct('v').join(', ')}`);
if (variants.length) {
  console.log(`meta-key variants handled positionally (${variants.length}):`);
  for (const v of variants) console.log(`  ${v}`);
}
