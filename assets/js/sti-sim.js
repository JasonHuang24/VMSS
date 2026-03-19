
(function () {
  const PROFILES = {
    contributor: { civic:18, contribution:19, conduct:14, competence:13, endorsement:9, violations:2, recovery:8 },
    stable: { civic:14, contribution:13, conduct:12, competence:10, endorsement:7, violations:5, recovery:4 },
    risk: { civic:8, contribution:6, conduct:5, competence:7, endorsement:3, violations:15, recovery:1 },
    recovery: { civic:10, contribution:9, conduct:9, competence:8, endorsement:5, violations:10, recovery:9 }
  };
  const CATEGORY_META = { civic:['Civic compliance',20], contribution:['Contribution',20], conduct:['Public conduct',15], competence:['Verified competence',15], endorsement:['Peer trust',10], violations:['Violation load',20], recovery:['Recovery modifier',10] };
  const EVENT_DELTAS = {
    violation: { label:'Compliance violation logged', values:{ violations:+5, conduct:-2, civic:-3 } },
    service: { label:'Civic service completed', values:{ contribution:+4, civic:+2, endorsement:+1 } },
    endorsement: { label:'Peer endorsement registered', values:{ endorsement:+3, conduct:+1 } },
    audit: { label:'Compliance audit failed', values:{ civic:-4, competence:-1, violations:+3 } },
    rehab: { label:'Rehabilitation period completed', values:{ recovery:+4, violations:-2, conduct:+2 } }
  };
  function layerForScore(score) {
    if (score >= 85) return { key:'+1', label:'+1 Sanctuary', tone:'High-trust access unlocked', range:'85–100' };
    if (score >= 70) return { key:'0', label:'Main Layer (0)', tone:'Stable civic baseline', range:'70–84' };
    if (score >= 50) return { key:'-1', label:'-1 Noncompliance', tone:'Monitored trust deficit', range:'50–69' };
    if (score >= 30) return { key:'-2', label:'-2 Violent Offense', tone:'Containment threshold engaged', range:'30–49' };
    return { key:'-3', label:'-3 Terminal', tone:'Terminal trust collapse', range:'0–29' };
  }
  function explanation(score, values, eventLabel) {
    const notes = [];
    if (eventLabel) notes.push(eventLabel + '.');
    if (values.violations >= 14) notes.push('Heavy violation load is overpowering positive inputs.');
    if (values.civic >= 15 && values.conduct >= 12) notes.push('Compliance and public conduct are stabilizing the score.');
    if (values.recovery >= 7 && values.violations >= 8) notes.push('Recovery signals soften the descent but do not erase prior harm.');
    if (values.contribution >= 16 && values.competence >= 12) notes.push('Productive contribution is boosting access and system confidence.');
    if (score < 50) notes.push('This subject is operating below ordinary civic trust and faces containment pressure.');
    if (!notes.length) notes.push('This profile sits near the middle because strengths and liabilities are balancing out.');
    return notes.slice(0, 3);
  }
  function clampValues(v) {
    const next = { ...v };
    Object.entries(CATEGORY_META).forEach(([key, meta]) => {
      next[key] = Math.max(0, Math.min(meta[1], Number(next[key]) || 0));
    });
    return next;
  }

  function getDeltaMessage(previousScore, nextScore, layer, eventLabel) {
    const delta = nextScore - previousScore;
    const direction = delta > 0 ? 'rose' : delta < 0 ? 'fell' : 'held steady';
    const amount = delta === 0 ? '' : ` by ${Math.abs(delta)} points`;
    const cause = eventLabel ? ` after ${eventLabel.toLowerCase()}` : '';
    return `STI ${direction}${amount}${cause}. Current placement: ${layer.label}.`;
  }
  function pulseElement(element) {
    if (!element) return;
    element.classList.remove('vmss-flash');
    void element.offsetWidth;
    element.classList.add('vmss-flash');
    setTimeout(() => element.classList.remove('vmss-flash'), 520);
  }
  function initSimulator() {
    const root = document.getElementById('sti-console');
    if (!root) return;
    const inputs = Array.from(root.querySelectorAll('input[type="range"]'));
    const scoreEl = root.querySelector('[data-sti-score]');
    const layerEl = root.querySelector('[data-sti-layer]');
    const toneEl = root.querySelector('[data-sti-tone]');
    const reasoningEl = root.querySelector('[data-sti-reasoning]');
    const liveRegion = root.querySelector('[data-sti-live]');
    const gauge = root.querySelector('[data-gauge-progress]');
    const layerSteps = Array.from(root.querySelectorAll('.vmss-ladder-step'));
    const bars = Array.from(root.querySelectorAll('.vmss-breakdown-bar'));
    const buttons = Array.from(root.querySelectorAll('[data-profile]'));
    const resetBtn = root.querySelector('[data-reset-sim]');
    const profileName = root.querySelector('[data-profile-name]');
    const overallShift = root.querySelector('[data-overall-shift]');
    const stability = root.querySelector('[data-stability-band]');
    const eventButtons = Array.from(root.querySelectorAll('[data-sti-event]'));
    const eventFeed = root.querySelector('[data-event-feed]');
    const walkthrough = Array.from(root.querySelectorAll('[data-walkthrough-step]'));
    const stepLabel = root.querySelector('[data-walkthrough-status]');
    const circumference = 2 * Math.PI * 47;
    let lastLayerKey = null;
    let currentEventLabel = '';
    let walkthroughIndex = -1;
    if (gauge) { gauge.style.strokeDasharray = `${circumference}`; gauge.style.strokeDashoffset = `${circumference}`; }
    const getValues = () => inputs.reduce((acc, input) => (acc[input.name] = Number(input.value), acc), {});
    const setValues = (values) => {
      inputs.forEach((input) => {
        if (values[input.name] !== undefined) input.value = String(values[input.name]);
      });
    };
    const setInputVisuals = () => inputs.forEach((input) => {
      const valueEl = root.querySelector(`[data-value-for="${input.name}"]`);
      if (valueEl) valueEl.textContent = input.value;
    });
    const scoreModel = (v) => Math.max(0, Math.min(100, v.civic + v.contribution + v.conduct + v.competence + v.endorsement + v.recovery - v.violations));
    const render = (sourceLabel, options = {}) => {
      const values = clampValues(getValues());
      setValues(values);
      setInputVisuals();
      const score = scoreModel(values);
      const layer = layerForScore(score);
      const dashoffset = circumference - (score / 100) * circumference;
      const positivePressure = values.civic + values.contribution + values.conduct;
      if (scoreEl) window.vmssAnimateNumber ? window.vmssAnimateNumber(scoreEl, score, { duration: 460 }) : (scoreEl.textContent = score);
      if (layerEl) layerEl.textContent = layer.label;
      if (toneEl) toneEl.textContent = `${layer.tone} • STI band ${layer.range}`;
      if (profileName) profileName.textContent = sourceLabel || 'Custom profile';
      if (overallShift) overallShift.textContent = score >= 70 ? 'Upward pressure' : score >= 50 ? 'Friction zone' : 'Downward pressure';
      if (stability) stability.textContent = positivePressure >= 40 ? 'High coherence' : positivePressure >= 28 ? 'Mixed coherence' : 'Low coherence';
      if (gauge) { gauge.style.strokeDashoffset = `${dashoffset}`; gauge.classList.toggle('is-strong', score >= 70); }
      layerSteps.forEach((step) => step.classList.toggle('is-current', step.dataset.layer === layer.key));
      if (reasoningEl) reasoningEl.innerHTML = explanation(score, values, currentEventLabel).map((line) => `<div class="vmss-insight-item"><strong>Signal:</strong> ${line}</div>`).join('');
      bars.forEach((bar) => {
        const key = bar.dataset.metric, max = CATEGORY_META[key][1], value = values[key];
        const fill = bar.querySelector('.bar-fill');
        const number = bar.querySelector('.bar-number');
        if (fill) fill.style.width = `${(value / max) * 100}%`;
        if (number) number.textContent = key === 'violations' ? `-${value}` : `+${value}`;
      });
      const previousScore = Number(scoreEl?.dataset.currentValue ?? scoreEl?.textContent ?? score) || score;
      const detailMessage = getDeltaMessage(previousScore, score, layer, currentEventLabel);
      if (eventFeed) eventFeed.textContent = lastLayerKey && lastLayerKey !== layer.key ? `Layer transition: ${layer.label}` : detailMessage;
      if (liveRegion) liveRegion.textContent = lastLayerKey && lastLayerKey !== layer.key
        ? `Layer transition: now in ${layer.label}. STI ${score}.`
        : `STI ${score}. ${layer.label}.`;
      if (lastLayerKey && lastLayerKey !== layer.key) pulseElement(root.querySelector('.vmss-score-card'));
      lastLayerKey = layer.key;
      if (window.VMSS) {
        window.VMSS.setState({
          stiScore: score,
          selectedLayer: layer.key,
          profile: sourceLabel || 'Custom profile',
          tone: layer.tone,
          lastEvent: currentEventLabel || 'Manual slider adjustment',
          values
        }, { source: options.source || 'sti-sim' });
      }
    };
    const applyEvent = (eventKey) => {
      const event = EVENT_DELTAS[eventKey];
      if (!event) return;
      const values = getValues();
      const next = clampValues(Object.fromEntries(Object.keys(values).map((key) => [key, values[key] + (event.values[key] || 0)])));
      setValues(next);
      currentEventLabel = event.label;
      buttons.forEach((btn) => btn.classList.remove('is-active'));
      render('Event-driven profile', { source: 'sti-event' });
    };
    const walkthroughStates = [
      { label:'Step 1 • Baseline citizen', profile:'stable' },
      { label:'Step 2 • Violation drives descent', event:'violation' },
      { label:'Step 3 • Recovery restores trust', event:'rehab' },
      { label:'Step 4 • Contribution pushes upward', event:'service' }
    ];
    const runWalkthrough = () => {
      walkthroughIndex = (walkthroughIndex + 1) % walkthroughStates.length;
      const step = walkthroughStates[walkthroughIndex];
      walkthrough.forEach((btn, index) => btn.classList.toggle('is-active', index === walkthroughIndex));
      if (step.profile) {
        const profileValues = PROFILES[step.profile];
        setValues(profileValues);
        currentEventLabel = 'Baseline loaded for walkthrough';
        render(step.label, { source: 'walkthrough' });
      }
      if (step.event) applyEvent(step.event);
      if (stepLabel) stepLabel.textContent = step.label;
    };
    buttons.forEach((button) => button.addEventListener('click', () => {
      const profile = PROFILES[button.dataset.profile];
      if (!profile) return;
      buttons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      currentEventLabel = 'Profile selected';
      setValues(profile);
      render(button.textContent.trim(), { source: 'profile' });
    }));
    eventButtons.forEach((button) => button.addEventListener('click', () => applyEvent(button.dataset.stiEvent)));
    walkthrough.forEach((button) => button.addEventListener('click', runWalkthrough));
    inputs.forEach((input) => input.addEventListener('input', () => { buttons.forEach((btn) => btn.classList.remove('is-active')); currentEventLabel = 'Manual factor adjustment'; render('Custom profile', { source: 'manual' }); }));
    if (resetBtn) resetBtn.addEventListener('click', () => {
      const defaults = { civic:11, contribution:11, conduct:8, competence:8, endorsement:6, recovery:5, violations:6 };
      setValues(defaults);
      buttons.forEach((btn) => btn.classList.remove('is-active'));
      currentEventLabel = 'Baseline loaded';
      render('Balanced baseline', { source: 'reset' });
      walkthroughIndex = -1;
      walkthrough.forEach((btn) => btn.classList.remove('is-active'));
      if (stepLabel) stepLabel.textContent = 'Walkthrough idle';
    });
    document.addEventListener('vmss:state-change', (event) => {
      const source = event.detail?.meta?.source;
      const state = event.detail?.state;
      if (!state || ['sti-sim','sti-event','profile','manual','reset','walkthrough'].includes(source)) return;
      if (state.values) setValues(state.values);
      currentEventLabel = state.lastEvent || currentEventLabel;
      render(state.profile || 'Synced profile', { source: 'external-sync' });
    });
    const initial = window.VMSS?.getState?.();
    if (initial?.values) setValues(initial.values);
    currentEventLabel = initial?.lastEvent || 'Baseline loaded';
    render(initial?.profile || 'Balanced baseline', { source: 'initial' });
  }
  document.addEventListener('DOMContentLoaded', initSimulator);
})();
