/**
 * sti-sim.js — STI Simulation Console
 *
 * Powers the interactive Social Trust Index console on simulations.html.
 * Users can adjust seven civic factor sliders, trigger discrete events,
 * load preset profiles, or randomize to explore how scores and layer
 * placements change under the VMSS scoring model.
 *
 * Architecture:
 *   - Pure helper functions (layerForScore, scoreModel, etc.) at the top
 *   - buildRandomProfile() is isolated for clarity — it has non-trivial math
 *   - initSimulator() handles all DOM binding and the render cycle
 *   - All state changes are pushed to window.VMSS so the HUD and ring map stay in sync
 *
 * Score model: civic + contribution + conduct + competence + endorsement + recovery - violations
 * Max possible score: 100 (all positive factors maxed, violations = 0)
 */

(function () {

  // =========================
  // CONSTANTS
  // =========================

  /** Preset citizen profiles used by the sample profile buttons. */
  const PROFILES = {
    contributor: { civic:18, contribution:19, conduct:18, competence:17, endorsement:9, violations:2, recovery:8 },
    stable:      { civic:14, contribution:13, conduct:12, competence:10, endorsement:7, violations:5, recovery:4 },
    risk:        { civic:8,  contribution:6,  conduct:5,  competence:7,  endorsement:3, violations:15, recovery:1 },
    recovery:    { civic:10, contribution:9,  conduct:9,  competence:8,  endorsement:5, violations:10, recovery:9 }
  };

  /**
   * Factor metadata: [display label, max value].
   * Key order mirrors scoreModel addition/subtraction: positives first, violations last.
   * CATEGORY_META is the single source of truth for factor maxes —
   * the randomizer derives its constraints from here rather than hardcoding them.
   */
  const CATEGORY_META = {
    civic:        ['Civic compliance',    20],
    contribution: ['Contribution',        20],
    conduct:      ['Public conduct',      20],
    competence:   ['Verified competence', 20],
    endorsement:  ['Peer trust',          10],
    recovery:     ['Recovery modifier',   10],
    violations:   ['Violation load',      20],
  };

  /**
   * Discrete civic events that apply deltas to the current factor values.
   * v17.6: each event now carries Article XV classification:
   *   clearable — removable from active record if trajectory improves
   *   permanent — cannot be cleared regardless of subsequent behavior
   */
  /** Duration options for RNG display (cosmetic — adds flavor to event labels). */
  const DURATIONS = ['1 day', '2 days', '3 days', '5 days', '1 week', '10 days', '2 weeks', '3 weeks', '1 month'];
  const randDuration = () => DURATIONS[Math.floor(Math.random() * DURATIONS.length)];

  /** Converts a duration string to approximate number of days. */
  function parseDays(dur) {
    if (!dur) return 1;
    const n = parseInt(dur) || 1;
    if (dur.includes('month')) return n * 30;
    if (dur.includes('week'))  return n * 7;
    return n; // days
  }
  const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randRange = (base, spread) => base + Math.floor(Math.random() * (spread * 2 + 1)) - spread;

  /**
   * Event definitions with RNG variants.
   * Each event has: base values, classification, harmful flag, and a variants array.
   * rollEvent() picks a random variant and jitters the delta values by ±1.
   * Yellow (harmful+clearable) events have optional irrevChance (0-1) for RNG irreversibility.
   */
  const EVENT_DELTAS = {
    violation: {
      values: { violations: +5, conduct: -2, civic: -3, recovery: -1 }, classification: 'clearable', harmful: true, irrevChance: 0.08,
      mild: ['Jaywalking citation logged', 'Late filing on civic paperwork', 'Minor noise complaint registered', 'Parking violation in restricted zone'],
      harsh: ['Public disturbance with property damage', 'Verbal threats against civic officer', 'Unauthorized resource access — repeat offense', 'False declaration on civic filing under oath']
    },
    service: {
      values: { contribution: +4, civic: +2, endorsement: +1, violations: -1 }, classification: 'clearable', harmful: false,
      mild: ['Attended community cleanup event', 'Filed civic feedback report', 'Participated in district survey', 'Donated to public resource pool'],
      harsh: ['Led emergency evacuation response', 'Completed full infrastructure rebuild shift', 'Organized district-wide relief campaign', 'Youth mentorship cycle — 6-month program']
    },
    endorsement: {
      values: { endorsement: +3, conduct: +1, recovery: +1 }, classification: 'clearable', harmful: false,
      mild: ['Casual peer trust signal received', 'Neighbor filed positive reference', 'Workplace acknowledgment logged'],
      harsh: ['Cross-district commendation from leadership council', 'Multi-peer endorsement cluster registered', 'Unanimous workplace collective trust vote']
    },
    audit: {
      values: { civic: -4, competence: -1, violations: +3, endorsement: -1 }, classification: 'clearable', harmful: true, irrevChance: 0.05,
      mild: ['Minor documentation gap in audit', 'Credential renewal lapse — 3 days overdue', 'Marginal compliance score on routine check'],
      harsh: ['Critical regulatory inspection failure', 'Systematic credential falsification discovered', 'Multi-point compliance audit failure — flagged for review']
    },
    rehab: {
      values: { recovery: +4, violations: -2, conduct: +2 }, classification: 'clearable', harmful: false,
      mild: ['Attended behavioral awareness seminar', 'Completed anger management module', 'Submitted self-correction progress report'],
      harsh: ['Full supervised reintegration program completed', 'Structured 90-day rehabilitation cycle finished', 'Monitored recovery milestone — all metrics clear']
    },
    credential: {
      values: { competence: +4, contribution: +2, violations: -1, recovery: +1 }, classification: 'clearable', harmful: false,
      mild: ['Basic certification renewed', 'Standard competency reassessment passed', 'Routine skills verification cleared'],
      harsh: ['Advanced specialist qualification earned', 'Systems architecture certification achieved', 'Cross-domain technical mastery verified']
    },
    neglect: {
      values: { contribution: -4, competence: -2, civic: -1, endorsement: -1, violations: +2 }, classification: 'clearable', harmful: true, irrevChance: 0.1,
      mild: ['Single missed shift — no coverage arranged', 'Late submission on assigned deliverable', 'Below-threshold performance rating'],
      harsh: ['Sustained abandonment of critical infrastructure role', 'Chronic no-show pattern — 4th consecutive flag', 'Failure to maintain safety-critical system — damage resulted']
    },
    leadership: {
      values: { conduct: +3, endorsement: +2, civic: +1, violations: -1 }, classification: 'clearable', harmful: false,
      mild: ['Helped resolve minor neighbor dispute', 'Organized block meeting', 'Volunteered for district advisory input'],
      harsh: ['Crisis de-escalation prevented physical harm', 'Led district coordination through infrastructure failure', 'Civic mediation resolved multi-party conflict']
    },
    predatory: {
      values: { violations: +10, conduct: -6, civic: -5, endorsement: -4 }, classification: 'permanent', harmful: true, reassignment: '-2',
      mild: ['Aggravated assault recorded', 'Domestic violence pattern confirmed', 'Violent assault causing serious injury', 'Premeditated attack on civilian'],
      harsh: ['Armed robbery with weapon discharge', 'Stalking campaign — multiple victims identified', 'Kidnapping and unlawful detention', 'Attempted murder — victim survived', 'Coordinated gang violence — multiple casualties']
    },
    exploitation: {
      values: { violations: +8, conduct: -4, competence: -3, endorsement: -3 }, classification: 'permanent', harmful: true, reassignment: '-1',
      mild: ['Wage theft — single employer confirmed', 'Insurance fraud scheme traced', 'Identity fraud — single victim', 'Tax evasion scheme detected'],
      harsh: ['Systematic tenant exploitation ring uncovered', 'Labor trafficking operation identified', 'Multi-layer financial fraud network dismantled', 'Organized identity theft ring — dozens affected', 'Government contract fraud — public funds misappropriated']
    },
    trafficking: {
      values: { violations: +15, conduct: -8, civic: -8, endorsement: -6 }, classification: 'permanent', harmful: true, reassignment: '-3',
      mild: ['Human trafficking — single operation dismantled'],
      harsh: ['Cross-district trafficking network — systemic exploitation confirmed', 'Child trafficking ring uncovered']
    },
    capital: {
      values: { violations: +20, conduct: -10, civic: -10, endorsement: -5 }, classification: 'permanent', harmful: true, reassignment: '-3',
      mild: ['Murder committed — single victim'],
      harsh: ['Mass violence perpetrated', 'Act of terrorism carried out', 'Serial predation confirmed — multiple victims']
    }
  };

  /**
   * Rolls a score-aware variant for an event.
   * High STI (>60): picks from mild pool, tighter jitter (±0-1), lower irrev chance.
   * Low STI (<40): picks from harsh pool, wider jitter (±1-2), higher irrev chance.
   * Mid STI: random pool, standard ±1 jitter.
   */
  function rollEvent(eventKey, currentScore) {
    const base = EVENT_DELTAS[eventKey];
    if (!base) return null;
    const score = currentScore ?? 50;

    // Score-aware variant pool selection
    const useMild = score > 60 ? Math.random() < 0.8 : score > 40 ? Math.random() < 0.5 : Math.random() < 0.15;
    const pool = useMild ? base.mild : base.harsh;
    const variant = randItem(pool);
    const duration = randDuration();

    // Score-aware jitter: high STI → tighter (±0-1), low STI → wider (±1-2)
    const spread = score > 60 ? 1 : score > 40 ? 1 : 2;
    const jittered = {};
    Object.entries(base.values).forEach(([k, v]) => {
      if (v === 0) { jittered[k] = 0; return; }
      const j = randRange(v, spread);
      jittered[k] = v > 0 ? Math.max(1, j) : Math.min(-1, j);
    });

    // Score-aware irrev chance: low STI → higher chance
    const irrevMult = score > 60 ? 0.5 : score > 40 ? 1.0 : 2.0;
    const triggerIrrev = base.irrevChance ? Math.random() < (base.irrevChance * irrevMult) : false;

    return {
      label: variant,
      values: jittered,
      duration,
      classification: base.classification,
      harmful: base.harmful,
      reassignment: base.reassignment,
      triggerIrrev
    };
  }

  /**
   * Thresholds for the "coherence" readout.
   * Positive pressure = civic + contribution + conduct (the three behavioural pillars).
   * Named constants avoid magic numbers scattered through the render function.
   */
  const COHERENCE_HIGH = 40;
  const COHERENCE_MID  = 28;

  /**
   * Positive factor keys and maxes derived from CATEGORY_META.
   * Used by buildRandomProfile — if maxes change in CATEGORY_META,
   * the randomizer automatically picks up the new values.
   */
  const POS_FACTORS = Object.entries(CATEGORY_META)
    .filter(([key]) => key !== 'violations')
    .map(([key, [, max]]) => [key, max]);

  /**
   * Layer consequence definitions — triggered by sustained behavior within a layer.
   * Negative consequences escalate by layer depth. Positive consequences reward growth.
   */
  /**
   * Consequence pools. Entries can be strings (normal) or objects with
   * { text, terminal: true } to end the simulation permanently.
   */
  const CONSEQUENCES_NEGATIVE = {
    '0':  [
      'Formal warning issued by district authority',
      'Civic privilege review scheduled',
      'Trust Threshold Domain access suspended'
    ],
    '-1': [
      'Fined 500 credits for repeated noncompliance',
      'Community service order — 30 days mandatory',
      'Restricted to residential zone — transit privileges revoked',
      'Financial assets partially frozen pending review',
      { text: 'Sentenced to lifetime civic probation — permanent monitoring, no unsupervised movement', terminal: true }
    ],
    '-2': [
      'Placed in administrative detention — 90 days',
      'Confined to designated housing block',
      'All civic privileges permanently revoked',
      'Solitary confinement order — behavioral reset protocol',
      { text: 'Sentenced to permanent confinement — no release pathway exists', terminal: true }
    ],
    '-3': [
      'Vigilante retaliation reported — no system intervention',
      'Targeted by terminal-layer population — survived with injuries',
      'Resource access severed — survival on scavenged allocation only',
      { text: 'Found dead in housing block — cause undetermined. Simulation ended.', terminal: true },
      { text: 'Killed by vigilante group — system logged, no intervention. Simulation ended.', terminal: true }
    ]
  };

  const CONSEQUENCES_POSITIVE = {
    titles: [
      'Awarded District Merit Citation',
      'Promoted to Senior Civic Contributor',
      'Named Community Steward of the Quarter',
      'Received Meritboard Commendation',
      'Granted Trust Threshold Domain access',
      'Selected for District Leadership Council'
    ],
    elite: [
      'Nominated for Meritboard advisory role',
      'Granted Sanctuary evaluation candidacy',
      'Awarded Founders\u2019 Recognition — highest civic honor',
      'Invited to inter-district governance summit',
      { text: 'Appointed to Meritboard — supreme civic leadership attained. Simulation complete.', terminal: true },
      { text: 'Elected District Superintendent — highest public office achieved. Simulation complete.', terminal: true }
    ]
  };

  /**
   * Event sources that originate from within this module.
   * The global state-change listener ignores these to prevent re-entry
   * loops where a render triggers a state change that triggers another render.
   */
  const INTERNAL_SOURCES = new Set(['sti-sim', 'sti-event', 'profile', 'manual', 'reset', 'randomize']);

  // =========================
  // PURE HELPERS
  // =========================

  /**
   * Maps a numeric STI score to its layer descriptor.
   * Returns key, label, tone, and range string.
   * Note: this duplicates the threshold logic in vmssLayerForScore (script.js)
   * but returns a richer object with .tone — used only by this module.
   */
  function layerForScore(score) {
    if (score >= 85) return { key: '+1', label: '+1 Sanctuary',      tone: 'High-trust access unlocked',     range: '85\u2013100' };
    if (score >= 70) return { key: '0',  label: 'Main Layer (0)',    tone: 'Stable civic baseline',          range: '70\u201384'  };
    if (score >= 50) return { key: '-1', label: '-1 Noncompliance',  tone: 'Monitored trust deficit',        range: '50\u201369'  };
    if (score >= 30) return { key: '-2', label: '-2 Violent Offense',tone: 'Containment threshold engaged',  range: '30\u201349'  };
    return             { key: '-3', label: '-3 Terminal',             tone: 'Terminal trust collapse',        range: '0\u201329'   };
  }

  /**
   * Computes the STI score from a values object. Clamped to [0, 100].
   *
   * v17.6 asymmetric model — reflects the 10:1 penalty-to-recovery ratio
   * from Article II. Violations bite progressively harder via a convex
   * penalty curve (low violations are roughly 1:1, high violations scale
   * toward ~2.5x). Recovery has diminishing returns (first points worth
   * full value, later points worth ~40%). The net effect: trust is far
   * harder to rebuild than it is to lose, matching doctrinal intent
   * without making moderate profiles unplayable.
   *
   * Raw positive max ≈ 90 + 6.3 = 96.3 (all positives maxed, recovery diminished)
   * Raw penalty max  ≈ 38.7 (violations=20 through convex curve)
   * Effective range maps naturally to 0–100 after clamping.
   */
  function scoreModel(v) {
    // Positive factors — recovery has diminishing returns (sqrt curve, max still 10)
    const recoveryEffective = Math.sqrt(v.recovery / 10) * 10; // sqrt gives diminishing returns; max 10
    const rawPositive = v.civic + v.contribution + v.conduct + v.competence
                      + v.endorsement + recoveryEffective;

    // Violation penalty — convex curve: penalty = max * (v/max)^1.45
    // At 5/20: ~8.1 (1.6x). At 10/20: ~18.8 (1.9x). At 20/20: ~38.7 (1.9x).
    const vNorm = v.violations / 20;
    const rawPenalty = 38.7 * Math.pow(vNorm, 1.45);

    return Math.max(0, Math.min(100, Math.round(rawPositive - rawPenalty)));
  }

  /** Clamps all factor values to their valid ranges as defined in CATEGORY_META. */
  function clampValues(v) {
    const next = { ...v };
    Object.entries(CATEGORY_META).forEach(([key, [, max]]) => {
      next[key] = Math.max(0, Math.min(max, Number(next[key]) || 0));
    });
    return next;
  }

  /**
   * Generates up to 4 human-readable signal lines for the System Interpretation panel.
   * v17.6: doctrine-aware — references Articles XII-XV, XIX and accounts for
   * trajectory, event log classification, feedback loops, and 10:1 asymmetry.
   *
   * @param {number} score
   * @param {object} values - factor values
   * @param {string} eventLabel - most recent event label
   * @param {object} ctx - { trajectory, eventLog } from module state
   */
  function buildExplanation(score, values, eventLabel, ctx = {}) {
    const notes = [];
    const { trajectory = 'neutral', eventLog: log = [], isLocked: locked = false, assignedLayer: aLayer = '0' } = ctx;

    // Most recent event
    if (eventLabel) notes.push(eventLabel + '.');

    // Reassignment lock (Article XV one-way door)
    if (locked)
      notes.push(`<em><a href="charter.html#article-xv">Article XV</a>:</em> Punitive reassignment to Layer ${aLayer} is permanent. STI improvement serves quality of life here, not as a return mechanism.`);

    // Trajectory-aware signals (Article XV)
    if (trajectory === 'improving' && score < 70)
      notes.push('<em><a href="charter.html#article-xv">Article XV</a>:</em> Sustained improvement detected \u2014 trajectory credit applies. Clearable infractions eligible for removal.');
    if (trajectory === 'declining' && score >= 50)
      notes.push('<em><a href="charter.html#article-xv">Article XV</a>:</em> Declining trajectory \u2014 correction window still open within Main Layer.');
    if (trajectory === 'declining' && score < 50)
      notes.push('<em><a href="charter.html#article-xv">Article XV</a>:</em> Declining trajectory below civic trust baseline \u2014 pattern evaluation escalating.');

    // 10:1 asymmetry signal (Article II)
    if (values.recovery >= 7 && values.violations >= 8)
      notes.push('<em><a href="charter.html#article-ii">Article II</a>:</em> Recovery signals soften the descent but 10:1 ratio means prior harm compounds faster than repair.');

    // Clearable infraction callout (Article XV)
    const clearableCount = log.filter(e => e.classification === 'clearable' && e.delta < 0).length;
    const permanentCount = log.filter(e => e.classification === 'permanent').length;
    if (clearableCount >= 2 && trajectory !== 'declining')
      notes.push(`<em><a href="charter.html#article-xv">Article XV</a>:</em> ${clearableCount} clearable infractions on record \u2014 remediation would reset trajectory.`);
    if (permanentCount >= 1)
      notes.push(`<em><a href="charter.html#article-xv">Article XV</a>:</em> ${permanentCount} permanent flag${permanentCount > 1 ? 's' : ''} on record \u2014 cannot be cleared regardless of subsequent conduct.`);

    // Feedback loop detection (Article XIX)
    if (score < 40 && values.violations >= 10 && values.contribution <= 5 && values.endorsement <= 3)
      notes.push('<em><a href="charter.html#article-xix">Article XIX</a>:</em> Potential feedback loop \u2014 low score restricts trust-gated opportunities, limiting recovery pathways. System should provide correction channel.');

    // Non-deterministic evaluation reminder (Article XII)
    if (score < 30 || score >= 85)
      notes.push('<em><a href="charter.html#article-xii">Article XII</a>:</em> STI is one weighted input, not the sole determinant. Final placement requires multi-factor evaluation.');

    // Factor pattern signals
    if (values.violations >= 14)
      notes.push('Heavy violation load is overpowering positive inputs under asymmetric penalty curve.');
    if (values.civic >= 15 && values.conduct >= 12)
      notes.push('Compliance and public conduct are stabilizing the score.');
    if (values.contribution >= 16 && values.competence >= 12)
      notes.push('Productive contribution is boosting access and system confidence.');

    if (!notes.length)
      notes.push('This profile sits near the middle because strengths and liabilities are balancing out.');

    return notes.slice(0, 4);
  }

  /** Builds the event feed message describing the most recent score change. */
  function buildDeltaMessage(previousScore, nextScore, layer, eventLabel) {
    const delta     = nextScore - previousScore;
    const direction = delta > 0 ? 'rose' : delta < 0 ? 'fell' : 'held steady';
    const amount    = delta === 0 ? '' : ` by ${Math.abs(delta)} points`;
    const cause     = eventLabel ? ` after ${eventLabel.toLowerCase()}` : '';
    return `STI ${direction}${amount}${cause}. Current placement: ${layer.label}.`;
  }

  /** Briefly flashes an element using the vmss-flash CSS animation. */
  function pulseElement(element) {
    if (!element) return;
    element.classList.remove('vmss-flash');
    void element.offsetWidth; // force reflow to restart the animation
    element.classList.add('vmss-flash');
    setTimeout(() => element.classList.remove('vmss-flash'), 520);
  }

  // =========================
  // RANDOMIZER
  // =========================

  /**
   * Generates a random factor profile with a layer distribution proportional
   * to each band's STI width:
   *   ~30% in -3 Terminal     (0–29,  30-point band)
   *   ~20% in -2 Violent      (30–49, 20-point band)
   *   ~20% in -1 Noncompliance(50–69, 20-point band)
   *   ~15% in Main Layer (0)  (70–84, 15-point band)
   *   ~15% in +1 Sanctuary    (85–100,16-point band)
   *
   * Algorithm (score-first):
   *   1. Pick a target score uniformly from 0–100.
   *   2. Pick violations randomly within the range that allows hitting that score.
   *   3. Fill positive factors to sum to (target + violations), respecting each max.
   *
   * This guarantees the target score is always achievable given the generated
   * violations value, unlike naive uniform random which clusters around score ~40
   * and makes Sanctuary nearly unreachable.
   */
  function buildRandomProfile() {
    const target  = Math.floor(Math.random() * 101);
    const violMax = Math.min(20, 100 - target); // violations can't push score below 0
    const viol    = Math.floor(Math.random() * (violMax + 1));

    // Distribute (target + violations) across positive factors
    const next = {};
    let remaining = Math.min(target + viol, 100);

    POS_FACTORS.forEach(([key, max], i) => {
      // futureMax: maximum the remaining factors could absorb
      const futureMax = POS_FACTORS.slice(i + 1).reduce((s, [, m]) => s + m, 0);
      // lo: minimum this factor must take so remaining factors can cover the rest
      const lo  = Math.max(0, remaining - futureMax);
      const hi  = Math.min(max, remaining);
      const val = lo >= hi ? lo : lo + Math.floor(Math.random() * (hi - lo + 1));
      next[key] = val;
      remaining -= val;
    });

    next.violations = viol;
    return next;
  }

  // =========================
  // SIMULATOR INIT
  // =========================

  function initSimulator() {
    const root = document.getElementById('sti-console');
    if (!root) return; // console not present on this page

    // --- DOM refs --------------------------------------------------------
    const inputs       = Array.from(root.querySelectorAll('input[type="hidden"]'));
    const factorRows   = Array.from(root.querySelectorAll('.vmss-factor-row'));
    const scoreEl      = root.querySelector('[data-sti-score]');
    const layerEl      = root.querySelector('[data-sti-layer]');
    const toneEl       = root.querySelector('[data-sti-tone]');
    const reasoningEl  = root.querySelector('[data-sti-reasoning]');
    const liveRegion   = root.querySelector('[data-sti-live]');
    const gauge        = root.querySelector('[data-gauge-progress]');
    const layerSteps   = Array.from(root.querySelectorAll('.vmss-ladder-step'));
    const presetSelect  = root.querySelector('[data-preset-select]');
    const eventButtons  = Array.from(root.querySelectorAll('[data-sti-event]'));
    const profileName  = root.querySelector('[data-profile-name]');
    const overallShift = root.querySelector('[data-overall-shift]');
    const stability    = root.querySelector('[data-stability-band]');
    const eventFeed    = root.querySelector('[data-event-feed]');
    const randomizeBtn = root.querySelector('[data-randomize-sim]');
    const resetBtn     = root.querySelector('[data-reset-sim]');
    const resetTermBtn = root.querySelector('[data-reset-terminal]');

    const trajectoryEl   = root.querySelector('[data-trajectory]');
    const eventHistoryEl = root.querySelector('[data-event-history]');
    const axisPanel      = root.querySelector('[data-axis-panel]');
    const reversToggle   = root.querySelector('[data-reversibility-toggle]');
    const tallyPos       = root.querySelector('[data-tally-pos]');
    const tallyNeg       = root.querySelector('[data-tally-neg]');
    const tallyNet       = root.querySelector('[data-tally-net]');

    // SVG gauge setup
    const circumference = 2 * Math.PI * 47; // r=47 as defined in the SVG
    let lastLayerKey      = null; // tracks previous layer to detect transitions
    let currentEventLabel = '';   // label of the most recent event (used in explanations)
    let lastRenderedScore = null; // previous score — tracked in JS, not DOM, for reliable delta calc

    /** Trajectory state — tracks last 8 score deltas for Article XV trajectory evaluation. */
    let scoreHistory = [];
    const TRAJECTORY_WINDOW = 5; // evaluate direction from last 5 changes

    /** Event log — tracks last 10 discrete events with Article XV classification. */
    let eventLog = [];
    const EVENT_LOG_MAX = 10;

    /** Consequence state — tracks streaks and terminal outcomes. */
    let lastConsequence = '';
    let isTerminal = false; // true = simulation ended (death, imprisonment, or peak achievement)

    /** Cumulative day tallies — persist across eventLog shifts. */
    let totalPosDays = 0;
    let totalNegDays = 0;

    /**
     * Layer assignment state — decoupled from STI score per Articles XII/XIII.
     * Score informs but does not determine layer. Qualifying events trigger
     * punitive reassignment which is permanent (Art. XV one-way door).
     * Score-based phasing only operates between Main Layer (0) and +1 Sanctuary.
     */
    let assignedLayer = '0';  // starts at Main Layer
    let isLocked = false;     // true after punitive reassignment — cannot return

    /**
     * Resolves the effective layer from score and assignment state.
     * - If locked (punitive reassignment): layer is fixed at assignedLayer
     * - If not locked: phasing between 0 and +1 based on score threshold
     */
    function resolveLayer(score) {
      if (isLocked) return layerForScore(0); // use layerForScore just for the label/tone lookup
      // Score-based phasing between Main and Sanctuary only
      if (score >= 85) return layerForScore(85);
      return layerForScore(70); // Main Layer baseline
    }

    /** Returns the full layer descriptor for the current assignment state. */
    function getEffectiveLayer(score) {
      if (isLocked) {
        // Return the locked layer's descriptor
        const thresholds = { '+1': 90, '0': 75, '-1': 55, '-2': 35, '-3': 10 };
        return layerForScore(thresholds[assignedLayer] ?? 10);
      }
      // Not locked: phasing only between 0 and +1
      return score >= 85 ? layerForScore(90) : layerForScore(75);
    }

    if (gauge) {
      gauge.style.strokeDasharray  = `${circumference}`;
      gauge.style.strokeDashoffset = `${circumference}`; // starts at 0 (full circle hidden)
    }

    // --- Input helpers ---------------------------------------------------

    /** Read all slider values into a plain object keyed by input name. */
    const getValues = () =>
      inputs.reduce((acc, input) => (acc[input.name] = Number(input.value), acc), {});

    /** Write a values object back to the sliders. */
    const setValues = (values) =>
      inputs.forEach((input) => {
        if (values[input.name] !== undefined) input.value = String(values[input.name]);
      });

    /** Update factor bar fills and value labels from hidden input values. */
    const setInputVisuals = () =>
      factorRows.forEach((row) => {
        const key  = row.dataset.factor;
        const input = row.querySelector('input[type="hidden"]');
        if (!input) return;
        const val  = Number(input.value) || 0;
        const max  = Number(input.max) || 20;
        const fill = row.querySelector('[data-factor-fill]');
        const label = row.querySelector('[data-factor-val]');
        if (fill) fill.style.width = `${(val / max) * 100}%`;
        if (label) label.textContent = key === 'violations' ? `\u2212${val}/${max}` : `${val}/${max}`;
      });

    // --- Render cycle ----------------------------------------------------

    /**
     * render(sourceLabel, options) — the main update function.
     * Reads current slider values, computes the score, and updates every
     * visual element in the console: gauge, score number, layer label, tone,
     * factor bars, readout tiles, ladder steps, reasoning panel, event feed,
     * and the aria-live region for screen readers.
     *
     * @param {string} sourceLabel - Profile name shown in the readout tile
     * @param {object} options     - { source } passed through to VMSS.setState
     */
    const render = (sourceLabel, options = {}) => {
      const values        = clampValues(getValues());
      setValues(values);
      setInputVisuals();

      const score         = scoreModel(values);
      const layer         = getEffectiveLayer(score);
      const dashoffset    = circumference - (score / 100) * circumference;
      const posPressure   = values.civic + values.contribution + values.conduct;

      // Use module-level tracking for reliable delta calculation
      // (DOM dataset.currentValue lags behind during animations)
      const previousScore = lastRenderedScore !== null ? lastRenderedScore : score;

      // Score number — animated if vmssAnimateNumber is available
      if (scoreEl) window.vmssAnimateNumber
        ? window.vmssAnimateNumber(scoreEl, score, { duration: 460 })
        : (scoreEl.textContent = score);

      if (layerEl)      layerEl.textContent     = layer.label;
      if (toneEl)       toneEl.textContent       = `${layer.tone} \u2022 STI band ${layer.range}`;
      if (profileName)  profileName.textContent  = sourceLabel || 'Custom profile';
      if (overallShift) overallShift.textContent = score >= 70 ? 'Upward pressure' : score >= 50 ? 'Friction zone' : 'Downward pressure';
      if (stability)    stability.textContent    = posPressure >= COHERENCE_HIGH ? 'High coherence' : posPressure >= COHERENCE_MID ? 'Mixed coherence' : 'Low coherence';

      // Trajectory tracking (Article XV) — evaluate direction from recent score changes
      const delta = score - previousScore;
      if (delta !== 0) {
        scoreHistory.push(delta);
        if (scoreHistory.length > 8) scoreHistory.shift();
      }
      const recentDeltas = scoreHistory.slice(-TRAJECTORY_WINDOW);
      const posCount = recentDeltas.filter(d => d > 0).length;
      const negCount = recentDeltas.filter(d => d < 0).length;
      const trajectory = recentDeltas.length < 2 ? 'neutral'
                       : posCount >= 3 ? 'improving'
                       : negCount >= 3 ? 'declining'
                       : 'stable';
      const trajectoryLabels = {
        neutral:   ['—', 'Trajectory: Awaiting data'],
        improving: ['\u2191', 'Trajectory: Improving'],
        declining: ['\u2193', 'Trajectory: Declining'],
        stable:    ['\u2194', 'Trajectory: Stable']
      };
      if (trajectoryEl) {
        const [arrow, label] = trajectoryLabels[trajectory];
        trajectoryEl.innerHTML = `<span class="vmss-trajectory-arrow is-${trajectory}">${arrow}</span> ${label}`;
      }

      // Three-axis proportional response (Article XIV)
      // This IS the multi-factor evaluation — axes escalate as a warning,
      // and at 2-axis+ the system triggers pattern-based reassignment.
      const severity = values.violations >= 14 ? 'high'
                     : values.violations >= 7  ? 'moderate'
                     : 'low';

      const harmfulCount = eventLog.filter(e => e.harmful).length;
      const pattern = trajectory === 'declining' && harmfulCount >= 3 ? 'established'
                    : harmfulCount >= 2 || trajectory === 'declining' ? 'emerging'
                    : 'isolated';

      const irreversible = reversToggle?.checked || false;

      const axes = (severity === 'high' ? 1 : 0)
                 + (pattern !== 'isolated' ? 1 : 0)
                 + (irreversible ? 1 : 0);

      const responses = [
        'No elevated response',
        'Corrective intervention within current layer',
        'Formal multi-factor evaluation triggered \u2014 reassignment threshold reached',
        'Qualifying event for reassignment'
      ];

      // Pattern-based -1 reassignment (Art. XV accumulation path)
      // Path 1: All three axes active (severity + pattern + irreversible) via harmful event
      // Path 2: Extreme sustained refusal to correct — STI ≤ 5 with 6+ consecutive harmful events
      //         The pattern itself becomes evidence of irreversible civic failure (Art. XV)
      const isHarmfulEvent = options.source === 'sti-event' && options.harmful;
      const consecutiveHarmful = eventLog.length >= 6 && eventLog.slice(-6).every(e => e.harmful);
      const extremePattern = isHarmfulEvent && !isLocked && score <= 5 && consecutiveHarmful && severity === 'high';

      if (!isLocked && isHarmfulEvent && axes >= 3 && severity === 'high' && pattern === 'established' && irreversible) {
        assignedLayer = '-1';
        isLocked = true;
        currentEventLabel += ' \u2014 3-axis evaluation: pattern-based reassignment to -1 (Article XIV/XV)';
      } else if (extremePattern) {
        assignedLayer = '-1';
        isLocked = true;
        if (reversToggle) reversToggle.checked = true;
        currentEventLabel += ' \u2014 Sustained refusal to correct: pattern-based reassignment to -1 (Article XV)';
      }

      if (axisPanel) {
        axisPanel.innerHTML =
          `<div class="vmss-axis-row"><span class="vmss-axis-label">Severity</span><span class="vmss-axis-value is-${severity}">${severity}</span></div>` +
          `<div class="vmss-axis-row"><span class="vmss-axis-label">Pattern</span><span class="vmss-axis-value is-${pattern}">${pattern}</span></div>` +
          `<div class="vmss-axis-row"><span class="vmss-axis-label">Reversibility</span><span class="vmss-axis-value is-${irreversible ? 'irreversible' : 'reversible'}">${irreversible ? 'irreversible' : 'reversible'}</span></div>` +
          `<div class="vmss-axis-divider"></div>` +
          `<div class="vmss-axis-response is-level-${axes}"><strong>${axes}-axis:</strong> ${responses[axes]}</div>`;
      }

      // SVG gauge arc
      if (gauge) {
        gauge.style.strokeDashoffset = `${dashoffset}`;
        gauge.classList.toggle('is-strong', score >= 70); // stronger glow above Main Layer
      }

      // Highlight the current layer in the ladder
      layerSteps.forEach((step) => {
        step.classList.toggle('is-current', step.dataset.layer === layer.key);
        step.classList.toggle('is-locked', isLocked && step.dataset.layer === assignedLayer);
      }
      );

      // System interpretation — accumulates history (newest at top), capped at 20
      if (reasoningEl) {
        const newSignals = buildExplanation(score, values, currentEventLabel, { trajectory, eventLog, isLocked, assignedLayer })
          .map((line) => `<div class="vmss-insight-item"><strong>Signal:</strong> ${line}</div>`)
          .join('');

        // Layer consequences — check recent event streak for in-layer outcomes
        let consequenceHtml = '';

        // Best-outcome terminal: all positive factors maxed, violations at 0
        if (!isTerminal && values.violations === 0 &&
            values.civic >= 18 && values.contribution >= 18 && values.conduct >= 18 &&
            values.competence >= 18 && values.endorsement >= 9 && values.recovery >= 9) {
          const layerLabels = { '+1': '+1 Sanctuary', '0': 'Main Layer', '-1': '-1 Noncompliance', '-2': '-2 Violent Offense', '-3': '-3 Terminal' };
          const layerName = layerLabels[assignedLayer] || assignedLayer;
          const bestText = isLocked
            ? `Optimal civic profile achieved within ${layerName}. This is the best possible outcome for this layer. Simulation complete.`
            : 'Optimal civic profile achieved \u2014 all factors at peak, zero violations. Sanctuary-grade citizen. Simulation complete.';
          consequenceHtml = `<div class="vmss-insight-item vmss-consequence is-positive"><strong>Recognition:</strong> ${bestText} <span class="vmss-terminal-tag">\u2014 TERMINAL</span></div>`;
          isTerminal = true;
          root.classList.add('is-terminal');
        }

        if (eventLog.length >= 3 && !isTerminal) {
          const recent = eventLog.slice(-3);
          const allHarmful = recent.every(e => e.harmful);
          const allPositive = recent.every(e => !e.harmful);
          const streak5 = eventLog.length >= 5 && eventLog.slice(-5).every(e => !e.harmful);

          let picked = null;
          let type = '';
          if (allHarmful) {
            const pool = CONSEQUENCES_NEGATIVE[assignedLayer] || CONSEQUENCES_NEGATIVE['0'];
            picked = randItem(pool);
            type = 'negative';
          } else if (streak5 && score >= 85 && !isLocked) {
            // Elite recognition only at STI 85+ and not locked in a lower layer
            picked = randItem(CONSEQUENCES_POSITIVE.elite);
            type = 'positive';
          } else if (allPositive && score >= 85 && !isLocked) {
            // Title recognition only at STI 85+ and not locked
            picked = randItem(CONSEQUENCES_POSITIVE.titles);
            type = 'positive';
          } else if (allPositive && isLocked) {
            // Locked in lower layer: acknowledge improvement but no leadership
            picked = `Positive conduct noted within ${assignedLayer} \u2014 quality of life improving but layer assignment is permanent.`;
            type = 'positive';
          }

          if (picked) {
            const isObj = typeof picked === 'object';
            const text = isObj ? picked.text : picked;
            const terminal = isObj && picked.terminal;
            if (text !== lastConsequence) {
              lastConsequence = text;
              const label = type === 'negative' ? 'Consequence' : 'Recognition';
              const terminalTag = terminal ? ' <span class="vmss-terminal-tag">\u2014 TERMINAL</span>' : '';
              consequenceHtml = `<div class="vmss-insight-item vmss-consequence is-${type}"><strong>${label}:</strong> ${text}${terminalTag}</div>`;
              if (terminal) {
                isTerminal = true;
                root.classList.add('is-terminal');
              }
            }
          }
        }

        if (isTerminal && consequenceHtml) {
          // Terminal state: show only the terminal consequence, clear the rest
          reasoningEl.innerHTML = consequenceHtml;
        } else if (!isTerminal) {
          reasoningEl.insertAdjacentHTML('afterbegin', consequenceHtml + newSignals);
          while (reasoningEl.children.length > 30) reasoningEl.removeChild(reasoningEl.lastChild);
        }
      }

      // Day tally — cumulative positive vs negative days (demonstrates 10:1 asymmetry)
      if (tallyPos && tallyNeg && tallyNet) {
        if (totalPosDays === 0 && totalNegDays === 0) {
          tallyPos.textContent = tallyNeg.textContent = tallyNet.textContent = '\u2014';
          tallyPos.className = tallyNeg.className = tallyNet.className = 'vmss-tally-value';
        } else {
          const net = totalPosDays - totalNegDays;
          tallyPos.textContent = `+${totalPosDays}d`;
          tallyPos.className = 'vmss-tally-value is-positive';
          tallyNeg.textContent = `\u2212${totalNegDays}d`;
          tallyNeg.className = 'vmss-tally-value is-negative';
          tallyNet.textContent = (net >= 0 ? `+${net}d` : `\u2212${Math.abs(net)}d`);
          tallyNet.className = `vmss-tally-value ${net >= 0 ? 'is-positive' : 'is-negative'}`;
        }
      }

      // Factor bars are updated by setInputVisuals() above (merged input + display)

      // Event feed and aria-live announcement
      const layerChanged = lastLayerKey && lastLayerKey !== layer.key;
      const feedMsg = layerChanged
        ? `Layer transition: ${layer.label}`
        : buildDeltaMessage(previousScore, score, layer, currentEventLabel);

      if (eventFeed)  eventFeed.textContent  = feedMsg;
      if (liveRegion) liveRegion.textContent = layerChanged
        ? `Layer transition: now in ${layer.label}. STI ${score}.`
        : `STI ${score}. ${layer.label}.`;

      // Flash score card on layer transition
      if (layerChanged) pulseElement(root.querySelector('.vmss-dash-score'));
      lastLayerKey = layer.key;

      lastRenderedScore = score;

      // Push to global VMSS state so HUD and ring map stay in sync
      if (window.VMSS) {
        window.VMSS.setState({
          stiScore:      score,
          selectedLayer: layer.key,
          profile:       sourceLabel || 'Custom profile',
          tone:          layer.tone,
          lastEvent:     currentEventLabel || 'Manual slider adjustment',
          values
        }, { source: options.source || 'sti-sim' });
      }
    };

    // --- Event actions ---------------------------------------------------

    /** Renders event history as horizontal chips in the event strip. */
    const renderEventHistory = () => {
      if (!eventHistoryEl) return;
      if (!eventLog.length) {
        eventHistoryEl.innerHTML = '<span class="vmss-event-empty">No events recorded yet.</span>';
        return;
      }
      eventHistoryEl.innerHTML = eventLog.map((entry) => {
        const short = entry.label.length > 24 ? entry.label.slice(0, 22) + '\u2026' : entry.label;
        const deltaStr = entry.delta > 0 ? `+${entry.delta}` : String(entry.delta);
        const dur = entry.duration ? ` \u00b7 ${entry.duration}` : '';
        return `<span class="vmss-event-chip is-${entry.classification}" title="${entry.label}${dur} (${entry.classification})">` +
          `<span>${short}</span>` +
          `<span class="vmss-event-delta ${entry.delta >= 0 ? 'is-positive' : 'is-negative'}">${deltaStr}${dur}</span>` +
        `</span>`;
      }).reverse().join('');
    };

    /** Rolls an RNG event variant, applies its deltas, and re-renders. */
    const applyEvent = (eventKey) => {
      if (isTerminal) return; // simulation ended — no further events
      const prevScore = lastRenderedScore !== null ? lastRenderedScore : scoreModel(clampValues(getValues()));
      const rolled = rollEvent(eventKey, prevScore);
      if (!rolled) return;
      const values = getValues();
      const next   = clampValues(
        Object.fromEntries(Object.keys(values).map((key) => [key, values[key] + (rolled.values[key] || 0)]))
      );
      setValues(next);
      const newScore = scoreModel(next);
      currentEventLabel = `${rolled.label} (${rolled.duration})`;

      // Push to event log + accumulate day tally
      const eventDays = parseDays(rolled.duration);
      if (rolled.harmful) totalNegDays += eventDays;
      else totalPosDays += eventDays;

      eventLog.push({
        label: rolled.label,
        classification: rolled.classification,
        delta: newScore - prevScore,
        score: newScore,
        harmful: rolled.harmful,
        duration: rolled.duration
      });
      if (eventLog.length > EVENT_LOG_MAX) eventLog.shift();

      // Permanent events automatically flag irreversible harm (Article XIV)
      if (rolled.classification === 'permanent' && reversToggle) reversToggle.checked = true;

      // Yellow harmful events: RNG chance of triggering irreversible harm
      if (rolled.triggerIrrev && reversToggle) {
        reversToggle.checked = true;
        currentEventLabel += ' \u2014 irreversible harm flagged';
      }

      // Punitive reassignment — qualifying event locks the layer
      if (rolled.reassignment) {
        const layerOrder = ['+1', '0', '-1', '-2', '-3'];
        const currentIdx = layerOrder.indexOf(assignedLayer);
        const targetIdx  = layerOrder.indexOf(rolled.reassignment);
        if (targetIdx > currentIdx) {
          assignedLayer = rolled.reassignment;
          isLocked = true;
        }
      }

      render('Event-driven profile', { source: 'sti-event', harmful: rolled.harmful });
      renderEventHistory();
    };

    /**
     * Generates a random profile via buildRandomProfile() and renders it.
     * The aria-live announcement uses the pre-computed score rather than
     * reading scoreEl.textContent, which still shows the previous value
     * while the number animation is in flight.
     */
    const randomize = () => {
      const next = buildRandomProfile();
      setValues(next);
      currentEventLabel = 'Random profile generated';
      scoreHistory = [];
      lastRenderedScore = null;
      eventLog = [];
      assignedLayer = '0';
      isLocked = false;
      if (reversToggle) reversToggle.checked = false;
      if (reasoningEl) reasoningEl.innerHTML = '';
      isTerminal = false;
      lastConsequence = '';
      totalPosDays = 0;
      totalNegDays = 0;
      root.classList.remove('is-terminal');
      const computedScore = scoreModel(next);
      const computedLayer = getEffectiveLayer(computedScore);
      render('Random profile', { source: 'randomize' });
      renderEventHistory();
      if (liveRegion) liveRegion.textContent =
        `Random profile generated. STI score ${computedScore}, placing in ${computedLayer.label}.`;
    };

    const resetToDefaults = () => {
      const defaults = { civic:11, contribution:11, conduct:8, competence:8, endorsement:6, recovery:5, violations:6 };
      setValues(defaults);
      currentEventLabel = 'Baseline loaded';
      scoreHistory = [];
      lastRenderedScore = null;
      eventLog = [];
      assignedLayer = '0';
      isLocked = false;
      if (reversToggle) reversToggle.checked = false;
      if (reasoningEl) reasoningEl.innerHTML = '';
      isTerminal = false;
      lastConsequence = '';
      totalPosDays = 0;
      totalNegDays = 0;
      root.classList.remove('is-terminal');
      render('Balanced baseline', { source: 'reset' });
      renderEventHistory();
    };

    /** Adjusts a single factor by delta, clamps, and re-renders. */
    const stepFactor = (name, delta) => {
      const input = inputs.find(i => i.name === name);
      if (!input) return;
      const max = Number(input.max) || 20;
      input.value = String(Math.max(0, Math.min(max, Number(input.value) + delta)));
      currentEventLabel = 'Manual factor adjustment';
      render('Custom profile', { source: 'manual' });
    };

    /** Sets a factor to a value derived from click position on bar track. */
    const setFactorFromClick = (name, track, clientX) => {
      const input = inputs.find(i => i.name === name);
      if (!input) return;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const max = Number(input.max) || 20;
      input.value = String(Math.round(ratio * max));
      currentEventLabel = 'Manual factor adjustment';
      render('Custom profile', { source: 'manual' });
    };

    // --- Bind listeners --------------------------------------------------

    if (randomizeBtn) randomizeBtn.addEventListener('click', randomize);
    if (resetBtn)     resetBtn.addEventListener('click', resetToDefaults);
    if (resetTermBtn) resetTermBtn.addEventListener('click', resetToDefaults);
    if (reversToggle) reversToggle.addEventListener('change', () => render('Custom profile', { source: 'manual' }));

    // Preset dropdown
    if (presetSelect) presetSelect.addEventListener('change', () => {
      const val = presetSelect.value;
      if (val === 'reset') { resetToDefaults(); }
      else if (PROFILES[val]) {
        setValues(PROFILES[val]);
        currentEventLabel = 'Profile selected';
        scoreHistory = [];
        lastRenderedScore = null;
        eventLog = [];
        assignedLayer = '0';
        isLocked = false;
        if (reversToggle) reversToggle.checked = false;
        render(presetSelect.options[presetSelect.selectedIndex].text, { source: 'profile' });
        renderEventHistory();
      }
      presetSelect.selectedIndex = 0; // reset to placeholder
    });

    // Event pill buttons
    eventButtons.forEach((btn) =>
      btn.addEventListener('click', () => applyEvent(btn.dataset.stiEvent))
    );

    // Stepper buttons (+/−)
    factorRows.forEach((row) => {
      const name = row.dataset.factor;
      row.querySelectorAll('.vmss-step-btn').forEach((btn) => {
        btn.addEventListener('click', () => stepFactor(name, Number(btn.dataset.step)));
      });
      // Click-on-bar-track to set value
      const track = row.querySelector('[data-factor-track]');
      if (track) track.addEventListener('click', (e) => setFactorFromClick(name, track, e.clientX));
    });

    // The STI console is the primary input device — ignore all external state changes.
    // Other modules (HUD, diagram, layer echo) read from VMSS global state but
    // should never push state back into the console.

    // --- Initial render --------------------------------------------------

    // Restore from global state if it exists (e.g. user visited simulation before)
    // Filter out diagram focus events — they're not STI console events
    const initial = window.VMSS?.getState?.();
    if (initial?.values) setValues(initial.values);
    const initialEvent = initial?.lastEvent || '';
    currentEventLabel = initialEvent.toLowerCase().includes('focused') ? 'Baseline loaded' : (initialEvent || 'Baseline loaded');
    render(initial?.profile || 'Balanced baseline', { source: 'initial' });
    // Start with a blank interpretation panel — signals populate on first interaction
    if (reasoningEl) reasoningEl.innerHTML = '';
  }

  document.addEventListener('DOMContentLoaded', initSimulator);

})();
