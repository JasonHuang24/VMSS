#!/usr/bin/env node
/**
 * build-path2-pages.mjs — generates the Path 2 Charter pages (canon v22.5).
 *
 * Four pages from five verified source documents:
 *   - path-2-charter.html        (World tier) — the adopted Charter, v4
 *   - path-2-schedule.html       (World tier) — the §10.4 enumerated Schedule
 *   - path-2-risk-register.html  (World tier) — the Residual-Risk Register
 *   - pending-ratify-tax-50-rulings.html (Process tier) — the two Presidential
 *     rulings, appended to the TAX-50 Ratification Record page set.
 *
 * Styled per statute-page conventions (ls-* typography, as on
 * pending-ratify-tax-50-ii-statute.html). The page chrome — hero, status
 * banner, cross-links — is authored, not sourced, and is excluded from the
 * verbatim check. The document body is rendered from Markdown and then
 * machine-checked: the visible text of the generated body must equal the
 * visible text of the source (whitespace-normalised), so "verbatim" is proved
 * rather than eyeballed. Cross-reference links are injected as <a> wrappers
 * around existing words only — they change markup, never text, so the verbatim
 * check still holds after injection.
 *
 * Run:  node tools/build-path2-pages.mjs   (exit 0 = built + verified)
 */
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFileSync(join(ROOT, f), 'utf8').replace(/\r\n?/g, '\n');
const write = (f, s) => writeFileSync(join(ROOT, f), s);

/* ------------------------------------------------------------------ *
 * Markdown → HTML (ls-* typography). Scoped to the constructs these   *
 * documents use: ATX headings (incl. wrapped multi-line headings),    *
 * ---, GFM pipe tables, ordered/unordered lists with continuation and *
 * one level of nesting, paragraphs, ** bold **, and * italic *.       *
 * ------------------------------------------------------------------ */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');

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
  return `<div class="ls-table-wrap"><table class="ls-table">${thead}${tbody}</table></div>`;
}

function parseList(lines, start, base, cfg) {
  const type = marker(strip(lines[start])).type;
  const items = [];
  let i = start;
  while (i < lines.length) {
    if (isBlank(lines[i])) {
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
    let content = parseBlocks([m.rest, ...dedented], cfg);
    const solo = content.match(/^<p class="ls-p">([\s\S]*)<\/p>$/);
    if (solo) content = solo[1];
    items.push(content);
  }
  const tag = type === 'ol' ? 'ol' : 'ul';
  return { html: `<${tag} class="ls-list">${items.map((it) => `<li>${it}</li>`).join('')}</${tag}>`, next: i };
}

function parseBlocks(lines, cfg) {
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    if (isBlank(lines[i])) { i++; continue; }
    const t = strip(lines[i]);

    const h = t.match(/^(#{1,6}) (.*)$/);
    if (h) {
      const hashes = h[1];
      let text = h[2];
      i++;
      // Join adjacent same-level heading lines (a wrapped heading, e.g. the
      // Charter's two-line Article IV title). Stops at a blank line or a
      // heading of a different level.
      while (i < lines.length && !isBlank(lines[i])) {
        const h2 = strip(lines[i]).match(/^(#{1,6}) (.*)$/);
        if (h2 && h2[1] === hashes) { text += ' ' + h2[2]; i++; } else break;
      }
      const cls = hashes.length === 1 ? 'ls-h2 ls-part' : hashes.length === 2 ? 'ls-h2' : 'ls-h3';
      const id = cfg.headingId ? cfg.headingId(text, hashes.length) : null;
      blocks.push(`<p class="ls-h ${cls}"${id ? ` id="${id}"` : ''}>${inline(text)}</p>`);
      continue;
    }
    if (t === '---') { blocks.push('<hr class="ls-hr">'); i++; continue; }
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
      blocks.push(`<blockquote class="ls-quote">${parseBlocks(inner, cfg)}</blockquote>`); continue;
    }
    if (marker(t)) {
      const { html: lh, next } = parseList(lines, i, indentOf(lines[i]), cfg);
      blocks.push(lh); i = next; continue;
    }
    const para = [];
    while (i < lines.length && !isBlank(lines[i]) && !startsBlock(strip(lines[i]))) {
      para.push(strip(lines[i])); i++;
    }
    const text = para.join(' ');
    const id = cfg.paraAnchor ? cfg.paraAnchor(text) : null;
    blocks.push(`<p class="ls-p"${id ? ` id="${id}"` : ''}>${inline(text)}</p>`);
  }
  return blocks.join('\n');
}

/* One rendered document. The leading title block (the first run of heading
   lines, up to the first blank) renders as the ls-h1 title plus a muted
   subtitle; the rest parses normally. */
function renderDoc(md, cfg = {}) {
  const lines = md.split('\n');
  let k = 0;
  while (k < lines.length && !isBlank(lines[k])) k++;
  const titleLines = lines.slice(0, k);
  const rest = lines.slice(k);
  const head = [];
  const title = titleLines[0].replace(/^#{1,6}\s+/, '');
  head.push(`<p class="ls-h ls-h1"${cfg.titleId ? ` id="${cfg.titleId}"` : ''}>${inline(title)}</p>`);
  const sub = titleLines.slice(1).map((l) => l.replace(/^#{1,6}\s+/, '')).join(' ').trim();
  if (sub) head.push(`<p class="ls-p ls-doc-sub">${inline(sub)}</p>`);
  return head.join('\n') + '\n' + parseBlocks(rest, cfg);
}

/* ------------------------------------------------------------------ *
 * Verbatim self-check: visible text of the rendered body must equal   *
 * the visible text of the source, independent of markup and wrapping. *
 * ------------------------------------------------------------------ */
function htmlText(html) {
  return html
    // Inline tags hug their text (no space): <em>Flow Test</em>, must read
    // "Flow Test," not "Flow Test ,". Block/structural tags become a space so
    // adjacent words and table cells stay separated.
    .replace(/<\/?(?:strong|em|a)\b[^>]*>/g, '')
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
      if (/^[|\s:-]+$/.test(t)) continue;
      out.push(t.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim()).join(' '));
      continue;
    }
    let s = t;
    if (/^#{1,6}\s/.test(s)) s = s.replace(/^#{1,6}\s+/, '');
    else if (/^(-|\d+\.)\s/.test(s)) s = s.replace(/^(-|\d+\.)\s+/, '');
    out.push(s.replace(/\*\*/g, '').replace(/\*/g, ''));
  }
  return out.join(' ').replace(/\s+/g, ' ').trim();
}
function assertVerbatim(md, body, label) {
  const a = sourceText(md);
  const b = htmlText(body);
  if (a === b) return a.length;
  let k = 0;
  while (k < a.length && k < b.length && a[k] === b[k]) k++;
  const ctx = (s) => JSON.stringify(s.slice(Math.max(0, k - 40), k + 40));
  throw new Error(
    `VERBATIM DRIFT in ${label} at char ${k} (src len ${a.length}, html len ${b.length})\n` +
    `  source: ${ctx(a)}\n  render: ${ctx(b)}`
  );
}

/* Wrap the first occurrence of `needle` in `body` with a link, without
   altering any visible text. Throws if the anchor is absent (a cross-link that
   silently no-ops is worse than a loud failure). */
function linkFirst(body, needle, href) {
  const idx = body.indexOf(needle);
  if (idx === -1) throw new Error(`cross-link anchor not found: ${JSON.stringify(needle)}`);
  return body.slice(0, idx) + `<a href="${href}">${needle}</a>` + body.slice(idx + needle.length);
}

/* ------------------------------------------------------------------ *
 * Heading-id strategies                                                *
 * ------------------------------------------------------------------ */
const ROMAN = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10, XI: 11, XII: 12, XIII: 13, XIV: 14 };

const charterCfg = {
  headingId(text) {
    let m;
    if ((m = text.match(/^Article ([IVXL]+)\b/)) && ROMAN[m[1]]) return `art-${ROMAN[m[1]]}`;
    if (/^Parameter Schedule\b/.test(text)) return 'parameter-schedule';
    return null;
  },
  paraAnchor(text) {
    const m = text.match(/^\*\*§(\d+)\.(\d+)\b/);
    return m ? `s-${m[1]}-${m[2]}` : null;
  },
};

const scheduleCfg = {
  headingId(text) {
    let m;
    if (/^Preliminary ruling of construction\b/.test(text)) return 'ruling-of-construction';
    if ((m = text.match(/^PART ([A-D])\b/))) return `part-${m[1].toLowerCase()}`;
    if (/^A\.1 /.test(text)) return 'om';
    if ((m = text.match(/^A\.([2-6]) /))) return `a-${m[1]}`;
    return null;
  },
  paraAnchor(text) {
    const m = text.match(/^\*\*A\.1\.(\d+)\b/);
    return m ? `a-1-${m[1]}` : null;
  },
};

let REGISTER_SLUGS = new Set();
const slugify = (s) =>
  s.toLowerCase().replace(/[‐-―]/g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'section';
const registerCfg = {
  headingId(text) {
    let base = slugify(text.replace(/\*\*/g, ''));
    let id = base;
    for (let n = 2; REGISTER_SLUGS.has(id); n++) id = `${base}-${n}`;
    REGISTER_SLUGS.add(id);
    return id;
  },
  paraAnchor(text) {
    const m = text.match(/^\*\*RR-(\d+)\b/);
    return m ? `rr-${m[1]}` : null;
  },
};

/* ------------------------------------------------------------------ *
 * Page chrome                                                          *
 * ------------------------------------------------------------------ */
const STYLE = `
  <style>
  .p2-shell { --p2-accent: var(--accent); }
  .p2-banner {
    border: 1px solid var(--border-strong);
    border-left: 4px solid var(--p2-accent);
    background: var(--bg-secondary);
    border-radius: 14px;
    padding: 1.1rem 1.35rem;
    display: flex; gap: .85rem; align-items: flex-start;
    box-shadow: 0 10px 30px var(--shadow);
  }
  .p2-banner i { color: var(--p2-accent); font-size: 1.15rem; margin-top: .15rem; }
  .p2-banner .pb-label {
    font-size: .7rem; letter-spacing: .28em; text-transform: uppercase;
    color: var(--p2-accent); font-weight: 700; display: block; margin-bottom: .3rem;
  }
  .p2-banner p { color: var(--text-secondary); line-height: 1.6; font-size: .95rem; }
  .p2-banner strong { color: var(--text-primary); }
  .p2-crosslinks { display: flex; flex-wrap: wrap; gap: .75rem; }
  .p2-crosslink {
    display: inline-flex; align-items: center; gap: .5rem;
    border: 1px solid var(--border); border-radius: 999px;
    padding: .5rem .95rem; font-size: .9rem; color: var(--text-secondary);
    transition: border-color .2s, color .2s, background .2s;
  }
  .p2-crosslink:hover { border-color: var(--accent); color: var(--accent); }
  .p2-crosslink.is-primary {
    border-color: var(--p2-accent); color: var(--text-primary);
    background: color-mix(in srgb, var(--p2-accent) 12%, transparent);
  }
  .p2-crosslink.is-primary i { color: var(--p2-accent); }
  /* Statute typography, carried over from the law register unchanged (R16):
     the ls-* scale as on pending-ratify-tax-50-ii-statute.html. */
  .law-statute { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.62; margin-bottom: 1rem; }
  .law-statute .ls-h { color: var(--text-primary); font-weight: 700; line-height: 1.3; scroll-margin-top: 6rem; }
  .law-statute .ls-h1 { font-size: 1.28rem; margin: 0 0 0.9rem; letter-spacing: 0.02em; }
  .law-statute .ls-doc-sub { color: var(--text-muted); font-size: 0.86rem; margin: 0 0 1.2rem; }
  .law-statute .ls-h2 { font-size: 1.06rem; margin: 1.9rem 0 0.7rem; padding-bottom: 0.35rem; border-bottom: 1px solid var(--border); }
  .law-statute .ls-h2.ls-part { font-size: 0.82rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted); border-bottom: 0; margin: 2.4rem 0 0.4rem; padding-bottom: 0; }
  .law-statute .ls-h3 { font-size: 0.96rem; margin: 1.2rem 0 0.45rem; color: var(--text-secondary); }
  .law-statute .ls-p { margin: 0 0 0.8rem; }
  .law-statute strong { color: var(--text-primary); font-weight: 700; }
  .law-statute em { font-style: italic; color: var(--text-primary); }
  .law-statute .ls-list { margin: 0 0 0.9rem 1.25rem; padding: 0; }
  .law-statute .ls-list li { margin: 0 0 0.45rem; }
  .law-statute ol.ls-list { list-style: decimal; }
  .law-statute ul.ls-list { list-style: disc; }
  .law-statute .ls-hr { border: 0; border-top: 1px solid var(--border); margin: 1.8rem 0; }
  .law-statute .ls-quote {
    margin: 0 0 0.9rem; padding: 0.25rem 0 0.25rem 1rem;
    border-left: 3px solid rgba(34, 211, 238, 0.4); color: var(--text-secondary);
  }
  .law-statute .ls-quote .ls-p:last-child { margin-bottom: 0; }
  .law-statute .ls-cite { color: var(--accent); text-decoration: none; border-bottom: 1px dotted rgba(34, 211, 238, 0.45); }
  .law-statute .ls-cite:hover { border-bottom-style: solid; }
  .law-statute a { color: var(--accent); text-decoration: none; border-bottom: 1px dotted rgba(34, 211, 238, 0.45); }
  .law-statute a:hover { border-bottom-style: solid; }
  .law-statute .ls-ruling { margin-bottom: 2.4rem; }
  .law-statute .ls-table-wrap { overflow-x: auto; margin: 0 0 1rem; border: 1px solid var(--border); border-radius: 0.6rem; }
  .law-statute .ls-table { width: 100%; border-collapse: collapse; font-size: 0.84rem; min-width: 520px; }
  .law-statute .ls-table th, .law-statute .ls-table td { text-align: left; vertical-align: top; padding: 0.5rem 0.7rem; border-bottom: 1px solid var(--border); }
  .law-statute .ls-table thead th { background: var(--bg-tertiary); color: var(--text-primary); font-weight: 600; }
  .law-statute .ls-table tbody tr:last-child td { border-bottom: 0; }
  .law-statute .ls-table td:first-child { white-space: nowrap; color: var(--text-primary); font-weight: 600; }
  </style>`;

const cx = (href, cls, icon, label) =>
  `          <a href="${href}" class="p2-crosslink${cls ? ' ' + cls : ''}"><i class="fas ${icon}" aria-hidden="true"></i> ${label}</a>`;

function page({ file, title, description, heroKicker, heroTitle, heroSub, banner, crosslinks, body }) {
  return `<!DOCTYPE html>
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
${STYLE}
</head>

<body class="bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col min-h-screen"><a href="#main-content" class="sr-only-focusable">Skip to content</a>
  <div id="navbar-placeholder"></div>

  <main id="main-content" class="flex-1 p2-shell">
    <section class="pt-32 pb-32">
      <div class="lg:max-w-[70%] mx-auto px-6 max-w-4xl">

        <div class="mb-8">
          <p class="text-sm uppercase tracking-[0.3em] text-[var(--text-muted)] mb-3">${heroKicker}</p>
          <h1 class="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">${heroTitle}</h1>
          <p class="text-lg text-[var(--text-muted)] max-w-3xl leading-relaxed">${heroSub}</p>
        </div>

${banner}
${crosslinks ? `        <div class="p2-crosslinks mb-12">\n${crosslinks}\n        </div>` : ''}

        <div class="law-statute">
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
}

/* ------------------------------------------------------------------ *
 * Build                                                               *
 * ------------------------------------------------------------------ */
const CHARTER = 'path-2-charter.html';
const SCHEDULE = 'path-2-schedule.html';
const REGISTER = 'path-2-risk-register.html';
const RULINGS = 'pending-ratify-tax-50-rulings.html';
const CERTIFICATION = 'path-2-certification-2294.html';
const COMMENCEMENT_ACT = 'path-2-commencement-duty-act.html';

const mdCharter = read('documents/path-2-charter-source.md');
const mdSchedule = read('documents/path-2-schedule-source.md');
const mdRegister = read('documents/path-2-risk-register-source.md');
const mdRuling1 = read('documents/path-2-presidential-ruling-source.md');
const mdRuling2 = read('documents/path-2-adoption-ruling-source.md');

const report = [];
const built = [];

/* ---- Charter (World tier) ---- */
{
  let body = renderDoc(mdCharter, charterCfg);
  // §10.4 → Schedule (charter side of the two-way cross-link). Wraps an
  // existing word only; the verbatim check below runs on the injected body and
  // still holds, since htmlText strips the <a> without altering text.
  body = linkFirst(body, 'a schedule adopted by the chambers', SCHEDULE + '#part-a');
  const chars = assertVerbatim(mdCharter, body, CHARTER);
  report.push(`  ${CHARTER}: verbatim ${chars} chars`);
  built.push([CHARTER, page({
    file: CHARTER,
    title: 'The Path 2 Charter — LP-074 Certification Methodology • The Five Rings',
    description: 'The Path 2 Charter, adopted in 2279 and amended in 2291 and 2293. Its fixed methodology governed the complete 2294 LP-074 certification effective in 2295.',
    heroKicker: 'The Five Rings · Path 2 · Certification Methodology',
    heroTitle: 'The Path 2 Charter',
    heroSub: 'The methodology LP-074 requires before a rate can move: where a choice can be fixed, this Charter fixes it; where judgment is irreducible, it converts judgment into adversarial mechanism and prices ambiguity against activation. Adopted 2279 and amended in 2291.',
    banner: `        <div class="p2-banner mb-10" role="note" aria-label="Charter status">
          <i class="fas fa-scale-balanced" aria-hidden="true"></i>
          <div>
            <span class="pb-label">Adopted 2279 · Amended 2291 and 2293 · Applied by the 2294 certification</span>
            <p><strong>HISTORICAL ADOPTION, CURRENT CONTROL.</strong> Adoption changed no rate, and original §12.3 made the 2279&ndash;2288 no-run window lawful. <a href="law-polling.html#lp-075">LP-075</a> later compelled a remedial process without changing a condition. That process locked in 2292 and produced the complete <a href="${CERTIFICATION}">2294 certificate</a>. Schedule A certified first; the separate Lower Incidence Certificate then issued, was adopted, and supported Schedule B. Both schedules took effect in 2295 at <strong>50 / 25 / 12.5 / 6.25</strong>.</p>
          </div>
        </div>`,
    crosslinks: [
      cx(SCHEDULE + '#part-a', 'is-primary', 'fa-list-ol', '§10.4 Schedule — enumerated measures'),
      cx(REGISTER, 'is-primary', 'fa-clipboard-check', 'Residual-Risk Register — the adoption record'),
      cx('law-polling.html#lp-074', '', 'fa-scale-balanced', 'LP-074 — the register entry'),
      cx('law-polling.html#lp-075', '', 'fa-hourglass-start', 'LP-075 — the commencement duty'),
      cx(CERTIFICATION, '', 'fa-clipboard-check', '2294 certification — activation record'),
      cx('law-polling.html#lp-073', '', 'fa-layer-group', 'LP-073 — historical rate law'),
      cx('pending-ratify-tax-50-rulings.html', '', 'fa-gavel', 'Presidential rulings — the adoption record'),
      cx('pending-ratify-tax-50-ii-statute.html', '', 'fa-file-contract', 'RATIFY-TAX-50-II — the conditional statute'),
    ].join('\n'),
    body,
  })]);
}

/* ---- Schedule (World tier) ---- */
{
  let body = renderDoc(mdSchedule, scheduleCfg);
  // Schedule side of the two-way cross-link: Part D's "part of the Charter" →
  // the Charter's §10.4, the section that adopts this Schedule.
  body = linkFirst(body, 'This Schedule is part of the Charter', CHARTER + '#s-10-4');
  const chars = assertVerbatim(mdSchedule, body, SCHEDULE);
  report.push(`  ${SCHEDULE}: verbatim ${chars} chars`);
  built.push([SCHEDULE, page({
    file: SCHEDULE,
    title: 'The §10.4 Schedule to the Path 2 Charter • The Five Rings',
    description: 'The enumerated Schedule to the Path 2 Charter (§10.4), second draft, terminal: the Operative Measure, welfare measurement conventions, interval families, and preprocessing methods that the certification audit computes against. Adopted with the Charter in 2279 (Y178); amendable only per §13.1.',
    heroKicker: 'The Five Rings · Path 2 · Enumerated Schedule',
    heroTitle: 'The §10.4 Schedule',
    heroSub: 'The Charter’s enumerated schedule of welfare measures, interval families, and preprocessing methods — one Operative Measure fixed in text, rival conceptions of value published as diagnostics, and the union confined to estimators of that measure. Adopted with the Charter; amendable only per §13.1.',
    banner: `        <div class="p2-banner mb-10" role="note" aria-label="Schedule status">
          <i class="fas fa-list-ol" aria-hidden="true"></i>
          <div>
            <span class="pb-label">Adopted with the Charter · No valid 2294 application</span>
            <p><strong>PART OF THE CHARTER (§10.4).</strong> This Schedule enumerates the welfare measures, interval families, and preprocessing methods the audit may select from, and is part of the <a href="${CHARTER}#s-10-4">Path 2 Charter</a> for every purpose of §13.1. Its residues are engraved at the <a href="${REGISTER}#rr-9">Register</a> (RR-9 through RR-12). The complete <a href="${CERTIFICATION}">2294 record</a> applied this Schedule to Findings I&ndash;IV and Schedule A; the distinct Lower Incidence Certificate separately supplied B1&ndash;B6 before Schedule B certification.</p>
          </div>
        </div>`,
    crosslinks: [
      cx(CHARTER + '#s-10-4', 'is-primary', 'fa-scale-balanced', 'Path 2 Charter — §10.4'),
      cx(REGISTER, 'is-primary', 'fa-clipboard-check', 'Residual-Risk Register — RR-9 … RR-12'),
      cx('law-polling.html#lp-074', '', 'fa-scale-balanced', 'LP-074 — the register entry'),
      cx(CERTIFICATION, '', 'fa-clipboard-check', '2294 certification — audit output'),
      cx('law-polling.html#lp-073', '', 'fa-layer-group', 'LP-073 — historical rate law'),
    ].join('\n'),
    body,
  })]);
}

/* ---- Residual-Risk Register (World tier) ---- */
{
  REGISTER_SLUGS = new Set();
  const body = renderDoc(mdRegister, registerCfg);
  const chars = assertVerbatim(mdRegister, body, REGISTER);
  report.push(`  ${REGISTER}: verbatim ${chars} chars`);
  built.push([REGISTER, page({
    file: REGISTER,
    title: 'Path 2 Charter — Residual-Risk Register • The Five Rings',
    description: 'The Residual-Risk Register adopted with the Path 2 Charter as part of the adoption record: the disposition of every standing adversarial finding across two independent reviews and the Schedule cold pass, and the twelve engraved residues RR-1 through RR-12 the methodology cannot close, each priced against activation.',
    heroKicker: 'The Five Rings · Path 2 · Adoption Record',
    heroTitle: 'Residual-Risk Register',
    heroSub: 'The Charter’s honesty about itself: the disposition of every standing finding — cured, mitigated, or accepted — across two independent hostile reviews and the Schedule’s cold methodological pass, and the twelve residues it engraves rather than paints over. Adopted with the Charter, part of the adoption record.',
    banner: `        <div class="p2-banner mb-10" role="note" aria-label="Register status">
          <i class="fas fa-clipboard-check" aria-hidden="true"></i>
          <div>
            <span class="pb-label">Adoption record · 2291 cadence amendment noted</span>
            <p><strong>THE ADOPTION RECORD.</strong> This Register ships with the <a href="${CHARTER}">Path 2 Charter</a> and its <a href="${SCHEDULE}">§10.4 Schedule</a>, binding as the Charter’s own account of its limits. It disposes of the standing adversarial findings against the instrument and engraves the twelve residues <strong>RR-1 through RR-12</strong> that no text can close. Its 2291 annotation records LP-075&rsquo;s procedural amendment and its 2293 annotation records coupled reversion. No finding here activated a rate by itself; the complete 2294 certificates did.</p>
          </div>
        </div>`,
    crosslinks: [
      cx(CHARTER, 'is-primary', 'fa-scale-balanced', 'Path 2 Charter — the instrument'),
      cx(SCHEDULE, 'is-primary', 'fa-list-ol', '§10.4 Schedule — enumerated measures'),
      cx('law-polling.html#lp-074', '', 'fa-scale-balanced', 'LP-074 — the register entry'),
      cx(CERTIFICATION, '', 'fa-clipboard-check', '2294 certification — final record'),
      cx('pending-ratify-tax-50-rulings.html', '', 'fa-gavel', 'Presidential rulings — the adoption record'),
    ].join('\n'),
    body,
  })]);
}

/* ---- Presidential rulings (Process tier — Ratification Record page set) ---- */
{
  const b1 = renderDoc(mdRuling1);
  const c1 = assertVerbatim(mdRuling1, b1, 'ruling 1');
  const b2 = renderDoc(mdRuling2);
  const c2 = assertVerbatim(mdRuling2, b2, 'ruling 2');
  const body =
    `<div class="ls-ruling" id="ruling-adoption-posture">\n${b1}\n</div>\n` +
    `<hr class="ls-hr">\n` +
    `<div class="ls-ruling" id="ruling-adoption">\n${b2}\n</div>`;
  report.push(`  ${RULINGS}: verbatim ${c1} + ${c2} chars (two rulings)`);
  built.push([RULINGS, page({
    file: RULINGS,
    title: 'Presidential Rulings — Path 2 Charter • The Five Rings',
    description: 'The two Rulings of the Presidency on the Path 2 Charter (LP-074 Schedule A methodology), 2279 (Y178): the adoption-posture review directing the chambers to take the Charter up only in amended form, and the final adoption ruling that lifts the noticed veto and adopts the Charter with its Residual-Risk Register. Part of the TAX-50 Ratification Record.',
    heroKicker: 'Ratification Record · Presidential Rulings',
    heroTitle: 'Presidential Rulings — Path 2 Charter',
    heroSub: 'The two Rulings of the Presidency on the Path 2 Charter, 2279 (Y178): the adoption-posture review that directed the chambers to take the Charter up only in amended form, and the final ruling that lifted the noticed veto and adopted the Charter with its Register. Read alongside the instruments they adjudicate.',
    banner: `        <div class="p2-banner mb-10" role="note" aria-label="Rulings status">
          <i class="fas fa-gavel" aria-hidden="true"></i>
          <div>
            <span class="pb-label">Historical adoption record — 2279 (Y178)</span>
            <p><strong>THE ADJUDICATION OF RECORD.</strong> These 2279 rulings adopted the <a href="path-2-charter.html">Path 2 Charter</a> and its <a href="path-2-risk-register.html">Residual-Risk Register</a>; they changed no rate. LP-075 later compelled a process the original Charter did not require. The complete <a href="${CERTIFICATION}">2294 certificate</a> subsequently applied the unchanged methodology and activated LP-074 in 2295. The historical rulings remain unchanged.</p>
          </div>
        </div>`,
    crosslinks: [
      cx('path-2-charter.html', 'is-primary', 'fa-scale-balanced', 'Path 2 Charter — the instrument'),
      cx('path-2-schedule.html', 'is-primary', 'fa-list-ol', '§10.4 Schedule'),
      cx('path-2-risk-register.html', 'is-primary', 'fa-clipboard-check', 'Residual-Risk Register'),
      cx('pending-ratify-tax-50-ii-statute.html', '', 'fa-file-contract', 'RATIFY-TAX-50-II — the conditional statute'),
      cx('law-polling.html#lp-074', '', 'fa-scale-balanced', 'LP-074 — the register entry'),
      cx(CERTIFICATION, '', 'fa-clipboard-check', '2294 certification — final record'),
      cx('pending-ratification.html', '', 'fa-arrow-left', 'Ratification Record'),
    ].join('\n'),
    body,
  })]);
}

for (const [f, html] of built) write(f, html);

console.log(`path2-pages: built + verified ${built.length} pages`);
for (const line of report) console.log(line);
