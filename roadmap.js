/**
 * roadmap.js — scroll-driven roadmap experience (roadmap.html only)
 *
 * Responsibilities:
 *   - Persistent rail: year readout, phase label, weighted-leakage readout,
 *     per-layer chips, and the leakage-gradient strand chart with a scroll
 *     marker (the "timeline indicator + leakage gradient" pair).
 *   - Pinned scenes: each phase section is tall; its stage sticks for the
 *     duration and an updater animates the SVG by scene progress p ∈ [0,1].
 *   - All intermediate leakage values are log-interpolated between canonical
 *     anchors and always displayed with "~" — anchors are exact, everything
 *     between is visibly approximate. No new canon numbers are invented.
 *
 * Canonical anchors (source: phase records on this page):
 *   Weighted system trajectory + the five-layer gradient table milestones.
 */
(function () {
  'use strict';

  /* ============ CANONICAL DATA ============ */

  // Weighted system leakage trajectory: [year, %]
  const HEADLINE = [
    [2026, 90], [2070, 90], [2150, 25], [2350, 8], [2400, 4], [2450, 2],
    [2500, 1.5], [2550, 1.2], [2600, 1], [2650, 1], [2750, 0.5], [2800, 0.3],
    [2850, 0.1], [2900, 0.05], [2950, 0.02], [3000, 0.01]
  ];

  // Five-layer gradient table milestones: [year, %] per layer (from 2150 on)
  const LAYERS = {
    p1: [[2150, 15], [2350, 4], [2550, 0.8], [2850, 0.01], [3000, 0.0001]],
    l0: [[2150, 20], [2350, 6], [2550, 1.5], [2850, 0.05], [3000, 0.005]],
    m1: [[2150, 30], [2350, 10], [2550, 3], [2850, 0.2], [3000, 0.05]],
    m2: [[2150, 40], [2350, 15], [2550, 5], [2850, 0.4], [3000, 0.2]],
    m3: [[2150, 55], [2350, 30], [2550, 12], [2850, 1.2], [3000, 1]]
  };
  const LAYER_KEYS = ['p1', 'l0', 'm1', 'm2', 'm3'];
  const GRADIENT_START = 2150;

  const ERA_LABELS = {
    now: '21st Century — Where We Actually Are',
    p0: 'Phase 0 — Foundation & Research',
    p1: 'Phase 1 — Threshold Crossing',
    p2: 'Phase 2 — Planetary Consolidation',
    p3: 'Phase 3 — Infrastructure Hardening',
    p4: 'Phase 4 — Systemic Refinement',
    p5: 'Phase 5 — The Forcefield Century',
    p6: 'Phase 6 — Mature VMSS'
  };

  /* ============ UTILITIES ============ */

  const clamp01 = (t) => Math.max(0, Math.min(1, t));
  const lerp = (a, b, t) => a + (b - a) * t;
  // Smoothstep over window [a, b]
  const win = (p, a, b) => {
    const t = clamp01((p - a) / (b - a));
    return t * t * (3 - 2 * t);
  };

  /** Log-scale interpolation between canonical [year, value] anchors. */
  function interpLog(points, year) {
    if (year <= points[0][0]) return points[0][1];
    const last = points[points.length - 1];
    if (year >= last[0]) return last[1];
    for (let i = 1; i < points.length; i++) {
      if (year <= points[i][0]) {
        const [y0, v0] = points[i - 1];
        const [y1, v1] = points[i];
        const t = (year - y0) / (y1 - y0);
        return Math.pow(10, lerp(Math.log10(v0), Math.log10(v1), t));
      }
    }
    return last[1];
  }

  /** Display formatting: hedged, trailing zeros trimmed, canon-exact at anchors. */
  function fmtLeak(v) {
    let s;
    if (v >= 10) s = String(Math.round(v));
    else if (v >= 1) s = String(Math.round(v * 10) / 10);
    else if (v >= 0.1) s = String(Math.round(v * 100) / 100);
    else if (v >= 0.01) s = String(Math.round(v * 1000) / 1000);
    else if (v >= 0.001) s = String(Math.round(v * 10000) / 10000);
    else s = v.toFixed(5).replace(/0+$/, '').replace(/\.$/, '');
    return '~' + s + '%';
  }

  /** Deterministic pseudo-random generator (stable dot fields across loads). */
  function lcg(seed) {
    let s = seed >>> 0;
    return () => {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  const SVG_NS = 'http://www.w3.org/2000/svg';
  function svgEl(tag, attrs, parent) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  }

  /** Solid-stroke draw-on: prime once, then reveal fraction f. */
  function primeDraw(el) {
    if (!el || el._rmLen) return;
    try { el._rmLen = el.getTotalLength(); } catch (e) { el._rmLen = 0; }
    el.style.strokeDasharray = el._rmLen;
  }
  function draw(el, f) {
    if (!el || !el._rmLen) return;
    el.style.strokeDashoffset = el._rmLen * (1 - clamp01(f));
  }
  function fade(el, f) {
    if (el) el.style.opacity = clamp01(f);
  }

  /* ============ STATE ============ */

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const experience = document.getElementById('rm-experience');
  if (!experience) return;

  const sceneEls = Array.from(experience.querySelectorAll('.rm-scene'));
  const railYear = document.getElementById('rm-year');
  const railEra = document.getElementById('rm-era');
  const railAgg = document.getElementById('rm-agg');
  const railBar = document.getElementById('rm-bar');
  const chartSvg = document.getElementById('rm-chart');
  const chipEls = {};
  LAYER_KEYS.forEach((k) => { chipEls[k] = document.getElementById('rm-chip-' + k); });

  let stageH = window.innerHeight;
  let segments = [];        // [{el, key, top, end, y0, y1, ctx, lastP}]
  let expStart = 0, expEnd = 1;
  let chart = null;         // built chart refs

  /* ============ SEGMENTS & YEAR MAPPING ============ */

  function measure() {
    stageH = window.innerHeight;
    const scrollY = window.scrollY;
    segments = sceneEls.map((el) => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + scrollY;
      const end = top + el.offsetHeight - stageH;
      return {
        el,
        key: el.dataset.scene,
        top,
        end: Math.max(end, top + 1),
        y0: Number(el.dataset.y0),
        y1: Number(el.dataset.y1),
        ctx: el._rmCtx,
        lastP: -1
      };
    });
    expStart = segments[0].top;
    expEnd = segments[segments.length - 1].end;
    buildChart();
  }

  function yearAt(scroll) {
    if (scroll <= segments[0].top) return segments[0].y0;
    for (let i = 0; i < segments.length; i++) {
      const s = segments[i];
      if (scroll < s.top) return segments[i - 1].y1; // in a drawer gap
      if (scroll <= s.end) return lerp(s.y0, s.y1, (scroll - s.top) / (s.end - s.top));
    }
    return segments[segments.length - 1].y1;
  }

  /* ============ RAIL CHART ============ */

  const CHART_W = 220;
  const PLOT_L = 46, PLOT_R = 212;
  const xOf = (v) => PLOT_L + ((2 - Math.log10(v)) / 6) * (PLOT_R - PLOT_L);

  function buildChart() {
    if (!chartSvg) return;
    const cw = chartSvg.clientWidth || CHART_W;
    const ch = chartSvg.clientHeight || 520;
    const H = Math.max(240, Math.round((ch / cw) * CHART_W));
    chartSvg.setAttribute('viewBox', `0 0 ${CHART_W} ${H}`);
    chartSvg.textContent = '';
    const plotT = 16, plotB = H - 18;
    const yOf = (scroll) => plotT + clamp01((scroll - expStart) / (expEnd - expStart)) * (plotB - plotT);

    // Decade gridlines (100% → 0.0001%)
    for (let d = 2; d >= -4; d--) {
      const x = xOf(Math.pow(10, d));
      svgEl('line', { x1: x, y1: plotT, x2: x, y2: plotB, class: 'rm-xgrid', opacity: 0.5 }, chartSvg);
    }
    [[100, '100%', 'start'], [1, '1%', 'middle'], [0.01, '.01%', 'middle'], [0.0001, '.0001%', 'end']].forEach(([v, lab, anchor]) => {
      svgEl('text', { x: xOf(v), y: H - 5, class: 'rm-xgrid-label', 'text-anchor': anchor }, chartSvg).textContent = lab;
    });

    // Sample year across the whole span (per segment for exact boundaries)
    const samples = [];
    let prev = null;
    segments.forEach((s) => {
      if (prev !== null && s.top > prev) {
        samples.push({ scroll: s.top, year: yearAt(s.top - 1) }); // gap end (year frozen)
      }
      const K = 24;
      for (let i = 0; i <= K; i++) {
        const scroll = lerp(s.top, s.end, i / K);
        samples.push({ scroll, year: lerp(s.y0, s.y1, i / K) });
      }
      prev = s.end;
    });

    const strandD = (points) => points.map((pt, i) => `${i ? 'L' : 'M'}${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`).join('');

    const strands = { agg: HEADLINE };
    LAYER_KEYS.forEach((k) => { strands[k] = LAYERS[k]; });

    // Faint full strands (the planned future)
    const litGroup = [];
    Object.keys(strands).forEach((key) => {
      const pts = [];
      samples.forEach((smp) => {
        if (key !== 'agg' && smp.year < GRADIENT_START) return;
        pts.push({ x: xOf(interpLog(strands[key], smp.year)), y: yOf(smp.scroll) });
      });
      if (pts.length < 2) return;
      const d = strandD(pts);
      svgEl('path', { d, class: 'rm-strand', 'data-s': key }, chartSvg);
      litGroup.push({ key, d });
    });

    // Lit strands (the traversed past) — clipped at the marker
    const clip = svgEl('clipPath', { id: 'rm-clip' }, svgEl('defs', {}, chartSvg));
    const clipRect = svgEl('rect', { x: 0, y: 0, width: CHART_W, height: 0 }, clip);
    const lit = svgEl('g', { 'clip-path': 'url(#rm-clip)' }, chartSvg);
    litGroup.forEach(({ key, d }) => svgEl('path', { d, class: 'rm-strand-lit', 'data-s': key }, lit));

    // Phase ticks (clickable jump points)
    const seen = new Set();
    const tickAt = (scroll, label) => {
      if (seen.has(label)) return;
      seen.add(label);
      const y = yOf(scroll);
      const g = svgEl('g', { class: 'rm-phase-tick' }, chartSvg);
      svgEl('line', { x1: 34, y1: y, x2: 44, y2: y }, g);
      const t = svgEl('text', { x: 2, y: y + 3 }, g);
      t.textContent = label;
      g.addEventListener('click', () => {
        window.scrollTo({ top: scroll + 2, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    };
    segments.forEach((s) => tickAt(s.top, String(s.y0)));
    tickAt(expEnd, String(segments[segments.length - 1].y1));

    // Marker
    const markerLn = svgEl('line', { x1: PLOT_L - 6, y1: plotT, x2: PLOT_R, y2: plotT, class: 'rm-marker-ln' }, chartSvg);
    const markerDot = svgEl('circle', { cx: PLOT_L, cy: plotT, r: 3.4, class: 'rm-marker-dot' }, chartSvg);

    chart = { yOf, clipRect, markerLn, markerDot };
  }

  /* ============ RAIL UPDATE ============ */

  let lastEraKey = '';
  function updateRail(scroll) {
    const year = yearAt(scroll);
    const agg = interpLog(HEADLINE, year);
    if (railYear) railYear.textContent = String(Math.round(year));
    if (railAgg) railAgg.textContent = fmtLeak(agg);

    // Era label from the nearest engaged scene
    let eraKey = segments[0].key;
    for (const s of segments) { if (scroll >= s.top - stageH * 0.35) eraKey = s.key; }
    if (eraKey !== lastEraKey && railEra) {
      railEra.textContent = ERA_LABELS[eraKey] || '';
      lastEraKey = eraKey;
    }

    LAYER_KEYS.forEach((k) => {
      const el = chipEls[k];
      if (!el) return;
      el.textContent = year >= GRADIENT_START ? fmtLeak(interpLog(LAYERS[k], year)) : '—';
    });

    const prog = clamp01((scroll - expStart) / (expEnd - expStart));
    if (railBar) railBar.style.width = (prog * 100).toFixed(2) + '%';

    if (chart) {
      const y = chart.yOf(scroll);
      chart.clipRect.setAttribute('height', y);
      chart.markerLn.setAttribute('y1', y);
      chart.markerLn.setAttribute('y2', y);
      chart.markerDot.setAttribute('cy', y);
      chart.markerDot.setAttribute('cx', xOf(agg));
    }
  }

  /* ============ SCENE SETUP (generated geometry) ============ */

  function setupScenes() {
    sceneEls.forEach((el) => {
      const key = el.dataset.scene;
      const ctx = { stat: el.querySelector('.rm-stat') };
      el._rmCtx = ctx;
      const $ = (sel) => el.querySelector(sel);
      const $$ = (sel) => Array.from(el.querySelectorAll(sel));

      if (key === 'now') {
        ctx.big = $('#now-big');
        ctx.meters = $$('.rm-meter').map((m) => ({
          fill: m.querySelector('.rm-meter-fill'),
          val: Number(m.dataset.val)
        }));
      }

      if (key === 'p0') {
        ctx.rings = $$('#p0-rings circle');
        ctx.ringLabels = $$('#p0-ring-labels text');
        ctx.dimLine = $('#p0-dim line');
        ctx.dimTexts = $$('#p0-dim text');
        ctx.stamp = $('#p0-stamp');
        ctx.nodes = $$('#p0-nodes .rm-node');
        primeDraw(ctx.dimLine);
      }

      if (key === 'p1') {
        ctx.ekg = $('.rm-ekg');
        ctx.ekgText = $('#p1-ekg text');
        primeDraw(ctx.ekg);
        ctx.bars = [0, 1, 2].map((i) => {
          const bar = $('#p1-bar-' + i);
          return {
            bar,
            ping: $('#p1-ping-' + i),
            y: Number(bar.getAttribute('y')),
            h: Number(bar.getAttribute('height'))
          };
        });
        ctx.wall = $('#p1-wall');
        primeDraw(ctx.wall);
        ctx.enclaveLabel = $('#p1-enclave > text');
        ctx.meterFill = $('#p1-meter-fill');
        ctx.meterGroup = $('#p1-meter');
        // Citizen dot field
        const g = $('#p1-citizens');
        const rnd = lcg(41);
        ctx.citizens = [];
        for (let i = 0; i < 64; i++) {
          const a = rnd() * Math.PI * 2;
          const r = 18 + Math.sqrt(rnd()) * 118;
          const dot = svgEl('circle', {
            cx: (700 + Math.cos(a) * r).toFixed(1),
            cy: (270 + Math.sin(a) * r).toFixed(1),
            r: 2.4, class: 'rm-citizen'
          }, g);
          ctx.citizens.push({ dot, t: 0.55 + rnd() * 0.33 });
        }
      }

      if (key === 'p2') {
        ctx.rings = $$('#p2-rings circle');
        ctx.rings.forEach(primeDraw);
        ctx.orbit = $('#p2-orbit');
        ctx.outposts = $$('#p2-outposts circle');
        ctx.probe = $('#p2-probe line');
        primeDraw(ctx.probe);
        ctx.probeHead = $('.rm-probe-head');
        ctx.probeText = $('#p2-probe text');
        ctx.popNum = $('#p2-pop-num');
        ctx.split = $('#p2-split');
        // Population dot field per band
        const g = $('#p2-dots');
        const rnd = lcg(97);
        const bands = [
          ['p1', 12, 40, 26], ['l0', 56, 86, 90], ['m1', 102, 132, 55],
          ['m2', 148, 178, 40], ['m3', 194, 224, 28]
        ];
        ctx.dots = [];
        bands.forEach(([band, r0, r1, count]) => {
          for (let i = 0; i < count; i++) {
            const a = rnd() * Math.PI * 2;
            const r = lerp(r0, r1, rnd());
            const dot = svgEl('circle', {
              cx: (460 + Math.cos(a) * r).toFixed(1),
              cy: (280 + Math.sin(a) * r).toFixed(1),
              r: 1.9
            }, g);
            dot.style.fill = `var(--rm-strand-${band})`;
            ctx.dots.push({ dot, t: 0.12 + rnd() * 0.62 });
          }
        });
      }

      if (key === 'p3') {
        ctx.wallUp = $('#p3-wall-up');
        ctx.wallDown = $('#p3-wall-down');
        ctx.air = $('#p3-air path');
        ctx.airX = $('#p3-air-x');
        ctx.airText = $('#p3-air text');
        ctx.tunnel = $('#p3-tunnel path');
        ctx.tunnelX = $('#p3-tunnel-x');
        ctx.tunnelText = $('#p3-tunnel text');
        ctx.steps = $$('#p3-steps text');
        ctx.dronesLabel = $('#p3-drones-label');
        const g = $('#p3-drones');
        ctx.drones = [];
        for (let i = 0; i < 12; i++) {
          const dot = svgEl('circle', { cx: 540 + i * 34, cy: 205 + (i % 2) * 14, r: 3, class: 'rm-drone' }, g);
          ctx.drones.push({ dot, t: 0.45 + i * 0.033 });
        }
      }

      if (key === 'p4') {
        // Mesh grid
        const g = $('#p4-mesh');
        const cols = 6, rows = 4, x0 = 100, y0 = 120, step = 92;
        const edges = [];
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols - 1; i++) edges.push([x0 + i * step, y0 + j * step, x0 + (i + 1) * step, y0 + j * step]);
        }
        for (let j = 0; j < rows - 1; j++) {
          for (let i = 0; i < cols; i++) edges.push([x0 + i * step, y0 + j * step, x0 + i * step, y0 + (j + 1) * step]);
        }
        const gapSet = new Set([2, 7, 13, 19, 24, 30, 36]);
        ctx.gaps = [];
        edges.forEach(([x1, y1, x2, y2], idx) => {
          const isGap = gapSet.has(idx);
          const ln = svgEl('line', { x1, y1, x2, y2, class: isGap ? 'rm-mesh-gap' : 'rm-mesh-edge' }, g);
          if (isGap) ctx.gaps.push({ ln, t: 0.16 + ctx.gaps.length * 0.08 });
        });
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            svgEl('circle', { cx: x0 + i * step, cy: y0 + j * step, r: 3.2, class: 'rm-mesh-node' }, g);
          }
        }
        ctx.mesh = g;
        ctx.gaugeFill = $('#p4-gauge-fill');
        primeDraw(ctx.gaugeFill);
        ctx.gaugeNum = $('#p4-gauge-num');
        if (ctx.gaugeNum) ctx.gaugeNum.setAttribute('font-size', '20');
        ctx.charter = $('#p4-charter');
        ctx.charterLines = $$('#p4-charter-lines line');
        ctx.dyson = $('#p4-dyson');
        ctx.collectors = $$('#p4-dyson .rm-collector');
        ctx.collectors.forEach(primeDraw);
      }

      if (key === 'p5') {
        const g = $('#p5-swarm');
        const rnd = lcg(23);
        ctx.swarm = [];
        for (let i = 0; i < 26; i++) {
          const r = 64 + rnd() * 56;
          const a0 = rnd() * Math.PI * 2;
          const a1 = a0 + 0.38 + rnd() * 0.3;
          const p = svgEl('path', {
            d: `M ${(180 + Math.cos(a0) * r).toFixed(1)} ${(170 + Math.sin(a0) * r).toFixed(1)} A ${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${(180 + Math.cos(a1) * r).toFixed(1)} ${(170 + Math.sin(a1) * r).toFixed(1)}`,
            class: 'rm-collector', fill: 'none'
          }, g);
          ctx.swarm.push({ p, t: 0.02 + (i / 26) * 0.52 });
        }
        ctx.beam = $('#p5-beam');
        ctx.shields = [0, 1, 2].map((i) => $('#p5-shield-' + i));
        ctx.shieldFull = $('#p5-shield-full');
        ctx.labels = [0, 1, 2].map((i) => $('#p5-lab-' + i));
        ctx.breachFill = $('#p5-breach-fill');
        ctx.breachText = $('#p5-breach-txt');
      }

      if (key === 'p6') {
        ctx.plunge = $('.rm-plunge');
        primeDraw(ctx.plunge);
        ctx.plungeTexts = $$('#p6-plunge text');
        ctx.num = $('#p6-num');
        ctx.convs = $$('.rm-conv');
        ctx.halo = $('#p6-halo');
      }
    });
  }

  /* ============ SCENE UPDATERS ============ */

  const UPDATERS = {
    now(ctx, p) {
      if (ctx.big) ctx.big.textContent = String(Math.round(90 * win(p, 0, 0.5)));
      ctx.meters.forEach((m, i) => {
        const f = win(p, 0.06 + i * 0.06, 0.32 + i * 0.06);
        m.fill.style.width = (m.val * f) + '%';
      });
      if (ctx.stat) ctx.stat.classList.toggle('is-on', p > 0.8);
    },

    p0(ctx, p) {
      ctx.rings.forEach((ring, i) => {
        const f = win(p, 0.04 + i * 0.09, 0.2 + i * 0.09);
        ring.style.opacity = f * 0.85;
        const s = 0.86 + 0.14 * f;
        ring.setAttribute('transform', `translate(480 280) scale(${s.toFixed(3)}) translate(-480 -280)`);
        const lab = ctx.ringLabels[i];
        if (lab) lab.style.opacity = f;
      });
      draw(ctx.dimLine, win(p, 0.5, 0.62));
      ctx.dimTexts.forEach((t) => fade(t, win(p, 0.58, 0.68)));
      const sf = win(p, 0.03, 0.11);
      if (ctx.stamp) {
        ctx.stamp.style.opacity = sf;
        ctx.stamp.setAttribute('transform', `rotate(-8 170 96) translate(170 96) scale(${(0.6 + 0.4 * sf).toFixed(3)}) translate(-170 -96)`);
      }
      ctx.nodes.forEach((node, i) => {
        const f = win(p, 0.4 + i * 0.085, 0.5 + i * 0.085);
        node.style.opacity = 0.25 + 0.75 * f;
        node.classList.toggle('is-lit', f > 0.6);
      });
      if (ctx.stat) ctx.stat.classList.toggle('is-on', p > 0.86);
    },

    p1(ctx, p) {
      draw(ctx.ekg, win(p, 0.28, 0.58));
      fade(ctx.ekgText, win(p, 0.3, 0.4));
      ctx.bars.forEach((b, i) => {
        const f = win(p, 0.06 + i * 0.14, 0.34 + i * 0.14);
        const h = b.h * f;
        b.bar.setAttribute('height', h.toFixed(1));
        b.bar.setAttribute('y', (b.y + b.h - h).toFixed(1));
        // Ping when the bar crosses the operational threshold
        const pf = win(p, 0.3 + i * 0.14, 0.44 + i * 0.14);
        b.ping.style.opacity = pf > 0 ? (1 - pf) * 0.9 : 0;
        b.ping.setAttribute('r', (8 + 30 * pf).toFixed(1));
      });
      draw(ctx.wall, win(p, 0.42, 0.7));
      fade(ctx.enclaveLabel, win(p, 0.62, 0.72));
      ctx.citizens.forEach((c) => fade(c.dot, win(p, c.t, c.t + 0.06)));
      const mf = win(p, 0.62, 0.92);
      fade(ctx.meterGroup, win(p, 0.56, 0.66));
      if (ctx.meterFill) ctx.meterFill.setAttribute('width', Math.round(lerp(216, 108, mf)));
      if (ctx.stat) ctx.stat.classList.toggle('is-on', p > 0.86);
    },

    p2(ctx, p) {
      ctx.rings.forEach((ring, i) => draw(ring, win(p, 0.02 + i * 0.03, 0.14 + i * 0.03)));
      ctx.dots.forEach((d) => fade(d.dot, win(p, d.t, d.t + 0.05)));
      if (ctx.popNum) {
        if (p < 0.16) ctx.popNum.textContent = '—';
        else if (p < 0.72) ctx.popNum.textContent = '≈' + (lerp(0.1, 3.4, win(p, 0.16, 0.72))).toFixed(1) + ' billion';
        else ctx.popNum.textContent = '1–5+ billion';
      }
      fade(ctx.orbit, win(p, 0.5, 0.62) * 0.9);
      ctx.outposts.forEach((o, i) => fade(o, win(p, 0.56 + i * 0.05, 0.64 + i * 0.05)));
      draw(ctx.probe, win(p, 0.76, 0.88));
      fade(ctx.probeHead, win(p, 0.86, 0.92));
      fade(ctx.probeText, win(p, 0.84, 0.94));
      fade(ctx.split, win(p, 0.66, 0.8));
      if (ctx.stat) ctx.stat.classList.toggle('is-on', p > 0.86);
    },

    p3(ctx, p) {
      const fu = win(p, 0.08, 0.42);
      ctx.wallUp.setAttribute('height', (246 * fu).toFixed(1));
      ctx.wallUp.setAttribute('y', (330 - 246 * fu).toFixed(1));
      const fd = win(p, 0.3, 0.55);
      ctx.wallDown.setAttribute('height', (150 * fd).toFixed(1));
      fade(ctx.air, win(p, 0.52, 0.62));
      fade(ctx.airText, win(p, 0.54, 0.64));
      fade(ctx.airX, win(p, 0.62, 0.7));
      fade(ctx.tunnel, win(p, 0.64, 0.74));
      fade(ctx.tunnelText, win(p, 0.66, 0.76));
      fade(ctx.tunnelX, win(p, 0.74, 0.82));
      ctx.drones.forEach((d) => fade(d.dot, win(p, d.t, d.t + 0.05)));
      fade(ctx.dronesLabel, win(p, 0.5, 0.6));
      ctx.steps.forEach((t, i) => fade(t, win(p, 0.52 + i * 0.11, 0.6 + i * 0.11)));
      if (ctx.stat) ctx.stat.classList.toggle('is-on', p > 0.86);
    },

    p4(ctx, p) {
      fade(ctx.mesh, 0.3 + 0.7 * win(p, 0, 0.12));
      ctx.gaps.forEach((g) => g.ln.classList.toggle('is-closed', p > g.t));
      draw(ctx.gaugeFill, 0.975 * win(p, 0.22, 0.78));
      if (ctx.gaugeNum) {
        ctx.gaugeNum.textContent = p < 0.24 ? '—' : (p < 0.74 ? 'declining' : 'near-zero');
      }
      fade(ctx.charter, win(p, 0.42, 0.54));
      ctx.charterLines.forEach((ln, i) => fade(ln, win(p, 0.48 + i * 0.06, 0.54 + i * 0.06)));
      fade(ctx.dyson, win(p, 0.7, 0.8));
      ctx.collectors.forEach((c, i) => draw(c, win(p, 0.76 + i * 0.06, 0.9 + i * 0.06)));
      if (ctx.stat) ctx.stat.classList.toggle('is-on', p > 0.86);
    },

    p5(ctx, p) {
      ctx.swarm.forEach((s) => fade(s.p, win(p, s.t, s.t + 0.05)));
      fade(ctx.beam, win(p, 0.3, 0.4));
      if (ctx.beam) ctx.beam.style.strokeDashoffset = String(Math.round((1 - p) * 120));
      const th = [0.48, 0.66, 0.8];
      ctx.shields.forEach((sh, i) => fade(sh, win(p, th[i], th[i] + 0.07) * 0.95));
      ctx.labels.forEach((lb, i) => fade(lb, win(p, th[i], th[i] + 0.08)));
      fade(ctx.shieldFull, win(p, 0.86, 0.94) * 0.75);
      const bf = win(p, 0.55, 0.9);
      if (ctx.breachFill) ctx.breachFill.setAttribute('width', Math.round(lerp(200, 8, bf)));
      fade(ctx.breachText, win(p, 0.82, 0.92));
      if (ctx.stat) ctx.stat.classList.toggle('is-on', p > 0.88);
    },

    p6(ctx, p) {
      draw(ctx.plunge, win(p, 0.3, 0.78));
      ctx.plungeTexts.forEach((t, i) => fade(t, i === 0 ? win(p, 0.3, 0.38) : win(p, 0.72, 0.82)));
      if (ctx.num) {
        const v = Math.pow(10, lerp(Math.log10(0.1), Math.log10(0.01), win(p, 0.1, 0.85)));
        ctx.num.textContent = fmtLeak(v);
      }
      ctx.convs.forEach((conv, i) => {
        const f = win(p, 0.12 + i * 0.13, 0.26 + i * 0.13);
        const angle = (i % 2 ? -1 : 1) * 38 * (1 - f);
        conv.style.opacity = f;
        conv.setAttribute('transform', `rotate(${angle.toFixed(2)} 480 266)`);
        conv.classList.toggle('is-locked', f > 0.92);
      });
      fade(ctx.halo, win(p, 0.72, 0.86) * 0.7);
      if (ctx.stat) ctx.stat.classList.toggle('is-on', p > 0.88);
    }
  };

  /* ============ SCROLL LOOP ============ */

  function updateScenes(scroll) {
    const vh = stageH;
    segments.forEach((s) => {
      // Skip far-offscreen scenes
      if (scroll + vh < s.top - vh || scroll > s.end + vh * 2) return;
      let p = clamp01((scroll - s.top) / (s.end - s.top));
      if (reduceMotion) p = 1;
      if (Math.abs(p - s.lastP) < 0.0004 && s.lastP !== -1) return;
      s.lastP = p;
      const fn = UPDATERS[s.key];
      if (fn && s.el._rmCtx) fn(s.el._rmCtx, p);
    });
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const scroll = window.scrollY;
      updateRail(scroll);
      updateScenes(scroll);
      ticking = false;
    });
  }

  /* ============ INIT ============ */

  function init() {
    setupScenes();
    measure();

    if (reduceMotion) {
      // Render every scene complete; the rail still tracks scroll.
      segments.forEach((s) => {
        const fn = UPDATERS[s.key];
        if (fn && s.el._rmCtx) fn(s.el._rmCtx, 1);
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { measure(); onScroll(); }, { passive: true });

    // Layout shifts (async navbar/footer injection, drawer toggles) move
    // every scene offset — re-measure whenever the document resizes.
    if ('ResizeObserver' in window) {
      let raf = null;
      const ro = new ResizeObserver(() => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          measure();
          onScroll();
          raf = null;
        });
      });
      ro.observe(document.body);
    } else {
      document.querySelectorAll('.rm-detail').forEach((d) => {
        d.addEventListener('toggle', () => { measure(); onScroll(); });
      });
      setTimeout(() => { measure(); onScroll(); }, 1600);
    }

    onScroll();
    updateRail(window.scrollY);
    updateScenes(window.scrollY);
  }

  // Test/debug hook — drives the same update path synchronously (used by
  // automated verification; harmless in production).
  window.__rmDebug = {
    fmtLeak,
    interpLog,
    HEADLINE,
    LAYERS,
    yearAt: (s) => yearAt(s),
    segments: () => segments,
    measure: () => measure(),
    tick: (scroll) => {
      updateRail(scroll);
      segments.forEach((seg) => { seg.lastP = -1; });
      updateScenes(scroll);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
