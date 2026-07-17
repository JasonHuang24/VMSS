#!/usr/bin/env node
/**
 * build-pending-pages.mjs — generates the "Ratification Record" section of the
 * site from the docs-review source documents. These are decided proposals and
 * their retained adversarial briefs: the pages carry a standing status banner
 * and never register as law entries (no <article class="law-entry">), so
 * check-canon and build-law-toc are unaffected.
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

/* Heading anchors (R15 §2/§4). A register citation may name a section of one of
   these documents ("[P] §5", "[O] Finding 5", the dateline recorded at R14), and
   R15 forbids such a cite resolving to a page top. The sections exist; they
   lacked ids. These are derived from the heading text, so they are stable as
   long as the heading is, and short enough to read in a URL:
     "## 5. Fiscal facts schema"        -> sec-5
     "## Finding 5 — ..."               -> finding-5
     "## Founder ruling R14 — ..."      -> r14
     "## Ungrounded instincts ..."      -> ungrounded-instincts (slug fallback)
   Ids are attributes only: the verbatim check compares visible text, which this
   does not touch. HEADING_SLUGS is reset per document by mdToHtml. */
let HEADING_SLUGS = new Set();
const slugify = (s) =>
  s.toLowerCase()
    .replace(/[‐-―]/g, '-')          // unicode dashes
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'section';
function headingId(text) {
  let base;
  let m;
  if ((m = text.match(/^Finding (\d+)/))) base = `finding-${m[1]}`;
  else if ((m = text.match(/^(\d+)\.\s/))) base = `sec-${m[1]}`;
  else if ((m = text.match(/^Founder ruling (R\d+)/))) base = m[1].toLowerCase();
  else base = slugify(text.replace(/\*\*/g, ''));
  let id = base;
  for (let n = 2; HEADING_SLUGS.has(id); n++) id = `${base}-${n}`;
  HEADING_SLUGS.add(id);
  return id;
}
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
      const id = headingId(h[2]);
      blocks.push(`<h${lvl} class="pending-h pending-h${h[1].length}" id="${id}">${inline(h[2])}</h${lvl}>`);
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

/* One rendered document. Resets the heading-slug registry so ids are unique
   per page and identical across runs. */
function renderDoc(source) {
  HEADING_SLUGS = new Set();
  return parseBlocks(source.split('\n'));
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
    /* Process-tier framing header (R13, v22.2). Declares the whole section as
       drafting archive before the reader meets any of its contents. Dashed
       edge and muted type mark it as apparatus, not canon. */
    .process-frame {
      border: 1px dashed var(--border-strong); border-radius: 12px;
      background: var(--bg-tertiary);
      padding: 1rem 1.25rem; margin-bottom: 1.5rem;
      font-size: .88rem; line-height: 1.65; color: var(--text-muted);
    }
    .process-frame .pf-label {
      display: block; font-size: .62rem; letter-spacing: .24em; text-transform: uppercase;
      font-weight: 700; color: var(--text-secondary); margin-bottom: .4rem;
    }
    .process-frame strong { color: var(--text-secondary); }
  </style>`;

/* Standing status banner, carried by every page in the section. It states the
   in-world outcome and only that (R13, v22.2): the petition failed its
   gauntlet and failed again, narrower, on review. The drafting interval in
   which a 50-schedule was written into the register — and taken back out — is
   process history and is told on the session-record page under the Process
   frame, never on a status banner. A banner announces what the civilization
   decided; it is not the place to narrate how the record got drafted.

   Closing line added v22.3. This petition failed and stays failed — the
   succession is a fact about the line, not a reversal of this verdict, and the
   successor is a new filing rather than a reopening. It carries no rate either,
   so the live schedule named above is unchanged by it. */
const banner = () => `
        <div class="pending-banner mb-10" role="note" aria-label="Ratification status">
          <i class="fas fa-scale-balanced" aria-hidden="true"></i>
          <div>
            <span class="pb-label">Failed Petition — record retained</span>
            <p><strong>FAILED PETITION</strong> — 1–4 at gauntlet; advocacy review 3–2, short of the zero-fail threshold. The live schedule is <strong>70 / 35 / 17 / 8</strong> (<a href="law-polling.html#lp-073">LP-073</a>); re-petition is available on audited facts (<a href="whitepaper.html#trajectory-doctrine">Trajectory Doctrine</a>). All three briefs — opposition, advocacy, and supplemental — publish as permanent record. <strong>Succeeded at ~Y175 by <a href="law-polling.html#lp-074">RATIFY-TAX-50-II</a> (registered 5–0, conditional)</strong> — a new line, not a reopening; it registers a rule and changes no rate.</p>
          </div>
        </div>`;

/* The section's Process-tier declaration (R13, v22.2). Carried by the hub, at
   the top, before anything else: this section is drafting archive and reads as
   out-of-world authorship. It says so about its own interventions too — the
   record includes the ones that were made and then withdrawn. */
const processFrame = () => `
        <div class="process-frame" role="note" aria-label="Record tier">
          <span class="pf-label">Process Record — drafting archive, not world canon</span>
          <p>This section is the <strong>drafting archive</strong>: the out-of-world authorship history behind the civilization's fiscal law. It is not a page of the world's own record and nothing in it is in force. The archive keeps <strong>interventions and their withdrawal alike</strong> — including the authorial override that was applied to a chamber result during drafting and later taken back, and the statute texts that were written into the register and then deregistered. In world, the founding authority terminated into the charter at Y0 and no ruling of that kind is an event in the civilization's history. What the world records is the vote: <strong>RATIFY-TAX-50 failed</strong>, and the schedule at <a href="law-polling.html#lp-073">LP-073</a> stands.</p>
        </div>`;

function page({ file, title, description, heroKicker, heroTitle, heroSub, crosslinks, body, verbatim, framing }) {
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
${framing ? processFrame() : ''}
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
  adv: 'docs-review/AFFIRM-TAX-50-advocacy-brief.md',
  supp: 'docs-review/AFFIRM-TAX-50-supplemental-brief.md',
  record: 'docs-review/RATIFY-TAX-50-session-record.md',
};
const md = {
  ballot: read(SRC.ballot),
  opp: read(SRC.opp),
  adv: read(SRC.adv),
  supp: read(SRC.supp),
  record: read(SRC.record),
};

const HUB = 'pending-ratification.html';
const BALLOT = 'pending-ratify-tax-50-ballot.html';
const OPP = 'pending-ratify-tax-50-opposition.html';
const ADV = 'pending-ratify-tax-50-advocacy.html';
const SUPP = 'pending-ratify-tax-50-supplemental.html';
const RECORD = 'pending-ratify-tax-50-record.html';

const link = (href, cls, icon, label) =>
  `          <a href="${href}" class="pending-crosslink${cls ? ' ' + cls : ''}"><i class="fas ${icon}" aria-hidden="true"></i> ${label}</a>`;

const built = [];

/* The three adversarial briefs link symmetrically to one another: no brief is
   presented as the page the others are footnotes to. A reader landing on any
   one of them reaches the other two at the same weight, above the fold. */
const briefLinks = (self) => [
  [OPP, 'fa-scale-balanced', 'Opposition Brief — the case against'],
  [ADV, 'fa-scale-balanced', 'Advocacy Brief — the case for'],
  [SUPP, 'fa-comments', 'Supplemental Steelman — the case for, restated'],
].filter(([f]) => f !== self).map(([f, i, l]) => link(f, 'is-primary', i, l));

/* Ballot — links all three briefs above the fold, labelled as such. */
built.push(page({
  file: BALLOT,
  title: 'RATIFY-TAX-50 Ballot (Failed) • The Five Rings',
  description: 'Ballot text for RATIFY-TAX-50 (petition v4.1) — the federal law proposal that would have reduced the Charter §12.1 top-marginal schedule to 50/25/12.5/6.25. It failed its gauntlet 1–4 and reached only 3–2 on advocacy review, short of the zero-fail threshold; the schedule at LP-073 stands. Retained as record alongside its opposition, advocacy, and supplemental briefs.',
  heroKicker: 'Ratification Record · Ballot Text',
  heroTitle: 'RATIFY-TAX-50 — The Ballot',
  heroSub: 'Petition v4.1, the text carried to the gauntlet. It failed there 1–4, and an advocacy review narrowed the vote to 3–2 — still short of the zero-fail threshold. Read alongside the three briefs retained with it.',
  crosslinks: [
    ...briefLinks(BALLOT),
    link(RECORD, '', 'fa-clipboard-list', 'Session Record'),
    link(HUB, '', 'fa-arrow-left', 'Ratification Record'),
  ].join('\n'),
  body: renderDoc(md.ballot),
  verbatim: { md: md.ballot },
}));

/* Opposition brief — the case that held two chambers at both adjudications. */
built.push(page({
  file: OPP,
  title: 'RATIFY-TAX-50 Opposition Brief (Retained) • The Five Rings',
  description: 'The in-world opposition brief for RATIFY-TAX-50 — adversarial-review findings that attached verbatim to the gauntlet ballot. Retained as permanent record; its findings held Meritboard and Lower at both adjudications, and the petition failed.',
  heroKicker: 'Ratification Record · Opposition Brief',
  heroTitle: 'RATIFY-TAX-50 — Opposition Brief',
  heroSub: 'The hostile analysis a real legislature publishes alongside a proposal. It attached to the ballot verbatim and is retained as permanent record — the case against the schedule, and the one the advocacy review could not move Meritboard or Lower off.',
  crosslinks: [
    ...briefLinks(OPP),
    link(BALLOT, '', 'fa-file-lines', 'The Ballot (petition v4.1)'),
    link(RECORD, '', 'fa-clipboard-list', 'Session Record'),
    link(HUB, '', 'fa-arrow-left', 'Ratification Record'),
  ].join('\n'),
  body: renderDoc(md.opp),
  verbatim: { md: md.opp },
}));

/* Advocacy brief — the affirmative review that re-ran the vote at 3–2. */
built.push(page({
  file: ADV,
  title: 'AFFIRM-TAX-50 Advocacy Brief (Retained) • The Five Rings',
  description: 'The affirmative advocacy brief for RATIFY-TAX-50 — a cold, citation-verified review that re-ran the chamber vote at 3–2, moving Court, Sanctuary, and Main but falling short of the zero-fail enactment threshold. Retained as permanent record.',
  heroKicker: 'Ratification Record · Advocacy Brief',
  heroTitle: 'AFFIRM-TAX-50 — Advocacy Brief',
  heroSub: 'The strongest affirmative case the record supports, argued cold with every citation verified. It re-ran the vote and moved three chambers — Court, Sanctuary, and Main — but enactment requires zero failing chambers, and Meritboard and Lower held. Retained as permanent record.',
  crosslinks: [
    ...briefLinks(ADV),
    link(BALLOT, '', 'fa-file-lines', 'The Ballot (petition v4.1)'),
    link(RECORD, '', 'fa-clipboard-list', 'Session Record'),
    link(HUB, '', 'fa-arrow-left', 'Ratification Record'),
  ].join('\n'),
  body: renderDoc(md.adv),
  verbatim: { md: md.adv },
}));

/* Supplemental steelman — registered after adjudication; did not reopen it. */
built.push(page({
  file: SUPP,
  title: 'AFFIRM-TAX-50 Supplemental Steelman (Retained) • The Five Rings',
  description: 'The supplemental steelman for RATIFY-TAX-50 — a fuller affirmative restatement registered after the 3–2 adjudication. Per the R9 termination pattern it did not reopen the vote. Retained as permanent record.',
  heroKicker: 'Ratification Record · Supplemental Steelman',
  heroTitle: 'AFFIRM-TAX-50 — Supplemental Steelman',
  heroSub: 'The affirmative case restated at full length, registered after the 3–2 adjudication had already closed. Per the R9 termination pattern it was recorded without re-adjudication — a brief the record keeps but the vote never heard.',
  crosslinks: [
    ...briefLinks(SUPP),
    link(BALLOT, '', 'fa-file-lines', 'The Ballot (petition v4.1)'),
    link(RECORD, '', 'fa-clipboard-list', 'Session Record'),
    link(HUB, '', 'fa-arrow-left', 'Ratification Record'),
  ].join('\n'),
  body: renderDoc(md.supp),
  verbatim: { md: md.supp },
}));

/* Session record — provenance. */
built.push(page({
  file: RECORD,
  title: 'RATIFY-TAX-50 Session Record • The Five Rings',
  description: 'The drafting provenance behind RATIFY-TAX-50 — the authorial rulings of record, the adversarial-review ledger, and the line closure that produced the v4.1 ballot text and its briefs. Process tier: out-of-world authorship, including the interventions that were made and later withdrawn.',
  heroKicker: 'Process Record · Session Record',
  heroTitle: 'RATIFY-TAX-50 — Session Record',
  heroSub: 'The drafting provenance, out-of-world: the authorial rulings of record — including the override that was applied during drafting and later withdrawn — the adversarial-review ledger, and the line closure that produced the v4.1 ballot text and its briefs. In world, the petition simply failed.',
  crosslinks: [
    ...briefLinks(RECORD),
    link(BALLOT, '', 'fa-file-lines', 'The Ballot (petition v4.1)'),
    link(HUB, '', 'fa-arrow-left', 'Ratification Record'),
    link('deregistered-statutes.html', '', 'fa-box-archive', 'Deregistered statutes — drafting designations 074 / 075'),
  ].join('\n'),
  body: renderDoc(md.record),
  verbatim: { md: md.record },
  framing: true,
}));

/* Hub — authored section landing (no verbatim check). */
const hubBody = [
  `<p class="pending-p">This section is the <strong>drafting archive</strong> behind the civilization’s ratification record: proposals drafted, adversarially reviewed, and carried to a decision, with the briefs that publish alongside each. Outcomes are not pre-decided; a failed vote is itself a legitimate output and a boundary marker under standing doctrine (LP-062 / LP-065). Because it is an archive of authorship, it keeps what the drafting did and then undid — the interventions, and their withdrawal — where the world’s own record keeps only what the world decided.</p>`,
  `<h2 class="pending-h pending-h2">RATIFY-TAX-50 — Failed petition</h2>`,
  `<p class="pending-p"><strong>FAILED PETITION.</strong> The petition would have reduced the engraved §12.1 top-marginal schedule to <strong>50&nbsp;/&nbsp;25&nbsp;/&nbsp;12.5&nbsp;/&nbsp;6.25</strong>, an exact halving of every point. It was filed, it went to the chambers, and it lost — twice. <strong>At the gauntlet:</strong> 1–4 against — Meritboard, Court, Sanctuary, and Lower opposed, Main in favor. <strong>On advocacy review:</strong> a cold, citation-verified affirmative review re-ran the vote and narrowed it to 3–2, moving Court, Sanctuary, and Main; but enactment requires zero failing chambers, and Meritboard and Lower held. A majority is not the threshold. The live schedule is and remains <strong>70&nbsp;/&nbsp;35&nbsp;/&nbsp;17&nbsp;/&nbsp;8</strong> (<a href="law-polling.html#lp-073">LP-073</a>), and the petition is preserved as a failed-petition record under standing doctrine.</p>`,
  `<p class="pending-p">What survived is the direction. Every chamber endorsed the trajectory principle even while refusing the magnitude attached to it — 5–0 across the ratification chambers — and it stands as the <a href="whitepaper.html#trajectory-doctrine">Trajectory Doctrine</a> at Whitepaper §12.1: top marginal rates track demonstrated institutional need, and any reduction needs audited Path&nbsp;2 facts at the standard zero-fail threshold. RATIFY-TAX-50 may be re-petitioned on exactly those terms once the Path&nbsp;2 controlling estimate lands. All three briefs — opposition, advocacy, and supplemental — publish as permanent record. Rates fall when shown, and hold when merely told.</p>`,
  `<p class="pending-p" style="font-size:.9rem;color:var(--text-muted)"><strong>Drafting note.</strong> During the v22.0–v22.1 interval the reduced schedule was written into the law register as an enacted statute under the drafting designation <strong>LP-074</strong>, on an authorial override of the failed chamber result, and a trajectory statute was registered beside it as <strong>LP-075</strong>. The override was withdrawn at v22.1 and both entries were deregistered at v22.2 — the first because it described an enactment that never occurred in world, the second because its principle belongs in doctrine rather than the register. Both texts are preserved verbatim at the <a href="deregistered-statutes.html">deregistered statutes of record</a>, and the full sequence is told in the <a href="pending-ratify-tax-50-record.html">session record</a>. None of it is world canon; all of it is kept. Both are drafting designations only: the register's LP-074 is <a href="law-polling.html#lp-074">RATIFY-TAX-50-II</a>, registered 5–0 at ~Y175, and 075 remains unissued (R15).</p>`,
  `<div class="pending-crosslinks" style="margin-top:1.25rem">\n` +
    [link(BALLOT, 'is-primary', 'fa-file-lines', 'The Ballot — petition v4.1'),
     link(OPP, 'is-primary', 'fa-scale-balanced', 'Opposition Brief — the case against'),
     link(ADV, 'is-primary', 'fa-scale-balanced', 'Advocacy Brief — the case for'),
     link(SUPP, 'is-primary', 'fa-comments', 'Supplemental Steelman — the case for, restated'),
     link(RECORD, '', 'fa-clipboard-list', 'Session Record — drafting provenance'),
     link('deregistered-statutes.html', '', 'fa-box-archive', 'Deregistered statutes — drafting designations 074 / 075')].join('\n') +
    `\n          </div>`,
  `<h2 class="pending-h pending-h2" id="path-2">Path 2 — Standing preregistered fiscal-facts audit</h2>`,
  `<p class="pending-p">Path 2 is a <strong>standing preregistered audit workstream</strong>, decoupled from any petition vote, whose estimates supersede the ballot’s authored values as they land (petition v4.1 §7(e)). The <a href="whitepaper.html#trajectory-doctrine">Trajectory Doctrine</a> makes it the gate rather than a follow-up: a failed reduction may be re-petitioned when the controlling estimate lands, on audited facts and the standard zero-fail threshold. The questions below are what a genuine ratification would have to answer. The audit binds itself to six enforceability criteria:</p>`,

  `<ul class="pending-list"><li><strong>Preregistered methodology</strong> — the estimation method is fixed and published before any results.</li><li><strong>Fixed data cutoff</strong> — each estimate names the data window it draws on.</li><li><strong>Definitions frozen before results</strong> — measured terms are defined ahead of the numbers, never fitted to them.</li><li><strong>Symmetric revision</strong> — estimates move up or down on the evidence, with no directional thumb on the scale.</li><li><strong>Published uncertainty</strong> — every controlling figure ships with its band, not as a bare point estimate.</li><li><strong>Predetermined controlling-estimate rule</strong> — which estimate governs is settled in advance of seeing the values.</li></ul>`,
  `<p class="pending-p">Two questions stand preregistered to the workstream:</p>`,
  `<ul class="pending-list"><li><strong>(a) SCM activation-frequency response to released liquidity.</strong> Whether the liquidity released at the proposed 50&nbsp;/&nbsp;25&nbsp;/&nbsp;12.5&nbsp;/&nbsp;6.25 schedule would raise district aggregates enough to increase Savings Circulation Mandate trigger frequency, and by how much — the bound the affirmative case leans on to answer concentration.</li><li><strong>(b) Marginal utility of private capital flow in a post-scarcity upper stack.</strong> What an additional retained dollar of elite liquidity buys the civilization once survival and the dividend are already funded from the automation side.</li></ul>`,
].join('\n');

built.push(page({
  file: HUB,
  title: 'Ratification Record • The Five Rings',
  description: 'The drafting archive behind the civilization’s ratification record. RATIFY-TAX-50 — the proposed §12.1 top-marginal reduction to 50/25/12.5/6.25 — failed its gauntlet 1–4 and reached only 3–2 on advocacy review; the schedule at LP-073 (70/35/17/8) stands, and all three briefs are retained as permanent record.',
  heroKicker: 'Process Record · The Five Rings',
  heroTitle: 'Ratification Record',
  heroSub: 'The drafting archive: decided proposals and the adversarial briefs that publish alongside them, with their authorship provenance kept — interventions and withdrawals included.',
  crosslinks: '',
  body: hubBody,
  framing: true,
}));

console.log(`pending-pages: built + verified ${built.length} pages`);
for (const f of built) console.log(`  ${f}`);
