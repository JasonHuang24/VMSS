/**
 * diagrams.js — the Ring Atlas on layers.html (#ring-atlas).
 *
 * The five rings seen from above the Sanctuary core: nested arcs, +1 at the
 * top and −3 at the outer edge, with the mega-walls between them. Two things
 * can be selected:
 *   - a ring, which fills the side panel with what that ring is as a place;
 *   - a movement, which lights the routes people take across the walls
 *     (ascension, phase-back, reassignment, visitation, elective residency,
 *     voluntary permanent residency, child relocation — Charter V, VII, VIII).
 *
 * The STI console's citizen (window.VMSS placement) is marked on the map.
 * The atlas writes only focusLayer (what the reader is looking at); it never
 * moves the citizen.
 *
 * The SVG is rebuilt from the stage width so text renders at true size on a
 * phone and on a desktop alike. Ring buttons carry keyboard access; the SVG
 * bands are a pointer shortcut to the same selection.
 */

(function () {

  const ORDER = ['+1', '0', '-1', '-2', '-3'];
  const TONE = { '+1': 'p1', '0': 'z', '-1': 'm1', '-2': 'm2', '-3': 'm3' };
  const minus = (s) => String(s).replace(/-/g, '−');

  const cite = (label, href) => ({ label, href });
  const A = (n, id) => cite(`Article ${n}`, `charter.html#article-${id}`);
  const WP = (s) => cite(`Whitepaper ${s}`, 'whitepaper.html');
  const LAW = (lp, id) => cite(lp, `laws.html#code-${id}`);

  // =========================
  // RINGS AS PLACES
  // =========================

  const RINGS = {
    '+1': {
      name: '+1 Sanctuary', short: 'Sanctuary', informal: 'Heaven Layer · pre-intervention', pop: '~300M',
      summary: 'The innermost ring. Everyone here has shown sustained non-harm, so harm cannot complete. Earned continuously, not awarded: the highest-upkeep residency in the civilization.',
      facts: [
        ['Population', 'About 300 million residents; about 1.4 billion eligible across the civilization.'],
        ['Enforcement', 'Pre-intervention. The Threshold Inhibition Protocol halts harmful acts before they complete. Implants are mandatory.'],
        ['Economy', '$10,000/month UBI plus job subsidy, in the currency shared with Main.'],
        ['Continuity', 'Backup vessels, highly reliable.']
      ],
      sti: 'The condition of residence. Below 85, or after a high-impact trust violation, a resident phases back to Main: a condition lapsing, not a punishment. Selective Ascension Domains gate further on single metrics; losing one returns a member to Sanctuary and nothing more.',
      waysIn: ['Ascension from Main on a sustained record', 'Born here: a null score until 18, then the first computed score decides'],
      waysOut: ['Phase-back to Main', 'Reassignment after an attempted harm: halted, but the attempt qualifies', 'Visitation, elective or permanent residency below', 'Exit from the civilization (Article X)'],
      cites: [A('VII', 'vii'), A('IX', 'ix'), A('XII', 'xii'), WP('§4.2, §5.12, §19.1')]
    },
    '0': {
      name: 'Main Layer (0)', short: 'Main', informal: 'The Metropolis · the proving ground', pop: '~3B',
      summary: 'The civilization at full human scale. Harmful acts can complete, which is what makes choices here real; victims are restored and perpetrators reassigned. Every score from 0 to 100 lives on the same streets.',
      facts: [
        ['Population', 'About 3 billion residents; about a third hold Sanctuary standing and choose to stay.'],
        ['Enforcement', 'Post-intervention. The failsafe is optional, and almost everyone leaves it on.'],
        ['Economy', '$10,000/month UBI plus job subsidy, in the currency shared with Sanctuary.'],
        ['Continuity', 'Revival at full fidelity.']
      ],
      sti: 'Opens or narrows trust-dependent access, and counts toward Sanctuary once held above 85. Minor infractions stay clearable: the correction window lives here. The score never moves a resident down.',
      waysIn: ['Born or raised here, or arrived as a new entrant (typically 70 to 84)', 'Phase-back from Sanctuary', 'Children relocating from the lower rings', 'Sanctuary residents living here by election'],
      waysOut: ['Ascension to Sanctuary', 'Reassignment: a qualifying act or an unremediated pattern', 'Visitation, elective or permanent residency below', 'Exit from the civilization (Article X)'],
      cites: [A('I', 'i'), A('VII', 'vii'), A('XV', 'xv'), WP('§4.2')]
    },
    '-1': {
      name: '-1 Noncompliance', short: 'Noncompliance', informal: 'The Balanced Layer', pop: '~600M',
      summary: 'The lower-harm breach tier: fraud, harassment, compulsive deception, impaired driving. A trust deficit, not a physical threat. Life stays materially full; status and access contract, and a commercial culture fills the space.',
      facts: [
        ['Population', 'About 600 million: penalized, elective and voluntary permanent residents together.'],
        ['Enforcement', 'Post-intervention with partial institutional presence: logging-only AI, slower drones.'],
        ['Economy', '$5,000/month UBI in siloed Compliance Tokens; the first ring below Main with legal speculative markets.'],
        ['Continuity', 'Revival at full fidelity through proxy installations.']
      ],
      sti: 'Sets local standing: better districts, contracts, reputation-gated blocks and cooperatives. It is never a route back up.',
      waysIn: ['Reassignment from Main or Sanctuary', 'Visitors, elective and voluntary permanent residents'],
      waysOut: ['Further reassignment: violence toward −2, a killing to −3', 'Visitation below', 'The standing right of children to relocate to Main'],
      cites: [A('I', 'i'), A('XV', 'xv'), WP('§4.2, §6.3')]
    },
    '-2': {
      name: '-2 Violent Offense', short: 'Violent Offense', informal: 'The Lower Restrictions Layer', pop: '~300M',
      summary: 'The severe-harm tier, and a frontier by choice for some. Institutions step back; private security, cooperatives and territorial order run daily life. One law is enforced with certainty: a killing sends the killer to −3.',
      facts: [
        ['Population', 'About 300 million, punitive and voluntary residents together.'],
        ['Enforcement', 'Logging only. Below the killing line, private justice answers.'],
        ['Economy', '$2,500/month UBI in siloed currency; a predominantly private economy.'],
        ['Continuity', 'Revival through proxy installations; about 1 in 1,000 revivals fail.']
      ],
      sti: 'Sets local standing: better-run districts, acceptance by security cooperatives, contracts. Reputation is real currency where no institution backs it.',
      waysIn: ['Reassignment for rape, severe assault, escalating coercive violence, predatory conduct', 'Visitors and voluntary residents'],
      waysOut: ['A killing: immediate reassignment to −3', 'Visitation to −3', 'The standing right of children to relocate to Main'],
      cites: [A('VI', 'vi'), A('VII', 'vii'), WP('§4.2')]
    },
    '-3': {
      name: '-3 Terminal', short: 'Terminal', informal: 'The Freedom Layer', pop: '~100M',
      summary: 'Minimal institutional presence: no daily enforcement, no revival, maximum autonomy. Capital-harm residents and voluntary libertarians share it and stratify; voluntary districts keep their own order.',
      facts: [
        ['Population', 'About 100 million, the smallest ring.'],
        ['Enforcement', 'A federal floor only: absolute federal law and the External Force Doctrine.'],
        ['Economy', '$1,250/month UBI in −3 currency; a largely privatized frontier economy.'],
        ['Continuity', 'None. The vessel link is severed on reassignment; visitors suspend theirs at the boundary.']
      ],
      sti: 'The score and the public ledger travel with every resident and set where they land in −3\'s own hierarchy. Market associations, cooperatives and compounds read them; no institution acts on them.',
      waysIn: ['Reassignment for murder, child rape and the highest harms', 'Visitors (vessel link suspended) and voluntary permanent residents'],
      waysOut: ['None for residents: exit from −3 is impossible (Article X)', 'The standing right of children to relocate to Main, federally facilitated'],
      cites: [A('II', 'ii'), A('VI', 'vi'), A('X', 'x'), A('XXV', 'xxv'), WP('§4.2.1'), LAW('LP-004.2', 'lp-004-2')]
    }
  };

  // =========================
  // MOVEMENTS
  // =========================

  /* from/to: the route's endpoints. stops: rings where an arrowhead lands.
     up: direction of travel. both: temporary (returns) — heads at both ends. */
  const MOVES = {
    ascend: {
      name: 'Ascension', from: '0', to: '+1', stops: ['+1'], up: true, slot: -0.7,
      rule: 'Main to Sanctuary. Earned through sustained compliance and a demonstrated trajectory; an STI of 85 or above is the qualifying condition, typically earned over 8 to 12 years of conduct. Voluntary: many eligible residents stay in Main.',
      cites: [A('VII', 'vii'), WP('§4.2, §5.2')]
    },
    phase: {
      name: 'Phase-back', from: '+1', to: '0', stops: ['0'], slot: -0.56,
      rule: 'Sanctuary to Main, automatic and non-punitive: STI below 85, a high-impact trust violation, or removing the implant. The only placement change the score can make. Ascension can be re-earned.',
      cites: [A('VII', 'vii'), A('XII', 'xii'), A('XIII', 'xiii'), WP('§6.5')]
    },
    relocate: {
      name: 'Child relocation', from: '-3', to: '0', stops: ['0'], up: true, slot: -0.42,
      rule: 'Every child born below Main holds a standing right to relocate to Main at any age, without parental consent. Federally facilitated from −3.',
      cites: [A('V', 'v'), A('VIII', 'viii'), LAW('LP-068', 'lp-068')]
    },
    reassign: {
      name: 'Reassignment', from: '+1', to: '-3', stops: ['-1', '-2', '-3'], slot: 0.42,
      rule: 'Downward and one-way. A qualifying act on the criminal record track, then enforcement and review. The act sets the destination and can skip rings: a killing in Main goes straight to −3. Immediate and permanent; the score cannot trigger it.',
      cites: [A('I', 'i'), A('VII', 'vii'), A('XII', 'xii'), A('XV', 'xv')]
    },
    visit: {
      name: 'Visitation', from: '+1', to: '-3', stops: ['0', '-1', '-2', '-3'], both: true, slot: 0.56,
      rule: 'Downward only, and temporary. Origin status, assets and the origin consequence contract travel with the visitor. Into −3 the backup vessel link is suspended for the visit. No one visits upward.',
      cites: [A('VII', 'vii'), WP('§19.11'), LAW('LP-004.2', 'lp-004-2')]
    },
    elective: {
      name: 'Elective residency', from: '+1', to: '-3', stops: ['0', '-1', '-2', '-3'], both: true, slot: 0.7,
      rule: 'Indefinite residence in a lower ring. Origin status and assets are kept, credentials travel, and the resident can return at any time.',
      cites: [A('VII', 'vii'), cite('+1 dossier', 'layer-+1.html')]
    },
    vpr: {
      name: 'Permanent residency', from: '+1', to: '-3', stops: ['0', '-1', '-2', '-3'], slot: 0.84,
      rule: 'Voluntary and irreversible. Psychological screening, origin assets liquidated under Article III.V, and the upward path closed for good. Status and territory realign.',
      cites: [A('VII', 'vii'), WP('§19.11')]
    }
  };

  // =========================
  // INIT
  // =========================

  function initAtlas() {
    const root = document.getElementById('ring-atlas');
    if (!root) return;

    const q = (s) => root.querySelector(s);
    const stage = q('[data-atlas-stage]');
    const svg = q('[data-atlas-svg]');
    const svgDesc = q('[data-atlas-svg-desc]');
    const ringBtns = Array.from(root.querySelectorAll('[data-atlas-ring]'));
    const moveBtns = Array.from(root.querySelectorAll('[data-atlas-move]'));
    const moveRule = q('[data-atlas-move-rule]');
    const panel = {
      root: q('[data-atlas-panel]'),
      informal: q('[data-atlas-informal]'),
      name: q('[data-atlas-name]'),
      summary: q('[data-atlas-summary]'),
      facts: q('[data-atlas-facts]'),
      sti: q('[data-atlas-sti]'),
      waysIn: q('[data-atlas-in]'),
      waysOut: q('[data-atlas-out]'),
      cites: q('[data-atlas-cites]'),
      dossier: q('[data-atlas-dossier]'),
      sim: q('[data-atlas-sim]'),
      citizen: q('[data-atlas-citizen]')
    };

    const state = () => (window.VMSS ? window.VMSS.getState() : { placement: '0', stiScore: 76 });
    const fromUrl = new URLSearchParams(window.location.search).get('ring');
    let focus = RINGS[fromUrl] ? fromUrl : (RINGS[state().focusLayer] ? state().focusLayer : state().placement || '0');
    let move = null;

    // ---------- panel ----------

    const list = (ul, items) => {
      ul.replaceChildren(...items.map((t) => { const li = document.createElement('li'); li.textContent = t; return li; }));
    };
    const links = (host, cites) => {
      host.replaceChildren();
      cites.forEach((c, i) => {
        if (i) host.append(' · ');
        const a = document.createElement('a');
        a.href = c.href;
        a.textContent = minus(c.label);
        host.appendChild(a);
      });
    };

    function renderPanel() {
      const r = RINGS[focus];
      panel.root.dataset.tone = TONE[focus];
      panel.informal.textContent = r.informal;
      panel.name.textContent = minus(r.name);
      panel.summary.textContent = r.summary;
      panel.facts.replaceChildren(...r.facts.map(([k, v]) => {
        const div = document.createElement('div');
        const dt = document.createElement('dt'); dt.textContent = k;
        const dd = document.createElement('dd'); dd.textContent = v;
        div.append(dt, dd);
        return div;
      }));
      panel.sti.textContent = r.sti;
      list(panel.waysIn, r.waysIn);
      list(panel.waysOut, r.waysOut);
      links(panel.cites, r.cites);
      panel.dossier.href = `layer-${focus}.html`;
      panel.dossier.textContent = `Open the ${r.short} dossier`;
      panel.sim.href = `simulations.html?start=${encodeURIComponent(focus)}#sti-console`;
      const st = state();
      panel.citizen.textContent = st.placement === focus
        ? `Your simulated citizen lives here · STI ${st.stiScore}.`
        : `Your simulated citizen is in ${minus(RINGS[st.placement] ? RINGS[st.placement].name : RINGS['0'].name)}.`;
      ringBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.atlasRing === focus)));
    }

    function renderMove() {
      moveBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.atlasMove === move)));
      root.dataset.move = move || '';
      moveRule.replaceChildren();
      if (!move) {
        moveRule.textContent = 'All routes shown. Select a movement to read its rule.';
        return;
      }
      const m = MOVES[move];
      const b = document.createElement('strong');
      b.textContent = `${m.name}. `;
      const span = document.createElement('span');
      span.textContent = `${m.rule} `;
      const c = document.createElement('span');
      c.className = 'atlas-rule-cites';
      links(c, m.cites);
      moveRule.append(b, span, c);
    }

    // ---------- map ----------

    const SVG = 'http://www.w3.org/2000/svg';
    const make = (name, attrs, parent) => {
      const n = document.createElementNS(SVG, name);
      Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, String(v)));
      if (parent) parent.appendChild(n);
      return n;
    };

    function renderMap() {
      const W = Math.max(300, Math.round(stage.getBoundingClientRect().width) || 720);
      const narrow = W < 560;
      const cap = narrow ? 92 : 112;        // visible depth of the Sanctuary core at the centre line
      const band = narrow ? 70 : 84;        // thickness of each outer ring
      const off = W * 0.9;                  // the core's centre sits this far above the frame
      const cx = W / 2;
      const walls = [off + cap];
      for (let i = 0; i < 4; i++) walls.push(walls[i] + band);
      const H = Math.round(walls[4] - off + (narrow ? 14 : 18));
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svg.setAttribute('height', String(H));
      svg.replaceChildren();

      const at = (r, theta) => [cx + r * Math.sin(theta), -off + r * Math.cos(theta)];
      const mid = (key) => {
        const i = ORDER.indexOf(key);
        return i === 0 ? off + cap * 0.55 : (walls[i - 1] + walls[i]) / 2;
      };
      const circlePath = (r) => `M${cx - r} ${-off}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;

      // Bands, outermost first so inner ones paint over.
      const bands = make('g', { class: 'atlas-bands' }, svg);
      for (let i = ORDER.length - 1; i >= 0; i--) {
        const key = ORDER[i];
        const outer = walls[i];
        const d = i === 0 ? circlePath(outer) : circlePath(outer) + circlePath(walls[i - 1]);
        const p = make('path', { d, 'fill-rule': 'evenodd', class: `atlas-band tone-${TONE[key]}`, 'data-ring': key }, bands);
        if (key === focus) p.classList.add('is-focus');
        p.addEventListener('click', () => select(key, true));
      }
      // Mega-walls
      const wallG = make('g', { class: 'atlas-walls' }, svg);
      walls.forEach((r) => make('path', { d: circlePath(r), class: 'atlas-wall' }, wallG));

      // Ring labels on the centre line
      const labels = make('g', { class: 'atlas-labels' }, svg);
      ORDER.forEach((key) => {
        const y = mid(key) - off;
        const g = make('g', { class: `atlas-label${key === focus ? ' is-focus' : ''}` }, labels);
        const n = make('text', { x: cx, y: y - (narrow ? 2 : 4), 'text-anchor': 'middle', class: 'atlas-label-num' }, g);
        n.textContent = key === '0' ? '0' : minus(key);
        const t = make('text', { x: cx, y: y + (narrow ? 14 : 17), 'text-anchor': 'middle', class: 'atlas-label-name' }, g);
        t.textContent = narrow ? RINGS[key].short.toUpperCase() : `${RINGS[key].short.toUpperCase()} · ${RINGS[key].pop}`;
      });

      // Movement routes along radials, spread either side of the labels.
      const refR = walls[1];
      const moves = make('g', { class: 'atlas-moves-g' }, svg);
      Object.entries(MOVES).forEach(([key, m]) => {
        const theta = Math.asin(Math.min(0.95, (m.slot * (narrow ? 0.8 : 1) * W * 0.5) / refR));
        const g = make('g', { class: `atlas-mv mv-${key}${move === key ? ' is-on' : ''}`, 'data-mv': key }, moves);
        const [x1, y1] = at(mid(m.from), theta);
        const [x2, y2] = at(mid(m.to), theta);
        make('line', { x1, y1, x2, y2, class: 'atlas-mv-line' }, g);
        const dir = m.up ? -1 : 1;
        const head = (key2, sign) => {
          const [hx, hy] = at(mid(key2), theta);
          const ux = Math.sin(theta) * sign, uy = Math.cos(theta) * sign;
          const px = -uy, py = ux;
          const s = narrow ? 5 : 6;
          make('path', { d: `M${hx + ux * s} ${hy + uy * s}L${hx - ux * s + px * s} ${hy - uy * s + py * s}L${hx - ux * s - px * s} ${hy - uy * s - py * s}Z`, class: 'atlas-mv-head' }, g);
        };
        m.stops.forEach((k) => head(k, dir));
        if (m.both) head(m.from, -dir);
        if (key === 'vpr') {
          const [sx, sy] = at(mid(m.from) + band * 0.32, theta);
          const px = -Math.cos(theta), py = Math.sin(theta);
          make('line', { x1: sx - px * 7, y1: sy - py * 7, x2: sx + px * 7, y2: sy + py * 7, class: 'atlas-mv-seal' }, g);
        }
        const [tx, ty] = at((mid(m.from) + mid(m.to)) / 2, theta);
        const label = make('text', { x: tx + (m.slot < 0 ? -8 : 8), y: ty, 'text-anchor': m.slot < 0 ? 'end' : 'start', class: 'atlas-mv-label' }, g);
        label.textContent = m.name;
      });

      // The console's citizen, beside the ring number.
      const st = state();
      const home = RINGS[st.placement] ? st.placement : '0';
      const mx = cx + (narrow ? 30 : 38);
      const my = mid(home) - off - (narrow ? 11 : 14);
      const g = make('g', { class: `atlas-citizen tone-${TONE[home]}` }, svg);
      make('circle', { cx: mx, cy: my, r: 11, class: 'atlas-citizen-halo' }, g);
      make('circle', { cx: mx, cy: my, r: 4.5, class: 'atlas-citizen-dot' }, g);

      svgDesc.textContent = `Map of the five rings seen from above the Sanctuary core. Selected ring: ${minus(RINGS[focus].name)}. ${move ? `Showing the ${MOVES[move].name.toLowerCase()} route.` : 'All movement routes shown.'} Your simulated citizen is in ${minus(RINGS[home].name)}.`;
    }

    // ---------- selection ----------

    function select(key, announce) {
      if (!RINGS[key]) return;
      focus = key;
      renderPanel();
      renderMap();
      if (announce && window.VMSS) window.VMSS.setState({ focusLayer: key }, { source: 'atlas' });
    }

    ringBtns.forEach((b) => b.addEventListener('click', () => select(b.dataset.atlasRing, true)));
    moveBtns.forEach((b) => b.addEventListener('click', () => {
      move = move === b.dataset.atlasMove ? null : b.dataset.atlasMove;
      renderMove();
      renderMap();
    }));

    document.addEventListener('vmss:state-change', (e) => {
      if (e.detail?.meta?.source === 'atlas') return;
      renderPanel();
      renderMap();
    });

    if ('ResizeObserver' in window) {
      let raf = 0;
      new ResizeObserver(() => { cancelAnimationFrame(raf); raf = requestAnimationFrame(renderMap); }).observe(stage);
    }

    renderPanel();
    renderMove();
    renderMap();
    root.classList.add('is-ready');
  }

  document.addEventListener('DOMContentLoaded', initAtlas);

})();
