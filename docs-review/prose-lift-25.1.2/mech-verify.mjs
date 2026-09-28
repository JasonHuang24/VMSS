import fs from 'node:fs';
const root = 'F:/Programming/VMSS/VMSS Website/';
const dir = root + 'docs-review/prose-lift-25.1.2/';
const ledger = fs.readFileSync(dir + 'mech-ledger.md', 'utf8');
const pages = ['sads.html', 'technologies.html', 'faq.html'];
const tags = h => h.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '<$1/>').match(/<[^>]+>/g);
const blocks = h => h.match(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi) || [];
const heads = h => h.match(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/gi) || [];
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
let ok = true;
for (const p of pages) {
  const o = fs.readFileSync(root + p, 'utf8'), c = fs.readFileSync(dir + p, 'utf8');
  const r = [];
  r.push('tags ' + (eq(tags(o), tags(c)) ? 'OK' : 'DIFF'));
  r.push('headings ' + (eq(heads(o), heads(c)) ? 'OK' : 'DIFF'));
  const bo = blocks(o), bc = blocks(c);
  let bad = bo.length !== bc.length ? ['count'] : [];
  bo.forEach((b, i) => { if (b !== bc[i]) bad.push(i); });
  if (p === 'faq.html') {
    const ld = s => s.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
    const idx = bo.findIndex(b => b.startsWith('<script type="application/ld+json">'));
    bad = bad.filter(i => i !== idx);
    const jo = JSON.parse(ld(o)), jc = JSON.parse(ld(c));
    const skel = j => JSON.stringify(j, (k, v) => k === 'text' ? 'T' : v);
    r.push('json-ld parses, skeleton(names/keys/order) ' + (skel(jo) === skel(jc) ? 'OK' : 'DIFF') + ', em-dashes ' + (ld(o).match(/—/g) || []).length + '->' + (ld(c).match(/—/g) || []).length);
  }
  r.push('script/style blocks ' + (bad.length ? 'DIFF ' + bad : 'OK (' + bo.length + ')'));
  const sec = ledger.split(/^## /m).find(s => s.startsWith(p));
  const qs = [...sec.matchAll(/«([^»]+)»/g)].map(m => m[1]);
  const miss = qs.filter(q => !c.includes(q));
  r.push(`quotes ${qs.length - miss.length}/${qs.length}` + (miss.length ? ' MISSING: ' + miss.join(' | ') : ''));
  const ol = o.split('\n'), cl = c.split('\n');
  r.push('changed lines ' + ol.map((l, i) => l !== cl[i] ? i + 1 : 0).filter(Boolean).join(','));
  if (r.some(x => /DIFF|MISSING/.test(x))) ok = false;
  console.log(p + ': ' + r.join('; '));
}
console.log(ok ? 'ALL PASS' : 'FAIL');
