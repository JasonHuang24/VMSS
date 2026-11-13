/* law-finder.js: the slim find bar on the two long reference pages
   (laws.html, law-polling.html). It holds a search box that narrows the
   entries as you type, the entry count, and a Contents button that opens the
   page's own generated table of contents as a panel. The bar is built here,
   so a reader without scripts keeps the in-page table and every entry.

   Search and the page's status chips combine: an entry shows only when the
   active chip keeps it (the page script sets its inline display) and every
   search term appears in its number, title or summary. Section headings,
   their notes and table-of-contents groups with nothing left in them fold
   away. Deep links to an entry either filter has hidden go through
   window.vmssResetLawView, called by script.js vmssRevealHashTarget. */
(function () {
  const entries = Array.from(document.querySelectorAll('article.law-entry, article.code-entry'));
  const toc = document.querySelector('.law-toc');
  const host = entries.length ? entries[0].closest('section > div') : null;
  if (!toc || !host) return;

  const chipBar = document.querySelector('.law-filter-bar');
  const countEl = document.querySelector('.law-filter-count');
  const noun = entries[0].matches('.code-entry') ? 'provisions' : 'entries';
  const norm = (s) => s.toLowerCase().replace(/[‐-―−]/g, '-').replace(/\s+/g, ' ');
  const haystack = new Map(entries.map((el) => [el, norm([
    el.id,
    ...Array.from(el.querySelectorAll('.law-number, .law-title, .law-summary, .code-index-title'), (n) => n.textContent)
  ].join(' '))]));

  const bar = document.createElement('div');
  bar.className = 'lf-bar';
  bar.innerHTML = `
    <div class="lf-row" role="search" aria-label="Find on this page">
      <button type="button" class="lf-toc-btn" aria-expanded="false" aria-controls="lf-panel"><i class="fas fa-list-ul" aria-hidden="true"></i><span>Contents</span></button>
      <div class="lf-search">
        <i class="fas fa-magnifying-glass" aria-hidden="true"></i>
        <label class="sr-only" for="lf-input">Search ${noun} by LP number, title or summary</label>
        <input id="lf-input" class="lf-input" type="search" placeholder="Search LP number, title or summary" autocomplete="off" spellcheck="false" enterkeyhint="search">
        <button type="button" class="lf-clear" aria-label="Clear search" hidden><i class="fas fa-xmark" aria-hidden="true"></i></button>
      </div>
    </div>
    <div class="lf-panel" id="lf-panel" hidden></div>`;
  const sentinel = document.createElement('div');
  host.prepend(sentinel, bar);
  document.documentElement.classList.add('has-law-finder');

  const row = bar.querySelector('.lf-row');
  const input = bar.querySelector('.lf-input');
  const clearBtn = bar.querySelector('.lf-clear');
  const tocBtn = bar.querySelector('.lf-toc-btn');
  const panel = bar.querySelector('.lf-panel');
  /* Phones get the short prompt; the label still names the scope. */
  if (window.matchMedia('(max-width: 640px)').matches) input.placeholder = `Search ${noun}`;
  if (countEl) {
    countEl.classList.add('lf-count');
    row.appendChild(countEl);
  }
  toc.classList.add('open');
  panel.appendChild(toc);

  const shown = (el) => el.style.display !== 'none' && !el.classList.contains('lf-miss');
  const fold = (el, empty) => el.classList.toggle('lf-empty', empty);

  function refresh() {
    const terms = norm(input.value).trim().split(' ').filter(Boolean);
    clearBtn.hidden = !input.value;
    let visible = 0;
    entries.forEach((el) => {
      const hay = haystack.get(el);
      el.classList.toggle('lf-miss', !terms.every((t) => hay.includes(t)));
      if (shown(el)) visible++;
    });
    if (countEl) {
      countEl.textContent = visible === entries.length
        ? `Showing all ${entries.length} ${noun}`
        : `Showing ${visible} of ${entries.length} ${noun}`;
    }
    /* A heading folds when nothing between it and the next heading of the
       same or higher rank still shows; so do the notes and preambles in
       that span. */
    host.querySelectorAll('h2.law-section-header, h3.code-subject').forEach((h) => {
      const stop = h.matches('h2') ? 'h2.law-section-header' : 'h2.law-section-header, h3.code-subject';
      const span = [];
      let any = false;
      for (let el = h.nextElementSibling; el && !el.matches(stop); el = el.nextElementSibling) {
        const inner = el.matches('article') ? [el] : Array.from(el.querySelectorAll('article.law-entry, article.code-entry'));
        if (inner.some(shown)) any = true;
        if (!inner.length && !el.matches('h3')) span.push(el);
      }
      fold(h, !any);
      span.forEach((el) => fold(el, !any));
    });
    /* Table of contents: links follow their targets, group pills recount. */
    toc.querySelectorAll('.toc-link').forEach((a) => {
      const target = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
      a.classList.toggle('lf-miss', Boolean(target && target.classList.contains('lf-miss')));
    });
    toc.querySelectorAll('.toc-subject, .toc-tier').forEach((group) => {
      const scope = group.matches('.toc-subject') ? group.nextElementSibling : group;
      const n = scope ? Array.from(scope.querySelectorAll('.toc-link')).filter(shown).length : 0;
      const pill = group.querySelector('.toc-count');
      if (pill) pill.textContent = n;
      fold(group, !n);
      if (group.matches('.toc-subject') && scope) fold(scope, !n);
    });
  }

  const isStuck = () => sentinel.getBoundingClientRect().top < parseFloat(getComputedStyle(bar).top);
  let raf = null;
  window.addEventListener('scroll', () => {
    if (!raf) raf = requestAnimationFrame(() => { raf = null; bar.classList.toggle('is-stuck', isStuck()); });
  }, { passive: true });
  /* Narrowing the list while the bar is pinned mid-page: bring the first
     result up under the bar instead of leaving the reader in a gap. */
  const update = () => {
    refresh();
    if (isStuck()) {
      window.scrollTo({ top: sentinel.getBoundingClientRect().top + window.scrollY - parseFloat(getComputedStyle(bar).top), behavior: 'instant' });
    }
  };
  input.addEventListener('input', update);
  clearBtn.addEventListener('click', () => { input.value = ''; update(); input.focus(); });
  chipBar?.addEventListener('click', (e) => { if (e.target.closest('.law-chip')) update(); });

  const setPanel = (open) => {
    panel.hidden = !open;
    tocBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    bar.classList.toggle('is-panel-open', open);
  };
  tocBtn.addEventListener('click', () => setPanel(panel.hidden));
  panel.addEventListener('click', (e) => { if (e.target.closest('a[href^="#"]')) setPanel(false); });
  document.addEventListener('click', (e) => { if (!panel.hidden && !bar.contains(e.target)) setPanel(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!panel.hidden) { setPanel(false); tocBtn.focus(); }
    else if (document.activeElement === input && input.value) { e.preventDefault(); input.value = ''; update(); }
  });

  /* The page's anchor offset is the compact header plus this bar. */
  const publishHeight = () => document.documentElement.style.setProperty('--vmss-finder-h', `${row.offsetHeight}px`);
  if ('ResizeObserver' in window) new ResizeObserver(publishHeight).observe(row);
  publishHeight();

  window.vmssResetLawView = () => {
    input.value = '';
    const all = chipBar?.querySelector('[data-filter="all"]');
    if (all && !all.classList.contains('is-active')) all.click();
    refresh();
  };
  refresh();
})();
