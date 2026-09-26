/* Simulation rail: a sticky index of every story beside the archive.
 * Built from the cards themselves, so titles never need duplicating in markup.
 * Links are the cards' deep-link hashes; the page's expandFromHash handler
 * opens and scrolls. Rail entries follow card-filter.js visibility. */
document.addEventListener('DOMContentLoaded', function () {
  var archive = document.getElementById('sim-archive');
  var layout = document.createElement('div');
  layout.className = 'sim-layout';
  var rail = document.createElement('nav');
  rail.className = 'sim-rail';
  rail.setAttribute('aria-label', 'Simulation index');
  archive.parentNode.insertBefore(layout, archive);
  layout.appendChild(rail);
  layout.appendChild(archive);

  var entries = [];   // { card, link }
  var groups = [];    // { el, links: [] }
  var group = null;

  Array.prototype.forEach.call(archive.children, function (el) {
    if (el.hasAttribute('data-collection-header')) {
      var h = document.createElement('p');
      h.className = 'sim-rail-collection';
      h.textContent = el.querySelector('h2').textContent;
      rail.appendChild(h);
      groups.push({ el: h, links: [], collection: el.getAttribute('data-collection-header') });
    } else if (el.hasAttribute('data-section-header')) {
      var s = document.createElement('p');
      s.className = 'sim-rail-section';
      s.textContent = el.querySelector('h2').textContent;
      rail.appendChild(s);
      group = { el: s, links: [] };
      groups.push(group);
    } else if (el.classList.contains('simulation-card')) {
      var content = el.querySelector('.simulation-content');
      var a = document.createElement('a');
      a.href = '#' + content.id;
      a.textContent = el.querySelector('button h2').textContent;
      rail.appendChild(a);
      entries.push({ card: el, link: a });
      group.links.push(a);
    }
  });

  function syncFilter() {
    entries.forEach(function (e) { e.link.hidden = e.card.style.display === 'none'; });
    groups.forEach(function (g) {
      if (g.collection) {
        g.el.hidden = !entries.some(function (e) {
          return !e.link.hidden && e.card.getAttribute('data-collection') === g.collection;
        });
      } else {
        g.el.hidden = g.links.every(function (l) { return l.hidden; });
      }
    });
  }
  var mo = new MutationObserver(syncFilter);
  entries.forEach(function (e) { mo.observe(e.card, { attributes: true, attributeFilter: ['style'] }); });
  syncFilter();

  // Highlight the card currently at the top of the reading area.
  var active = null;
  function setActive() {
    var line = 140, best = null;
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.link.hidden) continue;
      if (e.card.getBoundingClientRect().top <= line) best = e; else break;
    }
    if (best === active) return;
    if (active) active.link.removeAttribute('aria-current');
    active = best;
    if (!active) return;
    active.link.setAttribute('aria-current', 'true');
    var r = rail.getBoundingClientRect(), l = active.link.getBoundingClientRect();
    if (l.top < r.top + 40 || l.bottom > r.bottom - 40) {
      rail.scrollTop += l.top - r.top - r.height / 3;
    }
  }
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
});
