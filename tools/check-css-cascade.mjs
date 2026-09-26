#!/usr/bin/env node
/**
 * check-css-cascade.mjs — two cascade guards that neither the canon checker nor
 * the Tailwind parity check can see.
 *
 * (A) Chrome leaks. Every page's local <style> loads after styles.css and
 *     tailwind.css, and the shared navbar/footer (plus the HUD and breadcrumb
 *     markup script.js builds) are injected into every page. A page-local rule
 *     whose selector can match that chrome restyles it on that page only.
 *     Found in the wild: world/whitepaper `.grid` split the footer's Tailwind
 *     `grid` column from v13.0 until v24.2.7. A selector is flagged when its
 *     subject compound carries at least one class and every class it needs —
 *     on the subject and on each ancestor compound — exists in the chrome.
 *
 * (B) State overrides in styles.css. A state rule (:hover, :focus*, :active,
 *     [open], [aria-expanded/pressed="true"], .is-*, .has-*, .active, .open)
 *     loses silently when a LATER rule targeting the same element, at equal or
 *     higher specificity and without that state, sets the same property.
 *     Found in the wild: v24.0's `.vmss-hud.is-idle { opacity }` beat the
 *     earlier `.is-footer-clear` hide (fixed v24.2.6); several `x a { color }`
 *     rules killed the global `a:hover`. A hit is excused when the overriding
 *     selector has its own rule for the same state and property. Deliberate
 *     restyles live in tools/css-state-baseline.json; only new hits fail.
 *
 * Run:   node tools/check-css-cascade.mjs            (exit 0 = clean)
 *        node tools/check-css-cascade.mjs --root DIR  (scan another tree)
 *        node tools/check-css-cascade.mjs --write-baseline  (re-pin guard B)
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const rootArg = args.indexOf('--root');
const ROOT = rootArg >= 0 ? args[rootArg + 1] : join(HERE, '..');
const BASELINE = join(HERE, 'css-state-baseline.json');
const read = (f) => readFileSync(join(ROOT, f), 'utf8');

// ---------- CSS parsing ----------

/** Flat list of { selector, decls: Map(prop -> important), at } in source order. */
function parseRules(css) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  const rules = [];
  const walk = (text, at) => {
    let i = 0;
    while (i < text.length) {
      const open = text.indexOf('{', i);
      if (open < 0) break;
      const prelude = text.slice(i, open).trim();
      let depth = 1, j = open + 1;
      while (j < text.length && depth) { if (text[j] === '{') depth++; else if (text[j] === '}') depth--; j++; }
      const body = text.slice(open + 1, j - 1);
      if (/^@(media|supports|layer|container)\b/.test(prelude)) walk(body, at ? `${at} ${prelude}` : prelude);
      else if (!prelude.startsWith('@')) {
        const decls = new Map();
        for (const d of body.split(';')) {
          const k = d.indexOf(':');
          if (k < 0) continue;
          const prop = d.slice(0, k).trim().toLowerCase();
          if (prop) decls.set(prop, /!important\s*$/.test(d));
        }
        for (const selector of splitTop(prelude, ',')) rules.push({ selector: selector.trim(), decls, at });
      }
      i = j;
    }
  };
  walk(css, '');
  return rules;
}

/** Split on a character outside (), []. */
function splitTop(s, ch) {
  const out = []; let depth = 0, cur = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '\\') { cur += c + (s[i + 1] ?? ''); i++; continue; }
    if (c === '(' || c === '[') depth++;
    else if (c === ')' || c === ']') depth--;
    if (c === ch && depth === 0) { out.push(cur); cur = ''; } else cur += c;
  }
  out.push(cur);
  return out;
}

/** Compounds of a complex selector, combinators dropped. */
function compounds(sel) {
  const out = []; let depth = 0, cur = '';
  for (let i = 0; i < sel.length; i++) {
    const c = sel[i];
    if (c === '\\') { cur += c + (sel[i + 1] ?? ''); i++; continue; }
    if (c === '(' || c === '[') depth++;
    else if (c === ')' || c === ']') depth--;
    if (depth === 0 && /[\s>+~]/.test(c)) { if (cur) out.push(cur); cur = ''; } else cur += c;
  }
  if (cur) out.push(cur);
  return out;
}

const TOKEN = /(#(?:\\.|[\w-])+)|(\.(?:\\.|[\w-])+)|(\[[^\]]*\])|(::?[\w-]+(?:\((?:[^()]|\([^()]*\))*\))?)|([a-zA-Z][\w-]*|\*)/g;
const unescape = (s) => s.replace(/\\(.)/g, '$1');

function parseCompound(c) {
  const r = { tag: null, ids: [], classes: [], attrs: [], pseudos: [] };
  for (const m of c.matchAll(TOKEN)) {
    if (m[1]) r.ids.push(unescape(m[1].slice(1)));
    else if (m[2]) r.classes.push(unescape(m[2].slice(1)));
    else if (m[3]) r.attrs.push(m[3]);
    else if (m[4]) r.pseudos.push(m[4]);
    else if (m[5]) r.tag = m[5].toLowerCase();
  }
  return r;
}

function specificity(sel) {
  let a = 0, b = 0, c = 0;
  for (const comp of compounds(sel)) {
    const p = parseCompound(comp);
    a += p.ids.length; b += p.classes.length + p.attrs.length;
    if (p.tag && p.tag !== '*') c++;
    for (const ps of p.pseudos) {
      const fn = ps.match(/^:(is|not|has|where)\((.*)\)$/);
      if (fn) {
        if (fn[1] === 'where') continue;
        const best = splitTop(fn[2], ',').map(specificity).sort(cmpSpec).at(-1);
        a += best[0]; b += best[1]; c += best[2];
      } else if (ps.startsWith('::')) c++;
      else b++;
    }
  }
  return [a, b, c];
}
const cmpSpec = (x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2];

// ---------- (A) chrome leaks ----------

function chromeVocabulary() {
  const classes = new Set(), ids = new Set(['navbar-placeholder', 'footer-placeholder']);
  const markup = read('navbar.html') + read('footer.html');
  const script = read('script.js');
  const addList = (s) => s.split(/\s+/).filter(Boolean).forEach((k) => classes.add(k));
  for (const m of (markup + script).matchAll(/class="([^"]*)"/g)) addList(m[1]);
  for (const m of script.matchAll(/className\s*=\s*['"`]([^'"`]*)['"`]/g)) addList(m[1]);
  for (const m of script.matchAll(/classList\.(?:add|toggle)\(([^)]*)\)/g)) {
    for (const s of m[1].matchAll(/['"]([\w-]+)['"]/g)) classes.add(s[1]);
  }
  for (const m of (markup + script).matchAll(/\sid="([\w-]+)"/g)) ids.add(m[1]);
  return { classes, ids };
}

function checkLeaks() {
  const { classes, ids } = chromeVocabulary();
  const reachable = (p) => p.classes.every((k) => classes.has(k)) && p.ids.every((k) => ids.has(k));
  const hits = [];
  const pages = readdirSync(ROOT).filter((f) => f.endsWith('.html') && !['navbar.html', 'footer.html'].includes(f));
  for (const page of pages) {
    const html = read(page).replace(/<noscript>[\s\S]*?<\/noscript>/g, '');
    for (const m of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) {
      for (const rule of parseRules(m[1])) {
        const comps = compounds(rule.selector).map(parseCompound);
        const subject = comps.at(-1);
        if (!subject || !subject.classes.length) continue;
        if (comps.every(reachable)) hits.push(`${page}: \`${rule.selector}\` can match shared chrome`);
      }
    }
  }
  return hits;
}

// ---------- (B) state overrides ----------

const STATE_PSEUDO = /^:(hover|focus|focus-visible|focus-within|active|checked)$/;
const STATE_ATTR = /^\[(open|aria-expanded="true"|aria-pressed="true")\]$/;
const STATE_CLASS = /^(is-[\w-]+|has-[\w-]+|active|open)$/;

/** { states: Set, subjectKey } — subject compound with state tokens removed. */
function stateShape(sel) {
  const comps = compounds(sel);
  const states = new Set();
  let subjectKey = '';
  comps.forEach((comp, idx) => {
    const p = parseCompound(comp);
    p.pseudos.filter((x) => STATE_PSEUDO.test(x)).forEach((x) => states.add(x));
    p.attrs.filter((x) => STATE_ATTR.test(x)).forEach((x) => states.add(x));
    p.classes.filter((x) => STATE_CLASS.test(x)).forEach((x) => states.add('.' + x));
    if (idx === comps.length - 1) {
      if (p.pseudos.some((x) => x.startsWith('::'))) subjectKey = null; // pseudo-elements: out of scope
      else {
        const cls = p.classes.filter((x) => !STATE_CLASS.test(x)).sort();
        subjectKey = cls.length ? cls.map((x) => '.' + x).join('') : (p.tag || '*');
      }
    }
  });
  return { states, subjectKey };
}

const stripStates = (sel) => sel
  .replace(/:(hover|focus-visible|focus-within|focus|active|checked)(?![\w-])/g, '')
  .replace(/\[(open|aria-expanded="true"|aria-pressed="true")\]/g, '')
  .replace(/\.(is-[\w-]+|has-[\w-]+|active|open)(?![\w-])/g, '')
  .replace(/\s+/g, ' ').trim();

/** Does subject key `later` target (a superset of) the element of `earlier`? */
function sameTarget(earlier, later) {
  if (earlier === later) return true;
  if (!earlier.startsWith('.')) return later === earlier; // tag subject: same tag only
  const need = earlier.split('.').filter(Boolean);
  const have = new Set(later.split('.').filter(Boolean));
  return later.startsWith('.') && need.every((k) => have.has(k));
}

/** State classes script toggles one at a time (classList.add/toggle with a literal name).
 *  Two such flags can sit on one element together; classes written into markup or set
 *  as a single value (is-low / is-high) are variants of one enum and never co-occur. */
function independentFlags() {
  const js = read('script.js') + readdirSync(ROOT).filter((f) => f.endsWith('.html'))
    .map((f) => [...read(f).matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n')).join('\n');
  const flags = new Set();
  for (const m of js.matchAll(/classList\.(?:add|toggle)\(([^)]*)\)/g)) {
    for (const s of m[1].matchAll(/['"]([\w-]+)['"]/g)) flags.add('.' + s[1]);
  }
  return flags;
}

function checkStates() {
  const rules = parseRules(read('styles.css')).map((r) => ({ ...r, spec: specificity(r.selector), shape: stateShape(r.selector) }));
  const flags = independentFlags();
  const hits = new Set();
  rules.forEach((r1, i) => {
    if (!r1.shape.states.size || r1.shape.subjectKey == null) return;
    for (let j = i + 1; j < rules.length; j++) {
      const r2 = rules[j];
      if (r2.shape.subjectKey == null || !sameTarget(r1.shape.subjectKey, r2.shape.subjectKey)) continue;
      if ([...r1.shape.states].some((s) => r2.shape.states.has(s))) continue; // restyle of the same state
      if ([...r1.shape.states].some((s) => r2.selector.includes(`:not(${s})`))) continue; // explicitly exclusive
      const s1 = [...r1.shape.states], s2 = [...r2.shape.states];
      const classOnly = (l) => l.length && l.every((s) => s.startsWith('.'));
      if (classOnly(s1) && classOnly(s2) && !(s1.some((s) => flags.has(s)) && s2.some((s) => flags.has(s)))) continue; // enum variants
      for (const [prop, imp1] of r1.decls) {
        if (!r2.decls.has(prop)) continue;
        const imp2 = r2.decls.get(prop);
        if (imp1 && !imp2) continue;
        if (!imp2 && cmpSpec(r2.spec, r1.spec) < 0) continue;
        // Excused when the overriding selector carries its own rule for that state + property.
        const beats = (r3, k) => (r3.decls.get(prop) && !imp2) || (r3.decls.get(prop) === imp2 && (cmpSpec(r3.spec, r2.spec) > 0 || (cmpSpec(r3.spec, r2.spec) === 0 && k > j)));
        // Excused when the overriding selector has its own rule for r1's state (alone or combined
        // with r2's states) that beats it on this property.
        const excused = rules.some((r3, k) => r3.decls.has(prop) && beats(r3, k)
          && stripStates(r3.selector) === stripStates(r2.selector)
          && [...r1.shape.states].every((s) => r3.shape.states.has(s)));
        if (!excused) hits.add(`${r1.selector} || ${r2.selector} || ${prop}`);
      }
    }
  });
  return [...hits].sort();
}

// ---------- report ----------

const leaks = checkLeaks();
const states = checkStates();

if (args.includes('--write-baseline')) {
  writeFileSync(BASELINE, JSON.stringify(states, null, 2) + '\n');
  console.log(`css-cascade: baseline written (${states.length} accepted state overrides)`);
  process.exit(0);
}

const baseline = new Set(existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : []);
const fresh = states.filter((h) => !baseline.has(h));
const stale = [...baseline].filter((h) => !states.includes(h));

for (const l of leaks) console.log(`  FAIL  (A) chrome leak — ${l}`);
for (const h of fresh) console.log(`  FAIL  (B) state override — ${h.replace(/ \|\| /g, '  beaten by  ').replace(/  beaten by  ([^ ]+)$/, '  on  $1')}`);
for (const h of stale) console.log(`  note  (B) baseline entry no longer occurs — ${h}`);

if (leaks.length || fresh.length) {
  console.log(`\ncss-cascade: ${leaks.length} chrome leak(s), ${fresh.length} new state override(s).`);
  console.log('A deliberate state restyle can be accepted with --write-baseline; a leak must be scoped (e.g. `.paper .grid`).');
  process.exit(1);
}
console.log(`css-cascade: clean — 0 chrome leaks, ${states.length} state override(s) all baselined.`);
