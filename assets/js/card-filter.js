/* card-filter.js — one shared client-side card filter/search for the site.
 *
 * Exposes a single global: window.initCardFilter(cfg). Plain script, no
 * modules, no dependencies. Consumers: simulations.html, faq.html, why-vmss.html.
 *
 * A card is visible iff it passes search AND toggles AND radios AND every
 * select. Matching cards get style.display = '' and non-matching '' -> 'none'.
 * An initial render runs at call time. No URL/hash persistence.
 *
 * cfg keys (all optional except cards):
 *   cards   : CSS selector for the filterable cards.
 *   search  : { el, within } — el is the <input>; haystack is the textContent
 *             of (within ? card.querySelector(within) : card), lowercased with
 *             whitespace collapsed, cached once at init; substring match on
 *             'input'.
 *   toggles : [{ el, attr, value }] — multi-on aria-pressed chips. Grouped by
 *             attr: a card passes a group iff its [attr] equals the value of at
 *             least one pressed chip in that group. All chips off => group set
 *             is empty => 0 cards shown (kept intentionally).
 *   radios  : { container, attr } — single-select law-chip group. Chips carry
 *             data-filter="all|<value>"; the active chip has .is-active +
 *             aria-pressed="true". 'all' passes everything, else card[attr]
 *             must equal the active data-filter value.
 *   selects : [{ el, attr }] — el.value '' passes all, else exact match on
 *             card[attr]; 'change' event.
 *   count   : { el, all, some } — templates with {shown}/{total}; `all` used
 *             when shown === total, else `some`.
 *   headers : [{ selector, headerAttr, cardAttr }] — section/collection header
 *             elements. headerAttr holds space-separated group values; a header
 *             is visible iff at least one currently-visible card has its
 *             [cardAttr] value among those group values.
 */
(function () {
  'use strict';

  function norm(s) {
    return (s || '').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function fill(tpl, shown, total) {
    return tpl.split('{shown}').join(shown).split('{total}').join(total);
  }

  /* el/container accept either a live element or a CSS selector string, so the
   * same key style (selectors) as cards/within/headers.selector works too. */
  function resolveEl(x) {
    return typeof x === 'string' ? document.querySelector(x) : x;
  }

  function initCardFilter(cfg) {
    var cards = Array.prototype.slice.call(document.querySelectorAll(cfg.cards));
    var searchEl = cfg.search ? resolveEl(cfg.search.el) : null;
    var toggles = (cfg.toggles || []).map(function (t) {
      return { el: resolveEl(t.el), attr: t.attr, value: t.value };
    });
    var radios = cfg.radios
      ? { container: resolveEl(cfg.radios.container), attr: cfg.radios.attr }
      : null;
    var selects = (cfg.selects || []).map(function (s) {
      return { el: resolveEl(s.el), attr: s.attr };
    });
    var headers = cfg.headers || [];
    var countEl = cfg.count ? resolveEl(cfg.count.el) : null;

    /* Cache one lowercased/collapsed haystack per card. */
    var haystacks = cards.map(function (card) {
      var src = cfg.search && cfg.search.within
        ? card.querySelector(cfg.search.within)
        : card;
      return norm(src ? src.textContent : '');
    });

    function render() {
      var q = searchEl ? norm(searchEl.value) : '';

      /* Group pressed toggles by attr. */
      var groups = {};
      toggles.forEach(function (t) {
        if (!groups[t.attr]) groups[t.attr] = {};
        if (t.el.getAttribute('aria-pressed') === 'true') groups[t.attr][t.value] = true;
      });

      /* Active radio filter (default 'all'). */
      var radioActive = 'all';
      if (radios) {
        var active = radios.container.querySelector('.is-active');
        radioActive = active ? active.getAttribute('data-filter') : 'all';
      }

      var shown = 0;
      cards.forEach(function (card, i) {
        var ok = true;
        if (q && haystacks[i].indexOf(q) === -1) ok = false;
        if (ok) {
          for (var attr in groups) {
            if (!groups[attr][card.getAttribute(attr)]) { ok = false; break; }
          }
        }
        if (ok && radios && radioActive !== 'all') {
          if (card.getAttribute(radios.attr) !== radioActive) ok = false;
        }
        if (ok) {
          for (var s = 0; s < selects.length; s++) {
            var v = selects[s].el.value;
            if (v !== '' && card.getAttribute(selects[s].attr) !== v) { ok = false; break; }
          }
        }
        card.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });

      /* Headers: visible iff a visible card falls in their group. */
      headers.forEach(function (h) {
        Array.prototype.forEach.call(document.querySelectorAll(h.selector), function (headerEl) {
          var vals = (headerEl.getAttribute(h.headerAttr) || '').split(/\s+/);
          var visible = cards.some(function (card) {
            return card.style.display !== 'none' &&
              vals.indexOf(card.getAttribute(h.cardAttr)) !== -1;
          });
          headerEl.style.display = visible ? '' : 'none';
        });
      });

      if (countEl && cfg.count) {
        var total = cards.length;
        countEl.textContent = fill(shown === total ? cfg.count.all : cfg.count.some, shown, total);
      }
    }

    if (searchEl) searchEl.addEventListener('input', render);

    toggles.forEach(function (t) {
      t.el.addEventListener('click', function () {
        var pressed = t.el.getAttribute('aria-pressed') === 'true';
        t.el.setAttribute('aria-pressed', pressed ? 'false' : 'true');
        render();
      });
    });

    if (radios) {
      var chips = radios.container.querySelectorAll('[data-filter]');
      Array.prototype.forEach.call(chips, function (chip) {
        chip.addEventListener('click', function () {
          Array.prototype.forEach.call(chips, function (c) {
            c.classList.remove('is-active');
            c.setAttribute('aria-pressed', 'false');
          });
          chip.classList.add('is-active');
          chip.setAttribute('aria-pressed', 'true');
          render();
        });
      });
    }

    selects.forEach(function (sel) {
      sel.el.addEventListener('change', render);
    });

    render();
  }

  window.initCardFilter = initCardFilter;
})();
