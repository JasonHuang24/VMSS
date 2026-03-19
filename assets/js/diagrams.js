
(function () {
  const LAYER_DATA = {
    '+1': {label:'+1 Sanctuary', range:'STI 85–100', summary:'The highest-trust ring. Pre-intervention safety, elite access, and the most selective civic privileges exist here.', rights:'Maximum autonomy, highest safety, premium domains', doctrine:'Trust is preserved before harm completes.', risk:'Loss of access is immediate once severe trust is broken.', href:'layer-+1.html'},
    '0': {label:'Main Layer (0)', range:'STI 70–84', summary:'Baseline civilization. Full life remains available, but intervention happens after harm rather than before it.', rights:'Work, family, trade, ordinary civic life', doctrine:'The proving ground where moral causality remains visible.', risk:'Repeated trust failures push citizens downward.', href:'layer-0.html'},
    '-1': {label:'-1 Noncompliance', range:'STI 50–69', summary:'A lower-trust stratum for non-trivial but non-predatory violations. Material life remains stable, but status and access contract.', rights:'Restricted status, reduced access, monitored reintegration logic', doctrine:'Consequences remain permanent without collapsing civilization into chaos.', risk:'Continued disregard for norms escalates toward containment.', href:'layer--1.html'},
    '-2': {label:'-2 Violent Offense', range:'STI 30–49', summary:'The severe-harm tier. Citizens here have demonstrated predatory or highly dangerous conduct and lose ordinary civic trust.', rights:'Containment-focused life with sharply reduced freedoms', doctrine:'Society protects the innocent first by separating high-risk actors.', risk:'Violence and coercion move citizens out of ordinary civic space.', href:'layer--2.html'},
    '-3': {label:'-3 Terminal', range:'STI 0–29', summary:'The terminal layer. No safety net, no revival, and no artificial rescue from the consequences of terminal-level harm.', rights:'Minimal protections; consequence environment only', doctrine:'Terminal harm yields terminal placement.', risk:'No upward restoration into high-trust life.', href:'layer--3.html'}
  };
  function initDiagram() {
    const root = document.querySelector('[data-vmss-diagram]');
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll('.vmss-ring-node'));
    const cards = Array.from(document.querySelectorAll('.layer-card[data-layer]'));
    const title = document.getElementById('vmss-layer-title');
    const range = document.getElementById('vmss-layer-range');
    const summary = document.getElementById('vmss-layer-summary');
    const rights = document.getElementById('vmss-layer-rights');
    const doctrine = document.getElementById('vmss-layer-doctrine');
    const risk = document.getElementById('vmss-layer-risk');
    const openLink = document.getElementById('vmss-layer-link');
    let activeLayer = (window.VMSS && window.VMSS.getState().selectedLayer) || '+1';
    const sync = (layer) => {
      activeLayer = layer;
      const info = LAYER_DATA[layer];
      if (!info) return;
      nodes.forEach((node) => {
        const isActive = node.dataset.layer === layer;
        node.classList.toggle('is-active', isActive);
        node.classList.toggle('is-dimmed', !isActive);
        node.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      cards.forEach((card) => {
        const active = card.dataset.layer === layer;
        card.classList.toggle('is-linked-active', active);
        if (active) {
          card.classList.remove('vmss-flash');
          void card.offsetWidth;
          card.classList.add('vmss-flash');
          setTimeout(() => card.classList.remove('vmss-flash'), 520);
        }
      });
      if (title) title.textContent = info.label;
      if (range) range.textContent = info.range;
      if (summary) summary.textContent = info.summary;
      if (rights) rights.textContent = info.rights;
      if (doctrine) doctrine.textContent = info.doctrine;
      if (risk) risk.textContent = info.risk;
      if (openLink) openLink.setAttribute('href', info.href);
      if (window.VMSS) window.VMSS.setState({ selectedLayer: layer, lastEvent: `Focused ${info.label}` }, { source: 'diagram' });
    };
    nodes.forEach((node) => {
      node.addEventListener('click', (e) => { sync(node.dataset.layer); e.currentTarget.blur(); });
      node.addEventListener('focus', () => sync(node.dataset.layer));
      node.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); sync(node.dataset.layer); }
      });
    });
    cards.forEach((card) => ['click','focus'].forEach((evt) => card.addEventListener(evt, () => sync(card.dataset.layer))));
    document.addEventListener('vmss:state-change', (event) => {
      const state = event.detail?.state;
      const source = event.detail?.meta?.source;
      if (!state || source === 'diagram') return;
      if (state.selectedLayer && state.selectedLayer !== activeLayer) {
        sync(state.selectedLayer);
      }
    });
    sync(activeLayer);
  }
  document.addEventListener('DOMContentLoaded', initDiagram);
})();
