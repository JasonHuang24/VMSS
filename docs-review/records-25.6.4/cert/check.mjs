#!/usr/bin/env node
/* Checker for the cert unit of the records reconstruction (site v25.6.4 draft).
   Compares docs-review/records-25.6.4/cert/build-path2-certification-page.mjs
   (the draft) with tools/build-path2-certification-page.mjs (the original).
   Reads only; the one file it writes is a temporary import shim in the OS temp
   directory, removed on exit. Run: node docs-review/records-25.6.4/cert/check.mjs */
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..', '..');
const ORIG = join(ROOT, 'tools', 'build-path2-certification-page.mjs');
const DRAFT = join(HERE, 'build-path2-certification-page.mjs');
const VERIFIER = join(ROOT, 'tools', 'verify-path2-certification-2294.mjs');
const PAGE = join(ROOT, 'path-2-certification-2294.html');
const LEDGER = join(HERE, 'ledger.md');

let failures = 0;
const check = (ok, label, detail = '') => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? ` | ${detail}` : ''}`);
  if (!ok) failures += 1;
};
const info = (label) => console.log(`INFO  ${label}`);

/* 0. Syntax and line endings */
let syntaxOk = true;
try { execFileSync(process.execPath, ['--check', DRAFT], { stdio: 'pipe' }); } catch (error) { syntaxOk = false; info(String(error.stderr || error)); }
check(syntaxOk, 'node --check passes on the draft');
const origSrc = readFileSync(ORIG, 'utf8');
const draftSrc = readFileSync(DRAFT, 'utf8');
check(!draftSrc.includes('\r'), 'draft uses LF line endings only');
check(!readFileSync(LEDGER, 'utf8').includes('\r'), 'ledger uses LF line endings only');

/* 1. Code outside the returned template literal is byte-identical */
const split = (src) => {
  const start = src.indexOf('  return `<!doctype html>');
  const end = src.indexOf('`;\n}\n', start);
  return { ok: start > 0 && end > start, pre: src.slice(0, start), tpl: src.slice(start, end), post: src.slice(end) };
};
const o = split(origSrc);
const d = split(draftSrc);
check(o.ok && d.ok, 'template literal located in both files');
check(o.pre === d.pre, 'all code before the template literal is byte-identical (evidence strings, labels, helpers)');
check(o.post === d.post, 'all code after the template literal is byte-identical (run, --check mode)');

/* 2. Interpolations: same expressions, same order */
const interps = (tpl) => tpl.match(/\$\{[^}]*\}/g) || [];
check(JSON.stringify(interps(o.tpl)) === JSON.stringify(interps(d.tpl)),
  'every ${...} interpolation unchanged and in the same order', `${interps(d.tpl).length} interpolations`);

/* 3. Template tag skeleton (meta description content is prose and is masked) */
const maskMeta = (s) => s.replace(/(<meta name="description" content=")[^"]*(")/, '$1~$2');
const tags = (s) => maskMeta(s).match(/<[^>]*>/g) || [];
check(JSON.stringify(tags(o.tpl)) === JSON.stringify(tags(d.tpl)), 'template tag skeleton unchanged', `${tags(d.tpl).length} tags`);

/* 4. Render both through the real verifier and data */
const verifier = await import(pathToFileURL(VERIFIER).href);
const { data, notice } = verifier.loadCertificationSources();
const origMod = await import(pathToFileURL(ORIG).href);
const tmp = mkdtempSync(join(tmpdir(), 'cert-draft-'));
let draftMod;
try {
  const shim = join(tmp, 'draft.mjs');
  const rewired = draftSrc.replace("from './verify-path2-certification-2294.mjs'", `from '${pathToFileURL(VERIFIER).href}'`);
  check(rewired !== draftSrc, 'import shim rewired the verifier specifier');
  writeFileSync(shim, rewired);
  draftMod = await import(pathToFileURL(shim).href);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
const norm = (s) => String(s).replace(/\r\n/g, '\n');
const origHtml = origMod.buildCertificationHtml(data, notice);
const draftHtml = draftMod.buildCertificationHtml(data, notice);
check(norm(readFileSync(PAGE, 'utf8')) === norm(origHtml), 'baseline: original generator reproduces the committed page');
check(verifier.evaluateCertification(data, notice).certified, 'certification sources certify (the draft built without refusing)');

/* 5. Rendered skeleton, headings, ids */
check(JSON.stringify(tags(origHtml)) === JSON.stringify(tags(draftHtml)), 'rendered tag skeleton unchanged (every tag, class, href, aria)', `${tags(draftHtml).length} tags`);
const headings = (s) => s.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/g) || [];
check(JSON.stringify(headings(origHtml)) === JSON.stringify(headings(draftHtml)), 'every heading element unchanged (text and attributes)', `${headings(draftHtml).length} headings`);
const ids = (s) => s.match(/\bid="[^"]*"/g) || [];
check(JSON.stringify(ids(origHtml)) === JSON.stringify(ids(draftHtml)), 'every id token unchanged', ids(draftHtml).join(' '));

/* 6. Text nodes: only prose nodes may change */
const VOID = new Set(['meta', 'link', 'br', 'img', 'input', 'hr']);
const PROSE_PARENT = [
  /^<p class="text-lg /,
  /^<p class="cert-banner">$/,
  /^<p class="text-\[var\(--text-secondary\)\] leading-relaxed">$/,
];
const BANNER_DIV = /^<div class="cert-banner mt-10"/;
const walk = (html) => {
  const nodes = [];
  const stack = [];
  let gap = 0;
  for (const token of html.match(/<[^>]+>|[^<]+/g)) {
    if (token.startsWith('<')) {
      gap += 1;
      const name = (token.match(/^<\/?([a-zA-Z0-9]+)/) || [])[1]?.toLowerCase();
      if (token.startsWith('</')) stack.pop();
      else if (!token.startsWith('<!') && !VOID.has(name) && !token.endsWith('/>')) stack.push(token);
      continue;
    }
    const parent = stack[stack.length - 1] || '';
    const grand = stack[stack.length - 2] || '';
    const prose = PROSE_PARENT.some((re) => re.test(parent)) || (parent === '<p>' && BANNER_DIV.test(grand));
    nodes.push({ gap, text: token, prose });
  }
  return nodes;
};
const on = walk(origHtml);
const dn = walk(draftHtml);
const byGap = (nodes) => new Map(nodes.map((n) => [n.gap, n]));
const om = byGap(on);
const dm = byGap(dn);
const gaps = [...new Set([...om.keys(), ...dm.keys()])].sort((x, y) => x - y);
const illegal = [];
let changedProse = 0;
for (const g of gaps) {
  const a = om.get(g);
  const b = dm.get(g);
  if (a?.text === b?.text) continue;
  if (a?.prose && b?.prose) { changedProse += 1; continue; }
  illegal.push(`gap ${g}: "${(a?.text || '').trim().slice(0, 60)}" -> "${(b?.text || '').trim().slice(0, 60)}"`);
}
check(illegal.length === 0, 'only prose text nodes changed (labels, strong spans, cards, tables, chronology frozen)',
  illegal.length ? illegal.join(' ; ') : `${changedProse} prose nodes rewritten`);

/* 7. Frozen strings */
const decode = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const visible = (html) => decode(html.replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ')).replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
const metaDesc = (html) => decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
const corpus = (html) => `${visible(html)} ${metaDesc(html)}`;
const origText = corpus(origHtml);
const draftText = corpus(draftHtml);

const POSITIVE_CONTROLS = ['SCHEDULES A AND B CERTIFIED', 'exactly 30 keyed annual observations', 'Main-12 106.7%', 'ADT-36 122.4%', 'complete ordered window SHA-256-attested'];
for (const s of POSITIVE_CONTROLS) check(draftHtml.includes(s), `positive control present: '${s}'`);
check(draftHtml.includes('<body'), "guard-mutation probe find-string present: '<body'");

const C = verifier.STATUTORY_CONSTANTS;
check(draftHtml.includes(`<title>${C.record.title} • The Five Rings</title>`), `STATUTORY_CONSTANTS record.title present: '${C.record.title}'`);
for (const entry of C.chronology) {
  const li = `<li><strong>${entry.year ?? entry.years}:</strong> ${entry.event}</li>`;
  check(draftHtml.includes(li), `chronology string present: '${entry.year ?? entry.years}: ${entry.event}'`);
}
const noticeOnPage = Object.entries(C.notice).filter(([, v]) => typeof v === 'string' && origHtml.includes(v));
for (const [k, v] of noticeOnPage) check(draftHtml.includes(`<span class="value">${v}</span>`) && draftHtml.includes(`${v}.</strong>`), `notice.${k} string present as rendered: '${v}'`);
info(`notice strings not rendered on the page (none were before): ${Object.entries(C.notice).filter(([, v]) => typeof v === 'string' && !origHtml.includes(v)).map(([k]) => k).join(', ')}`);
const leaves = [];
const collect = (v) => { if (typeof v === 'string') leaves.push(v); else if (v && typeof v === 'object') Object.values(v).forEach(collect); };
collect(C);
const lost = [...new Set(leaves)].filter((s) => origHtml.includes(s) && !draftHtml.includes(s));
check(lost.length === 0, 'every STATUTORY_CONSTANTS string leaf rendered on the original page is still rendered', lost.length ? lost.join(', ') : `${[...new Set(leaves)].filter((s) => origHtml.includes(s)).length} leaves`);

/* 8. World-tier guards (copied from tools/check-canon.mjs) on the draft render */
const BANNED = /founder(?:'|’)?s? (?:ruling|override)/i;
const SEAT = /\b(Sol|Opus|Fable|GPT|Claude)\b/;
const SUPERSEDED = /(?:Finding III[^.!?]{0,100}(?:fail(?:ed|ure)?|did not pass)|Schedule A\b[^.!?]{0,100}(?:refus(?:ed|al)|reject(?:ed|ion)|not certified)|Schedule B\b[^.!?]{0,100}(?:not reached|refus(?:ed|al)|reject(?:ed|ion)|not certified)|2294[^.!?]{0,120}(?:three findings passed|one finding failed|both refusals)|lawful (?:nonactivation|failure)|both refusals|chain with three links)/i;
const TIER = /\b(?:tax(?:ation|es)?|tax code|rate schedule|top marginal rates?|the (?:rate )?cascade)\b[^.!?]{0,60}\b(?:is|are|sits? at|remains?)\b[^.!?]{0,40}\b(?:charter-level|charter level|constitutional(?:ly)?|charter-tier)\b/i;
const FORBIDDEN_CURRENT = /(?:LP-073[^.!?]{0,120}(?:remains|is|still)\s+(?:current|active|operative)|(?:current|active|operative|since 2295|from 2295)[^.!?]{0,100}(?:70\s*%?\s*\/\s*35\s*%?\s*\/\s*17\s*%?\s*\/\s*8\s*%?|\b35%|\b17%|\b8%))/i;
const dv = visible(draftHtml);
check(!BANNED.test(dv), "World tier: no founder's ruling/override");
check(!SEAT.test(dv), 'World tier: no seat names', (dv.match(SEAT) || [])[0] || '');
check(!SUPERSEDED.test(dv), 'World tier: no superseded refusal phrasing', (dv.match(SUPERSEDED) || [])[0] || '');
check(!TIER.test(dv), 'World tier: no taxation-is-charter-level predication');
check(!FORBIDDEN_CURRENT.test(dv), 'cascade-surface stale-claim regex clear (not applied to this page by check-canon; checked for safety)', (dv.match(FORBIDDEN_CURRENT) || [])[0] || '');
const fragLinks = (draftHtml.match(/href="[^"#]+\.html#[^"]+"/g) || []);
check(fragLinks.length === 0, 'no x.html#frag links to resolve (skeleton equality keeps every href)');

/* 9. Figures and numbered tokens in the prose survive */
const proseText = (nodes) => nodes.filter((n) => n.prose).map((n) => n.text).join(' ');
const origProse = `${proseText(on)} ${metaDesc(origHtml)}`;
const draftProse = `${proseText(dn)} ${metaDesc(draftHtml)}`;
const TOKEN = /§\s?\d+(?:\.\d+)*|LP-\d{3}|\b[AB]\d(?:–[AB]\d)?\b|\b[IV]+–[IV]+\b|\$?\d+(?:\.\d+)?%?/g;
const multiset = (s) => (s.match(TOKEN) || []).reduce((m, t) => m.set(t, (m.get(t) || 0) + 1), new Map());
const om2 = multiset(origProse);
const dm2 = multiset(draftProse);
const dropped = [...om2].filter(([t, n]) => (dm2.get(t) || 0) < n).map(([t, n]) => `${t} x${n - (dm2.get(t) || 0)}`);
const added = [...dm2].filter(([t, n]) => (om2.get(t) || 0) < n).map(([t, n]) => `${t} x${n - (om2.get(t) || 0)}`);
check(dropped.length === 0, 'every figure, date, §, LP- and A/B condition token in the original prose survives', dropped.join(', ') || `${[...om2.values()].reduce((x, y) => x + y, 0)} tokens`);
info(`tokens added in the draft prose: ${added.join(', ') || 'none'}`);

/* 10. Register tells in the prose (original -> draft) */
const count = (s, re) => (s.match(re) || []).length;
info(`em-dashes in prose: ${count(origProse, /—/g)} -> ${count(draftProse, /—/g)}`);
info(`contrastive "but": ${count(origProse, /\bbut\b/g)} -> ${count(draftProse, /\bbut\b/g)}`);
info(`semicolons in prose: ${count(origProse, /;/g)} -> ${count(draftProse, /;/g)}`);
check(count(draftProse, /\bnot\b[^.;]{0,60}\bbut\b/g) === 0 && count(draftProse, /—/g) === 0, 'draft prose has no "not X but Y" and no em-dash');

/* 11. Word counts (visible text inside <main>, plus meta description) */
const mainText = (html) => visible((html.match(/<main[\s\S]*?<\/main>/) || [''])[0]);
const words = (s) => s.split(/\s+/).filter(Boolean).length;
const ow = words(mainText(origHtml));
const dw = words(mainText(draftHtml));
info(`words inside <main>: ${ow} -> ${dw} (${(((dw - ow) / ow) * 100).toFixed(1)}%); rewritable prose: ${words(origProse)} -> ${words(draftProse)}`);

/* 12. Tailwind parity: no new prose word is a bare Tailwind utility */
const TW = new Set(['block', 'inline', 'flex', 'grid', 'table', 'contents', 'hidden', 'static', 'fixed', 'absolute', 'relative', 'sticky', 'visible', 'invisible', 'collapse', 'isolate', 'truncate', 'italic', 'underline', 'overline', 'uppercase', 'lowercase', 'capitalize', 'container', 'shadow', 'border', 'rounded', 'outline', 'ring', 'blur', 'grow', 'shrink', 'transform', 'transition', 'filter', 'invert', 'sepia', 'grayscale', 'resize', 'ordinal', 'antialiased', 'flow-root', 'list-item', 'sr-only', 'grow-0', 'shrink-0', 'underline', 'no-underline', 'line-through']);
const wordSet = (s) => new Set(s.split(/[^A-Za-z0-9-]+/).filter(Boolean));
const ow3 = wordSet(origProse);
const newWords = [...wordSet(draftProse)].filter((w) => !ow3.has(w));
const twHits = newWords.filter((w) => TW.has(w));
check(twHits.length === 0, 'no new prose word is a bare Tailwind utility (build:css parity unaffected)', twHits.join(', ') || `new words: ${newWords.join(', ')}`);

/* 13. Ledger: section (a) quotes appear verbatim in the draft; section (b) strings present */
const ledger = readFileSync(LEDGER, 'utf8');
const section = (tag, next) => {
  const start = ledger.indexOf(`## (${tag})`);
  const end = next ? ledger.indexOf(`## (${next})`) : ledger.length;
  return start >= 0 && end > start ? ledger.slice(start, end) : '';
};
const secA = section('a', 'b');
const secB = section('b', 'c');
check(secA.length > 0 && secB.length > 0 && section('c').length > 0, 'ledger has sections (a), (b), (c)');
const spans = (s) => [...s.matchAll(/`([^`]+)`/g)].map((m) => m[1]);
const clean = (q) => q.replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
const bulletLines = secA.split('\n').filter((l) => l.startsWith('- '));
const bare = bulletLines.filter((l) => !/`[^`]+`/.test(l) && !/\bcut:/.test(l));
check(bare.length === 0, 'every ledger (a) row carries a quote or a cut: note', bare.join(' | '));
const aQuotes = spans(secA);
const missingA = aQuotes.filter((q) => !draftText.includes(clean(q)));
const longA = aQuotes.filter((q) => words(q) > 15);
check(missingA.length === 0, 'every ledger (a) quote appears verbatim in the draft', missingA.length ? missingA.join(' | ') : `${aQuotes.length} quotes`);
check(longA.length === 0, 'every ledger (a) quote is 15 words or fewer', longA.join(' | '));
const bStrings = spans(secB);
const missingB = bStrings.filter((q) => !draftHtml.includes(q) && !draftText.includes(clean(q)) && !draftSrc.includes(q));
check(missingB.length === 0, 'every ledger (b) frozen string is present in the draft', missingB.length ? missingB.join(' | ') : `${bStrings.length} strings`);

console.log(failures === 0 ? '\nALL CHECKS PASSED' : `\n${failures} CHECK(S) FAILED`);
process.exit(failures === 0 ? 0 : 1);
