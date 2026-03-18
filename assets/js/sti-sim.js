
(function () {
  const PROFILES = {
    contributor: { civic:18, contribution:19, conduct:14, competence:13, endorsement:9, violations:2, recovery:8 },
    stable: { civic:14, contribution:13, conduct:12, competence:10, endorsement:7, violations:5, recovery:4 },
    risk: { civic:8, contribution:6, conduct:5, competence:7, endorsement:3, violations:15, recovery:1 },
    recovery: { civic:10, contribution:9, conduct:9, competence:8, endorsement:5, violations:10, recovery:9 }
  };
  const CATEGORY_META = { civic:['Civic compliance',20], contribution:['Contribution',20], conduct:['Public conduct',15], competence:['Verified competence',15], endorsement:['Peer trust',10], violations:['Violation load',20], recovery:['Recovery modifier',10] };
  function layerForScore(score) {
    if (score >= 85) return { key:'+1', label:'+1 Sanctuary', tone:'High-trust access unlocked', range:'85–100' };
    if (score >= 70) return { key:'0', label:'Main Layer (0)', tone:'Stable civic baseline', range:'70–84' };
    if (score >= 50) return { key:'-1', label:'-1 Noncompliance', tone:'Monitored trust deficit', range:'50–69' };
    if (score >= 30) return { key:'-2', label:'-2 Violent Offense', tone:'Containment threshold engaged', range:'30–49' };
    return { key:'-3', label:'-3 Terminal', tone:'Terminal trust collapse', range:'0–29' };
  }
  function explanation(score, values) {
    const notes = [];
    if (values.violations >= 14) notes.push('Heavy violation load is overpowering positive inputs.');
    if (values.civic >= 15 && values.conduct >= 12) notes.push('Compliance and public conduct are stabilizing the score.');
    if (values.recovery >= 7 && values.violations >= 8) notes.push('Recovery signals soften the descent but do not erase prior harm.');
    if (values.contribution >= 16 && values.competence >= 12) notes.push('Productive contribution is boosting access and system confidence.');
    if (!notes.length) notes.push('This profile sits near the middle because strengths and liabilities are balancing out.');
    return notes.slice(0, 3);
  }
  function initSimulator() {
    const root = document.getElementById('sti-console');
    if (!root) return;
    const inputs = Array.from(root.querySelectorAll('input[type="range"]'));
    const scoreEl = root.querySelector('[data-sti-score]');
    const layerEl = root.querySelector('[data-sti-layer]');
    const toneEl = root.querySelector('[data-sti-tone]');
    const reasoningEl = root.querySelector('[data-sti-reasoning]');
    const gauge = root.querySelector('[data-gauge-progress]');
    const layerSteps = Array.from(root.querySelectorAll('.vmss-ladder-step'));
    const bars = Array.from(root.querySelectorAll('.vmss-breakdown-bar'));
    const buttons = Array.from(root.querySelectorAll('[data-profile]'));
    const resetBtn = root.querySelector('[data-reset-sim]');
    const profileName = root.querySelector('[data-profile-name]');
    const overallShift = root.querySelector('[data-overall-shift]');
    const stability = root.querySelector('[data-stability-band]');
    const circumference = 2 * Math.PI * 47;
    if (gauge) { gauge.style.strokeDasharray = `${circumference}`; gauge.style.strokeDashoffset = `${circumference}`; }
    const getValues = () => inputs.reduce((acc, input) => (acc[input.name] = Number(input.value), acc), {});
    const setInputVisuals = () => inputs.forEach((input) => {
      const valueEl = root.querySelector(`[data-value-for="${input.name}"]`);
      if (valueEl) valueEl.textContent = input.value;
    });
    const scoreModel = (v) => Math.max(0, Math.min(100, v.civic + v.contribution + v.conduct + v.competence + v.endorsement + v.recovery - v.violations));
    const render = (sourceLabel) => {
      const values = getValues();
      setInputVisuals();
      const score = scoreModel(values);
      const layer = layerForScore(score);
      const dashoffset = circumference - (score / 100) * circumference;
      const positivePressure = values.civic + values.contribution + values.conduct;
      if (scoreEl) scoreEl.textContent = score;
      if (layerEl) layerEl.textContent = layer.label;
      if (toneEl) toneEl.textContent = `${layer.tone} • STI band ${layer.range}`;
      if (profileName) profileName.textContent = sourceLabel || 'Custom profile';
      if (overallShift) overallShift.textContent = score >= 70 ? 'Upward pressure' : score >= 50 ? 'Friction zone' : 'Downward pressure';
      if (stability) stability.textContent = positivePressure >= 40 ? 'High coherence' : positivePressure >= 28 ? 'Mixed coherence' : 'Low coherence';
      if (gauge) gauge.style.strokeDashoffset = `${dashoffset}`;
      layerSteps.forEach((step) => step.classList.toggle('is-current', step.dataset.layer === layer.key));
      if (reasoningEl) reasoningEl.innerHTML = explanation(score, values).map((line) => `<div class="vmss-insight-item"><strong>Signal:</strong> ${line}</div>`).join('');
      bars.forEach((bar) => {
        const key = bar.dataset.metric, max = CATEGORY_META[key][1], value = values[key];
        const fill = bar.querySelector('.bar-fill');
        const number = bar.querySelector('.bar-number');
        if (fill) fill.style.width = `${(value / max) * 100}%`;
        if (number) number.textContent = key === 'violations' ? `-${value}` : `+${value}`;
      });
    };
    buttons.forEach((button) => button.addEventListener('click', () => {
      const profile = PROFILES[button.dataset.profile];
      if (!profile) return;
      buttons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      inputs.forEach((input) => input.value = String(profile[input.name]));
      render(button.textContent.trim());
    }));
    inputs.forEach((input) => input.addEventListener('input', () => { buttons.forEach((btn) => btn.classList.remove('is-active')); render('Custom profile'); }));
    if (resetBtn) resetBtn.addEventListener('click', () => {
      const defaults = { civic:11, contribution:11, conduct:8, competence:8, endorsement:6, recovery:5, violations:6 };
      inputs.forEach((input) => input.value = String(defaults[input.name]));
      buttons.forEach((btn) => btn.classList.remove('is-active'));
      render('Balanced baseline');
    });
    render('Balanced baseline');
  }
  document.addEventListener('DOMContentLoaded', initSimulator);
})();
