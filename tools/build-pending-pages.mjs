#!/usr/bin/env node
/**
 * build-pending-pages.mjs — generates the "Pending Ratification" section of the
 * site from the docs-review source documents. This is PRE-VOTE, NON-CANON
 * material: the pages carry a standing "PENDING — not canon" banner and never
 * register as law entries (no <article class="law-entry">), so check-canon and
 * build-law-toc are unaffected.
 *
 * Verbatim guarantee: the source documents are rendered from Markdown to HTML,
 * and the script then asserts that the *visible text* of each generated body
 * equals the source document's visible text (whitespace-normalised). Any drift
 * — a dropped word, a paraphrase, a reordered clause — fails the build loudly,
 * so "verbatim" is machine-checked rather than eyeballed. Engraved tables render
 * as tables with their cell text byte-for-byte from source.
 *
 * The page chrome (banner, cross-links, hub copy) is authored, not sourced, and
 * is intentionally excluded from the verbatim check.
 *
 * Run:  node tools/build-pending-pages.mjs   (exit 0 = built + verified)
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(ROOT, f), 'utf8').replace(/\r\n?/g, '\n');
const write = (f, s) => writeFileSync(join(ROOT, f), s);

/* ------------------------------------------------------------------ *
 * Markdown → HTML (scoped to the constructs used by these documents:  *
 * ATX headings, ---, GFM pipe tables, blockquotes (incl. nested       *
 * lists + blank lines), ordered/unordered lists with continuation and *
 * one level of nesting, paragraphs, and ** bold **. No links/inline   *
 * code appear in the sources, by design, so none are handled.)        *
 * ------------------------------------------------------------------ */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
const indentOf = (l) => (l.match(/^ */) || [''])[0].length;
const isBlank = (l) => l.trim() === '';
const strip = (l) => l.replace(/^ +/, '');

function marker(trimmed) {
  let m = trimmed.match(/^- (.*)$/);
  if (m) return { type: 'ul', rest: m[1] };
  m = trimmed.match(/^(\d+)\. (.*)$/);
  if (m) return { type: 'ol', rest: m[2] };
  return null;
}
const startsBlock = (t) =>
  t.startsWith('|') || t.startsWith('>') || /^#{1,6} /.test(t) || t === '---' || !!marker(t);

function renderTable(rows) {
  const cells = (r) => strip(r).replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
  const header = cells(rows[0]);
  const sepAt = /^[|\s:-]+$/.test(strip(rows[1] || '')) ? 2 : 1;
  const body = rows.slice(sepAt).map(cells);
  const thead = `<thead><tr>${header.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead>`;
  const tbody = `<tbody>${body
    .map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
    .join('')}</tbody>`;
  return `<div class="pending-table-wrap"><table class="pending-table">${thead}${tbody}</table></div>`;
}

function parseList(lines, start, base) {
  const type = marker(strip(lines[start])).type;
  const items = [];
  let i = start;
  while (i < lines.length) {
    if (isBlank(lines[i])) {
      // Blank between siblings only if a same-indent marker follows.
      let j = i;
      while (j < lines.length && isBlank(lines[j])) j++;
      if (j < lines.length && indentOf(lines[j]) === base && marker(strip(lines[j]))) { i = j; continue; }
      break;
    }
    const m = marker(strip(lines[i]));
    if (!(m && indentOf(lines[i]) === base)) break;
    i++;
    const body = [];
    while (i < lines.length) {
      if (isBlank(lines[i])) {
        let j = i;
        while (j < lines.length && isBlank(lines[j])) j++;
        if (j < lines.length && indentOf(lines[j]) > base) { body.push(''); i++; continue; }
        break;
      }
      if (indentOf(lines[i]) > base) { body.push(lines[i]); i++; continue; }
      break;
    }
    const nonBlank = body.filter((l) => l.trim() !== '');
    const min = nonBlank.length ? Math.min(...nonBlank.map(indentOf)) : 0;
    const dedented = body.map((l) => (l === '' ? '' : l.slice(min)));
    let content = parseBlocks([m.rest, ...dedented]);
    const solo = content.match(/^<p class="pending-p">([\s\S]*)<\/p>$/);
    if (solo) content = solo[1]; // tight list item
    items.push(content);
  }
  const tag = type === 'ol' ? 'ol' : 'ul';
  return { html: `<${tag} class="pending-list">${items.map((it) => `<li>${it}</li>`).join('')}</${tag}>`, next: i };
}

function parseBlocks(lines) {
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    if (isBlank(lines[i])) { i++; continue; }
    const t = strip(lines[i]);

    const h = t.match(/^(#{1,6}) (.*)$/);
    if (h) {
      const lvl = Math.min(h[1].length + 1, 6); // page <h1> is the chrome title; docs start at <h2>
      blocks.push(`<h${lvl} class="pending-h pending-h${h[1].length}">${inline(h[2])}</h${lvl}>`);
      i++; continue;
    }
    if (t === '---') { blocks.push('<hr class="pending-hr">'); i++; continue; }
    if (t.startsWith('|')) {
      const rows = [];
      while (i < lines.length && strip(lines[i]).startsWith('|')) { rows.push(lines[i]); i++; }
      blocks.push(renderTable(rows)); continue;
    }
    if (t.startsWith('>')) {
      const inner = [];
      while (i < lines.length && strip(lines[i]).startsWith('>')) {
        inner.push(strip(lines[i]).replace(/^>\s?/, '')); i++;
      }
      blocks.push(`<blockquote class="pending-quote">${parseBlocks(inner)}</blockquote>`); continue;
    }
    if (marker(t)) {
      const { html: lh, next } = parseList(lines, i, indentOf(lines[i]));
      blocks.push(lh); i = next; continue;
    }
    const para = [];
    while (i < lines.length && !isBlank(lines[i]) && !startsBlock(strip(lines[i]))) {
      para.push(strip(lines[i])); i++;
    }
    blocks.push(`<p class="pending-p">${inline(para.join(' '))}</p>`);
  }
  return blocks.join('\n');
}

/* ------------------------------------------------------------------ *
 * Verbatim self-check: visible text of the rendered body must equal   *
 * the visible text of the source, independent of markup and wrapping. *
 * ------------------------------------------------------------------ */
function htmlText(html) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}
function sourceText(md) {
  const out = [];
  for (const raw of md.split('\n')) {
    let line = strip(raw);
    while (/^>\s?/.test(line)) line = line.replace(/^>\s?/, '');
    line = strip(line);
    const t = line.trim();
    if (t === '' || t === '---') continue;
    if (t.startsWith('|')) {
      if (/^[|\s:-]+$/.test(t)) continue; // separator row
      out.push(t.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim()).join(' '));
      continue;
    }
    let s = t;
    if (/^#{1,6}\s/.test(s)) s = s.replace(/^#{1,6}\s+/, '');
    else if (/^(-|\d+\.)\s/.test(s)) s = s.replace(/^(-|\d+\.)\s+/, '');
    out.push(s.replace(/\*\*/g, ''));
  }
  return out.join(' ').replace(/\s+/g, ' ').trim();
}
function assertVerbatim(md, body, label) {
  const a = sourceText(md);
  const b = htmlText(body);
  if (a === b) return;
  let k = 0;
  while (k < a.length && k < b.length && a[k] === b[k]) k++;
  const ctx = (s) => JSON.stringify(s.slice(Math.max(0, k - 40), k + 40));
  throw new Error(
    `VERBATIM DRIFT in ${label} at char ${k} (src len ${a.length}, html len ${b.length})\n` +
    `  source: ${ctx(a)}\n  render: ${ctx(b)}`
  );
}

/* ------------------------------------------------------------------ *
 * Page chrome                                                         *
 * ------------------------------------------------------------------ */
const PENDING_STYLE = `
  <style>
    .pending-shell { --pending-warn: #d98a3a; }
    :root[data-theme="light"] .pending-shell { --pending-warn: #b26a1f; }
    .pending-banner {
      border: 1px solid var(--border-strong);
      border-left: 4px solid var(--pending-warn);
      background: var(--bg-secondary);
      border-radius: 14px;
      padding: 1.1rem 1.35rem;
      display: flex; gap: .85rem; align-items: flex-start;
      box-shadow: 0 10px 30px var(--shadow);
    }
    .pending-banner i { color: var(--pending-warn); font-size: 1.15rem; margin-top: .15rem; }
    .pending-banner .pb-label {
      font-size: .7rem; letter-spacing: .28em; text-transform: uppercase;
      color: var(--pending-warn); font-weight: 700; display: block; margin-bottom: .3rem;
    }
    .pending-banner p { color: var(--text-secondary); line-height: 1.6; font-size: .95rem; }
    .pending-banner strong { color: var(--text-primary); }
    .pending-crosslinks { display: flex; flex-wrap: wrap; gap: .75rem; }
    .pending-crosslink {
      display: inline-flex; align-items: center; gap: .5rem;
      border: 1px solid var(--border); border-radius: 999px;
      padding: .5rem .95rem; font-size: .9rem; color: var(--text-secondary);
      transition: border-color .2s, color .2s, background .2s;
    }
    .pending-crosslink:hover { border-color: var(--accent); color: var(--accent); }
    .pending-crosslink.is-primary {
      border-color: var(--pending-warn); color: var(--text-primary);
      background: color-mix(in srgb, var(--pending-warn) 12%, transparent);
    }
    .pending-crosslink.is-primary i { color: var(--pending-warn); }
    .pending-doc { color: var(--text-secondary); line-height: 1.72; font-size: 1.02rem; }
    .pending-doc .pending-h { color: var(--text-primary); font-weight: 700; line-height: 1.3; scroll-margin-top: 6rem; }
    .pending-doc .pending-h1 { font-size: 1.9rem; margin: .2rem 0 1.2rem; }
    .pending-doc .pending-h2 { font-size: 1.6rem; margin: 2.4rem 0 1rem; padding-bottom: .5rem; border-bottom: 1px solid var(--border); }
    .pending-doc .pending-h3 { font-size: 1.22rem; margin: 1.9rem 0 .7rem; }
    .pending-doc .pending-p { margin: 0 0 1rem; }
    .pending-doc strong { color: var(--text-primary); font-weight: 700; }
    .pending-doc .pending-list { margin: 0 0 1.15rem 1.35rem; padding: 0; }
    .pending-doc .pending-list li { margin: 0 0 .55rem; padding-left: .2rem; }
    .pending-doc ol.pending-list { list-style: decimal; }
    .pending-doc ul.pending-list { list-style: disc; }
    .pending-doc .pending-list .pending-list { margin-top: .55rem; margin-bottom: .3rem; }
    .pending-doc .pending-hr { border: 0; border-top: 1px solid var(--border); margin: 2.2rem 0; }
    .pending-doc .pending-quote {
      margin: 0 0 1.2rem; padding: .3rem 0 .3rem 1.15rem;
      border-left: 3px solid var(--border-strong); color: var(--text-secondary);
    }
    .pending-doc .pending-quote .pending-p { margin-bottom: .75rem; }
    .pending-doc .pending-quote .pending-p:last-child { margin-bottom: 0; }
    .pending-table-wrap { overflow-x: auto; margin: 0 0 1.4rem; border: 1px solid var(--border); border-radius: 12px; }
    .pending-table { width: 100%; border-collapse: collapse; font-size: .9rem; min-width: 640px; }
    .pending-table th, .pending-table td { text-align: left; vertical-align: top; padding: .6rem .8rem; border-bottom: 1px solid var(--border); }
    .pending-table thead th { background: var(--bg-tertiary); color: var(--text-primary); font-weight: 600; white-space: nowrap; }
    .pending-table tbody tr:last-child td { border-bottom: 0; }
    .pending-table td:first-child { white-space: nowrap; color: var(--text-primary); font-weight: 600; }
  </style>`;

const banner = () => `
        <div class="pending-banner mb-10" role="note" aria-label="Pending status">
          <i class="fas fa-triangle-exclamation" aria-hidden="true"></i>
          <div>
            <span class="pb-label">Pending — not canon</span>
            <p>This is a <strong>pre-vote proposal</strong> headed to a gauntlet vote and <strong>may fail</strong>. It is not doctrine. Live tax rates remain <strong>70&nbsp;/&nbsp;35&nbsp;/&nbsp;17&nbsp;/&nbsp;8</strong> (Charter&nbsp;§12.1, canon&nbsp;v21.9.2). Nothing here changes canon.</p>
          </div>
        </div>`;

function page({ file, title, description, heroKicker, heroTitle, heroSub, crosslinks, body, verbatim }) {
  const chrome = `<!DOCTYPE html>
<html data-theme="dark" lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
  <meta name="theme-color" content="#07090f" media="(prefers-color-scheme: dark)">
  <meta name="theme-color" content="#f5f7fb" media="(prefers-color-scheme: light)">
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="https://jasonhchronicles.com/VMSS/${file}" />

  <script>
    const saved = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', saved);
  </script>
  <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin>

  <link href="styles.css" rel="stylesheet"/>
  <link rel="stylesheet" href="assets/css/tailwind.css">
<noscript><style>body{opacity:1}</style></noscript>
  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" as="style" crossorigin>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" rel="stylesheet"/>

  <link href="favicon.ico" rel="icon" type="image/x-icon"/>
  <link href="favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"/>
  <link href="favicon-16x16.png" rel="icon" sizes="16x16" type="image/png"/>
  <link href="apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180"/>
${PENDING_STYLE}
</head>

<body class="bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col min-h-screen"><a href="#main-content" class="sr-only-focusable">Skip to content</a>
  <div id="navbar-placeholder"></div>

  <main id="main-content" class="flex-1 pending-shell">
    <section class="pt-32 pb-32">
      <div class="lg:max-w-[70%] mx-auto px-6 max-w-4xl">

        <div class="mb-8">
          <p class="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">${heroKicker}</p>
          <h1 class="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">${heroTitle}</h1>
          <p class="text-lg text-[var(--text-muted)] max-w-3xl leading-relaxed">${heroSub}</p>
        </div>
${banner()}
${crosslinks ? `        <div class="pending-crosslinks mb-12">\n${crosslinks}\n        </div>` : ''}

        <div class="pending-doc">
${body.split('\n').map((l) => (l ? '          ' + l : l)).join('\n')}
        </div>

      </div>
    </section>
  </main>

  <div id="footer-placeholder"></div>
  <script src="script.js" defer></script>
</body>
</html>
`;
  if (verbatim) assertVerbatim(verbatim.md, body, file);
  write(file, chrome);
  return file;
}

/* ------------------------------------------------------------------ *
 * Build                                                               *
 * ------------------------------------------------------------------ */
const SRC = {
  ballot: 'docs-review/RATIFY-TAX-50-petition-v4.1.md',
  opp: 'docs-review/RATIFY-TAX-50-opposition-brief.md',
  record: 'docs-review/RATIFY-TAX-50-session-record.md',
};
const md = {
  ballot: read(SRC.ballot),
  opp: read(SRC.opp),
  record: read(SRC.record),
};

const HUB = 'pending-ratification.html';
const BALLOT = 'pending-ratify-tax-50-ballot.html';
const OPP = 'pending-ratify-tax-50-opposition.html';
const RECORD = 'pending-ratify-tax-50-record.html';

const link = (href, cls, icon, label) =>
  `          <a href="${href}" class="pending-crosslink${cls ? ' ' + cls : ''}"><i class="fas ${icon}" aria-hidden="true"></i> ${label}</a>`;

const built = [];

/* Ballot — links the opposition brief above the fold, labelled as such. */
built.push(page({
  file: BALLOT,
  title: 'RATIFY-TAX-50 Ballot (Pending) • The Five Rings',
  description: 'Ballot text for RATIFY-TAX-50 (petition v4.1) — a pending, non-canon federal law proposal to reduce the Charter §12.1 top-marginal schedule. Runs as a real gauntlet vote and may fail. Published alongside its opposition brief.',
  heroKicker: 'Pending Ratification · Ballot Text',
  heroTitle: 'RATIFY-TAX-50 — The Ballot',
  heroSub: 'Petition v4.1, the text before the gauntlet. Read it alongside the opposition brief that publishes with it, then the two are weighed by the vote — the terminal adjudicator.',
  crosslinks: [
    link(OPP, 'is-primary', 'fa-scale-balanced', 'Opposition Brief — published alongside this ballot'),
    link(RECORD, '', 'fa-clipboard-list', 'Session Record'),
    link(HUB, '', 'fa-arrow-left', 'Pending Ratification'),
  ].join('\n'),
  body: parseBlocks(md.ballot.split('\n')),
  verbatim: { md: md.ballot },
}));

/* Opposition brief — co-presented with the ballot. */
built.push(page({
  file: OPP,
  title: 'RATIFY-TAX-50 Opposition Brief (Pending) • The Five Rings',
  description: 'The in-world opposition brief for RATIFY-TAX-50 — adversarial-review findings that attach verbatim to the gauntlet ballot. Pending, non-canon. Live rates remain 70/35/17/8.',
  heroKicker: 'Pending Ratification · Opposition Brief',
  heroTitle: 'RATIFY-TAX-50 — Opposition Brief',
  heroSub: 'The hostile analysis a real legislature publishes alongside a proposal. It attaches to the ballot verbatim; voters weigh it against the petition’s disclosed case.',
  crosslinks: [
    link(BALLOT, 'is-primary', 'fa-file-lines', 'The Ballot (petition v4.1)'),
    link(RECORD, '', 'fa-clipboard-list', 'Session Record'),
    link(HUB, '', 'fa-arrow-left', 'Pending Ratification'),
  ].join('\n'),
  body: parseBlocks(md.opp.split('\n')),
  verbatim: { md: md.opp },
}));

/* Session record — provenance. */
built.push(page({
  file: RECORD,
  title: 'RATIFY-TAX-50 Session Record (Pending) • The Five Rings',
  description: 'The founder-ruling and adversarial-review record behind RATIFY-TAX-50. Pending, non-canon provenance for the ballot package. Live rates remain 70/35/17/8.',
  heroKicker: 'Pending Ratification · Session Record',
  heroTitle: 'RATIFY-TAX-50 — Session Record',
  heroSub: 'Founder rulings of record, the adversarial-review ledger, and the line closure that produced the v4.1 ballot text and its opposition brief.',
  crosslinks: [
    link(BALLOT, 'is-primary', 'fa-file-lines', 'The Ballot (petition v4.1)'),
    link(OPP, '', 'fa-scale-balanced', 'Opposition Brief'),
    link(HUB, '', 'fa-arrow-left', 'Pending Ratification'),
  ].join('\n'),
  body: parseBlocks(md.record.split('\n')),
  verbatim: { md: md.record },
}));

/* Hub — authored section landing (no verbatim check). */
const hubBody = [
  `<p class="pending-p">This section holds <strong>pre-vote, non-canon</strong> material: proposals drafted and adversarially reviewed, then sent to a gauntlet vote whose outcome is not pre-decided. A proposal here is not doctrine. It may pass; it may fail. A failed vote is itself a legitimate output — a boundary marker under standing doctrine (LP-062 / LP-065).</p>`,
  `<p class="pending-p">Nothing in this section changes canon. Live doctrine remains <strong>v21.9.2</strong>, and the engraved Charter&nbsp;§12.1 top-marginal tax schedule remains <strong>70&nbsp;/&nbsp;35&nbsp;/&nbsp;17&nbsp;/&nbsp;8</strong>.</p>`,
  `<h2 class="pending-h pending-h2">RATIFY-TAX-50</h2>`,
  `<p class="pending-p">A petition to reduce the engraved §12.1 top-marginal schedule. It runs as a real federal LP vote, expected on current synthetic margins to fail, and run anyway so that a real NO at the threshold fences the rate question as a boundary marker. Per doctrine, the adversarial review’s uncurable findings publish <strong>alongside</strong> the ballot as an opposition brief — presented together, weighed by the vote.</p>`,
  `<div class="pending-crosslinks" style="margin-top:1.25rem">\n` +
    [link(BALLOT, 'is-primary', 'fa-file-lines', 'The Ballot — petition v4.1'),
     link(OPP, 'is-primary', 'fa-scale-balanced', 'Opposition Brief — published alongside'),
     link(RECORD, '', 'fa-clipboard-list', 'Session Record — provenance')].join('\n') +
    `\n          </div>`,
].join('\n');

built.push(page({
  file: HUB,
  title: 'Pending Ratification • The Five Rings',
  description: 'Pending, non-canon proposals headed to a gauntlet vote. Currently: RATIFY-TAX-50, a §12.1 top-marginal tax reduction and its opposition brief. Live canon is unchanged (v21.9.2).',
  heroKicker: 'The Five Rings',
  heroTitle: 'Pending Ratification',
  heroSub: 'Pre-vote proposals and the adversarial briefs that publish alongside them. Not canon — subject to a gauntlet vote that may fail.',
  crosslinks: '',
  body: hubBody,
}));

console.log(`pending-pages: built + verified ${built.length} pages`);
for (const f of built) console.log(`  ${f}`);
