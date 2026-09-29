/**
 * sti-sim.js — the Trust Console on simulations.html (#sti-console).
 *
 * One simulated citizen, one act at a time. Every act travels the published
 * justice flow (failsafe → detection → classification) and then takes one of
 * the two outcome paths the implant ledger keeps apart:
 *
 *   Social consequence path — track 1, the STI score. Moves trust, gates
 *     trust-dependent access, and has exactly one placement effect: Sanctuary
 *     phasing, a condition that lapses below 85 (Charter VII, XII, XIII;
 *     Whitepaper §6.5).
 *   Criminal escalation path — track 2, the criminal record log. Qualifying
 *     acts go to enforcement and review, and reassignment follows the act's
 *     classification, never the score (Charter I, II, XII–XV; Whitepaper §5.4).
 *
 * The real STI formula is proprietary, classified and dynamic (Charter II).
 * The numbers here are illustrative; the model reproduces the formula's
 * published properties, not its weights:
 *   - 10:1 penalty-to-recovery: a point lost costs one unit of harm, a point
 *     regained costs ten units of conduct credit (Charter II, §5.3).
 *   - trajectory credit and penalty (Charter XV, §6.2).
 *   - public signals amplify an existing trajectory and never create one (§5.6).
 *   - in −3 the STI and public ledger keep running; only the institutional
 *     response is withdrawn (Charter II, XXV; Whitepaper §4.2, §14.3).
 *
 * Two views share one session: Simple (default) shows the fork with one
 * sentence per path; Full adds stages, axes, timeline, ledger and the
 * can/cannot lists. The choice is a per-viewer preference (MODE_KEY).
 *
 * The console writes the citizen's summary to window.VMSS (placement, stiScore,
 * record, lastEvent) for the HUD and the layer map; it never reads placement
 * back from them. Its own session (ledger, timeline) lives in localStorage
 * under SESSION_KEY.
 */

(function () {

  // =========================
  // RINGS
  // =========================

  const ORDER = ['+1', '0', '-1', '-2', '-3'];
  const RING = {
    '+1': { label: '+1 Sanctuary',       tone: 'p1', colour: '#e9bb72' },
    '0':  { label: 'Main Layer (0)',     tone: 'z',  colour: '#a8c9d6' },
    '-1': { label: '-1 Noncompliance',   tone: 'm1', colour: '#f6a653' },
    '-2': { label: '-2 Violent Offense', tone: 'm2', colour: '#e87575' },
    '-3': { label: '-3 Terminal',        tone: 'm3', colour: '#c24b5a' }
  };
  const deeper = (a, b) => ORDER.indexOf(b) > ORDER.indexOf(a);

  const SANCTUARY_FLOOR = 85;   // Charter II, VII; Whitepaper §5.9
  const VISIBILITY_FLAG = 40;   // Whitepaper §5.2
  const CREDIT_PER_POINT = 10;  // Charter II 10:1, expressed as conduct credit per point regained
  const SESSION_KEY = 'vmss_console_v2';

  // =========================
  // STARTING POINTS
  // =========================

  /* Starting STI values are illustrative except Main (new entrants typically
     arrive at 70–84, Whitepaper §4.2) and Sanctuary (the 85 floor). */
  const STARTS = {
    '0':  { sti: 76, punitive: false, profile: 'New entrant',
            line: 'Arrived in Main Layer. New entrants typically start between 70 and 84.' },
    '+1': { sti: 92, punitive: false, profile: 'Sanctuary resident',
            line: 'Lives in Sanctuary, held there by a sustained record above the 85 floor.' },
    '-1': { sti: 41, punitive: true, profile: 'Reassigned resident',
            line: 'Reassigned to −1 for fraud at meaningful scale. The placement is permanent.',
            record: { label: 'Fraud at meaningful scale', status: 'record' } },
    '-2': { sti: 22, punitive: true, profile: 'Reassigned resident',
            line: 'Reassigned to −2 for predatory violence. The placement is permanent.',
            record: { label: 'Predatory violence', status: 'permanent' } },
    '-3': { sti: 8, punitive: true, profile: 'Terminal resident',
            line: 'Reassigned to −3 for a killing. No revival and no institution in daily life; the public ledger travels with every resident.',
            record: { label: 'Killing', status: 'permanent' } }
  };

  // =========================
  // ACTS
  // =========================

  /* credits: conduct credit earned (10 credits = 1 point). points: harm units
     (1 unit = 1 point lost). years: simulated time the act spans. */
  const ACTS = {
    steady:    { name: 'A steady year',       credits: 10, years: 1 },
    service:   { name: 'Civic service',       credits: 12, years: 0.25 },
    crisis:    { name: 'Crisis response',     credits: 15, years: 0.05 },
    endorse:   { name: 'Peer endorsements',   credits: 6,  years: 0.05 },
    remediate: { name: 'Remediation',         years: 0.1 },
    infraction:{ name: 'Minor infraction',    points: 2,  years: 0.02, clearable: true, tier: 'private' },
    harass:    { name: 'Harassment',          points: 4,  years: 0.02, clearable: true, tier: 'private' },
    breach:    { name: 'Major trust breach',  points: 17, years: 0.02, tier: 'public' },
    dui:       { name: 'Impaired driving',    points: 12, years: 0.02, dest: '-1', named: true },
    assault:   { name: 'Assault',             points: 14, years: 0.02, dest: '-1', named: true, violent: true },
    fraud:     { name: 'Fraud at scale',      points: 16, years: 0.02, dest: '-1', named: true },
    predatory: { name: 'Predatory violence',  points: 30, years: 0.02, dest: '-2', violent: true, permanent: true },
    killing:   { name: 'Killing',             points: 40, years: 0.02, dest: '-3', violent: true, permanent: true },
    ascend:    { name: 'Sanctuary residency', years: 0.05 }
  };

  const C = {
    II:   ['Article II', 'charter.html#article-ii'],
    I:    ['Article I', 'charter.html#article-i'],
    VI:   ['Article VI', 'charter.html#article-vi'],
    VII:  ['Article VII', 'charter.html#article-vii'],
    IX:   ['Article IX', 'charter.html#article-ix'],
    XII:  ['Article XII', 'charter.html#article-xii'],
    XIII: ['Article XIII', 'charter.html#article-xiii'],
    XIV:  ['Article XIV', 'charter.html#article-xiv'],
    XV:   ['Article XV', 'charter.html#article-xv'],
    XXV:  ['Article XXV', 'charter.html#article-xxv'],
    XIX:  ['Article XIX', 'charter.html#article-xix'],
    wp: (s) => [`Whitepaper ${s}`, 'whitepaper.html'],
    dossier: (k) => [`${k} dossier`, `layer-${k.replace('−', '-')}.html`],
    threshold: ['The Threshold', 'simulations.html#sim-content-12']
  };

  // =========================
  // PURE HELPERS
  // =========================

  const round1 = (n) => Math.round(n * 10) / 10;
  const clampSti = (n) => Math.max(0, Math.min(100, round1(n)));
  const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(1));
  const signed = (n) => (n > 0 ? `+${fmt(n)}` : n < 0 ? `−${fmt(Math.abs(n))}` : '0');
  const minus = (s) => String(s).replace('-', '−');
  const ringName = (k) => minus(RING[k].label);

  function freshSession(ring) {
    const start = STARTS[ring];
    const s = {
      ring, punitive: start.punitive, sti: start.sti, year: 0,
      profile: start.profile, ledger: [], history: [], recent: [],
      warned: false, warnBase: 0, credentialed: ring === '+1', seq: 0
    };
    if (start.record) {
      s.ledger.push({ id: s.seq++, year: 0, label: start.record.label, track: 2, tier: 'public', status: start.record.status, delta: null });
    }
    s.history.push({ year: 0, sti: s.sti, ring });
    return s;
  }

  /* Session restore reads localStorage — outside input. Anything that does not
     match the shape this file writes is dropped and a fresh session starts. */
  function loadSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      const okSti = (v) => typeof v === 'number' && v >= 0 && v <= 100;
      if (!s || !RING[s.ring] || !okSti(s.sti) || typeof s.year !== 'number'
          || !Array.isArray(s.ledger) || !Array.isArray(s.history) || !Array.isArray(s.recent)) return null;
      s.ledger = s.ledger.filter((e) => e && typeof e.label === 'string' && (e.track === 1 || e.track === 2)).slice(-60);
      s.history = s.history.filter((h) => h && typeof h.year === 'number' && okSti(h.sti) && RING[h.ring]).slice(-400);
      if (!s.history.length) return null;
      s.seq = s.ledger.reduce((m, e) => Math.max(m, Number(e.id) || 0), 0) + 1;
      return s;
    } catch (e) {
      return null;
    }
  }

  function saveSession(s) {
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) { /* private mode: session just won't persist */ }
  }

  const activeClearable = (s) => s.ledger.filter((e) => e.clearable && e.status === 'active');
  const trackTwo = (s) => s.ledger.filter((e) => e.track === 2);

  function trajectory(s) {
    const last = s.recent.slice(-3);
    if (last.length < 2) return 'forming';
    if (last.filter((x) => x === '-').length >= 2) return 'declining';
    if (last.length === 3 && last.every((x) => x === '+')) return 'improving';
    return 'mixed';
  }

  /* The score is already a trajectory-weighted record (Whitepaper §5.11), and
     the threshold is the layer's qualifying condition (§5.9): at 85 or above a
     non-punitive citizen is eligible, including straight after a phase-back.
     Moving in stays a choice (elective residency, +1 dossier). */
  function isEligible(s) {
    return !s.punitive && s.sti >= SANCTUARY_FLOOR;
  }

  function recordSummary(s) {
    const t2 = trackTwo(s);
    const perm = t2.find((e) => e.status === 'permanent');
    if (perm) return `Permanent flag: ${perm.label}`;
    if (t2.length) return `On record: ${t2[t2.length - 1].label}`;
    const open = activeClearable(s).length;
    if (s.warned) return `Pattern warning · ${open} open`;
    if (open) return `${open} clearable open`;
    return 'Clean';
  }

  function sanctuaryStanding(s) {
    if (s.punitive) return ['Closed', 'Punitive placement ends the upward path (Article XV).'];
    if (s.ring === '+1') return ['Resident', `Held while STI stays at ${SANCTUARY_FLOOR}+ and no high-impact breach occurs.`];
    if (s.ring !== '0') return ['Not applicable', 'Elective and voluntary residents keep their origin standing.'];
    if (isEligible(s)) return ['Eligible', 'Credentialed. Taking up residency is a choice; many stay in Main.'];
    return ['Below the floor', `Eligibility opens at an STI of ${SANCTUARY_FLOOR}.`];
  }

  // =========================
  // OUTCOMES
  // =========================

  /* An outcome is plain data the renderer paints. Lanes: state is
     'lit' (the path this act took), 'side' (recorded here as a side effect),
     'watch' (under evaluation) or 'off'. */
  function blankOutcome(act) {
    return {
      act, title: '', line: '',
      failsafe: '', detect: '', axes: null, classify: '',
      social:   { state: 'off', reason: '', rows: {} },
      criminal: { state: 'off', reason: '', rows: {} },
      destTone: null, cites: [], announce: ''
    };
  }

  const detectLine = (ring) => ({
    '+1': 'Implant telemetry and AR context log it in real time.',
    '0':  'Implant telemetry and AR context log it in real time.',
    '-1': 'Logging-only AI tracking records it; drone response is slower here.',
    '-2': 'The implant logs it. No routine drone protection in −2.',
    '-3': 'No AI enforcement or drone patrol. The implant ledger still records what the resident\'s implant captures.'
  })[ring];

  /* Applies a harm: registers the drop with the trajectory penalty and
     returns the numbers the lanes report. */
  function applyHarm(s, units) {
    const traj = trajectory(s);
    const mult = traj === 'declining' ? 1.25 : 1;
    const before = s.sti;
    s.sti = clampSti(s.sti - units * mult);
    s.recent.push('-');
    return { before, delta: round1(s.sti - before), compounded: mult > 1 };
  }

  function applyCredit(s, credits) {
    const traj = trajectory(s);
    const mult = traj === 'improving' ? 1.25 : 1;
    const before = s.sti;
    s.sti = clampSti(s.sti + (credits * mult) / CREDIT_PER_POINT);
    s.recent.push('+');
    return { before, delta: round1(s.sti - before), boosted: mult > 1 };
  }

  function rebuildLine(points) {
    const steadyYears = Math.ceil(points);
    const serviceYears = Math.max(1, Math.ceil(points * CREDIT_PER_POINT / 48));
    return `${fmt(round1(points))} points lost at once need ${fmt(round1(points * CREDIT_PER_POINT))} units of conduct to rebuild: about ${steadyYears} steady year${steadyYears === 1 ? '' : 's'}, or ${serviceYears} with sustained service.`;
  }

  function addLedger(s, entry) {
    s.ledger.push({ id: s.seq++, year: round1(s.year), ...entry });
  }

  function phaseBackIfDue(s, o, cause) {
    if (s.ring !== '+1' || s.punitive) return false;
    if (cause !== 'breach' && s.sti >= SANCTUARY_FLOOR) return false;
    s.ring = '0';
    s.credentialed = false;
    o.social.rows.placement = cause === 'breach'
      ? 'Phased back to Main: a high-impact trust violation ends Sanctuary residency. Condition-based, not punitive.'
      : `Phased back to Main: STI fell below the ${SANCTUARY_FLOOR} floor. Condition-based, not punitive; ascension can be re-earned.`;
    o.phased = true;
    o.cites.push(C.VII, C.XII, C.wp('§6.5'));
    return true;
  }

  // ----- positive conduct -----

  function conductOutcome(s, key) {
    const act = ACTS[key];
    const o = blankOutcome(key);
    o.title = act.name;
    o.failsafe = 'Nothing to stop: no harm threshold was approached.';
    o.detect = 'The ledger records outwardly expressed conduct; thoughts never enter it.';
    o.classify = 'Positive conduct. The recovery dimension reads it as trajectory.';
    o.criminal.reason = 'Nothing to evaluate. The criminal record track takes only qualifying acts.';
    s.year = round1(s.year + act.years);

    o.line = {
      steady: 'A year of ordinary, non-harmful conduct: work, care, obligations kept.',
      service: 'A season of measurable contribution to the district.',
      crisis: 'Stayed and helped when an emergency hit the block.',
      endorse: 'Neighbours and colleagues signal approval of visible conduct.'
    }[key];

    if (key === 'endorse' && trajectory(s) !== 'improving') {
      o.social.state = 'lit';
      o.social.rows = {
        ledger: 'Signals received.',
        score: 'No movement.',
        fallout: 'Public signals only speed up what the behavioural record already shows.',
        recovery: 'Build a positive trajectory first; endorsements then accelerate it.',
        placement: 'None.'
      };
      o.cites.push(C.wp('§5.6'));
      s.recent.push('0');
      o.announce = 'Peer endorsements. No movement: public signals amplify a trajectory but never create one.';
      return o;
    }

    const r = applyCredit(s, act.credits);
    o.social.state = 'lit';
    o.social.rows = {
      ledger: 'Positive record, visible to peers.',
      score: `${signed(r.delta)} (${Math.round(r.before)} → ${Math.round(s.sti)})${r.boosted ? ' · trajectory credit applied' : ''}`,
      fallout: key === 'endorse' ? 'Endorsements accelerate a rise the conduct already produced.' : 'Trust-dependent access widens gradually.',
      recovery: `${act.credits} units of conduct${r.boosted ? ' plus trajectory credit' : ''} buy ${fmt(round1(r.delta))} point${r.delta === 1 ? '' : 's'}: rebuilding runs at a tenth of the speed of loss.`,
      placement: s.ring === '-3'
        ? 'Standing inside −3 improves: market associations, cooperatives and compounds read the public ledger. It is not a way out.'
        : s.ring === '-1' || s.ring === '-2'
        ? 'Local standing improves with districts, cooperatives and private domains. It is not a way back up.'
        : 'None. STI moves trust, not rings.'
    };
    o.cites.push(C.II, C.XV);
    if (key === 'endorse') o.cites.push(C.wp('§5.6'));
    if (s.punitive) o.cites.push(C.XV);
    if (s.ring === '-3') o.cites.push(C.XXV, C.dossier('−3'));

    // Trajectory credit clears the oldest open clearable item (Whitepaper §6.2).
    const open = activeClearable(s);
    if (trajectory(s) === 'improving' && open.length && key !== 'endorse') {
      open[0].status = 'cleared';
      o.social.rows.ledger = `Trajectory credit: "${open[0].label}" leaves the active record (the history keeps it).`;
      if (!activeClearable(s).length) s.warned = false;
      o.cites.push(C.wp('§6.2'));
    }
    o.announce = `${act.name}. STI ${signed(r.delta)}, now ${Math.round(s.sti)}.`;
    return o;
  }

  function remediateOutcome(s) {
    const o = blankOutcome('remediate');
    const open = activeClearable(s);
    s.year = round1(s.year + ACTS.remediate.years);
    open.forEach((e) => { e.status = 'cleared'; });
    const wasWarned = s.warned;
    s.warned = false;
    s.recent.push('+');
    o.title = 'Remediation';
    o.line = `Fines paid and conduct corrected on ${open.length} open item${open.length === 1 ? '' : 's'}.`;
    o.failsafe = 'Nothing to stop.';
    o.detect = 'The ledger records the corrective signal.';
    o.classify = 'Correction. Clearing the record is not a loophole; it is the behaviour the system exists to reward.';
    o.social.state = 'lit';
    o.social.rows = {
      ledger: 'Items leave the active profile; the historical ledger keeps them.',
      score: 'Unchanged. Remediation clears the record; conduct rebuilds the score.',
      fallout: 'Trust-gated access no longer reads the cleared items.',
      recovery: 'Correction resets the trajectory.',
      placement: 'None.'
    };
    o.criminal.reason = wasWarned
      ? 'Pattern evaluation stands down: the correction opportunity was taken.'
      : 'Nothing to evaluate.';
    if (wasWarned) o.criminal.state = 'watch';
    o.cites.push(C.XV, C.wp('§6.2–6.3'));
    o.announce = `Remediation. ${open.length} item${open.length === 1 ? '' : 's'} cleared; trajectory reset.`;
    return o;
  }

  function ascendOutcome(s) {
    const o = blankOutcome('ascend');
    s.year = round1(s.year + ACTS.ascend.years);
    s.ring = '+1';
    s.credentialed = true;
    o.title = 'Took up Sanctuary residency';
    o.line = 'Eligible, and chose to move. Many eligible residents stay in Main by choice.';
    o.failsafe = 'Not applicable.';
    o.detect = `Eligibility read from the STI: ${Math.round(s.sti)}, at or above the ${SANCTUARY_FLOOR} floor.`;
    o.classify = 'Phasing: the STI-driven, reversible movement between Main and Sanctuary.';
    o.social.state = 'lit';
    o.social.rows = {
      ledger: 'No entry. Moving is not conduct.',
      score: `Unchanged at ${Math.round(s.sti)}.`,
      fallout: 'Pre-intervention now applies: harmful acts are halted before they complete. The implant is mandatory here.',
      recovery: 'Residency has to be kept up: it lasts only while the condition holds.',
      placement: `Moved to +1 Sanctuary. Below ${SANCTUARY_FLOOR}, or after a high-impact breach, the citizen phases back.`
    };
    o.criminal.reason = 'Nothing to evaluate.';
    o.destTone = RING['+1'].tone;
    o.cites.push(C.VII, C.wp('§4.2'), C.dossier('+1'));
    o.announce = 'Moved to +1 Sanctuary through phasing.';
    return o;
  }

  // ----- social breaches -----

  function socialOutcome(s, key) {
    const act = ACTS[key];
    const o = blankOutcome(key);
    const lines = {
      infraction: 'Logged at 94 km/h in a 60 zone. No one was hurt.',
      harass: 'Repeated demeaning messages to a colleague. No law broken.',
      breach: 'Sexual contact outside a registered exclusive partnership. No law broken.'
    };
    o.title = act.name;
    o.line = lines[key];
    o.failsafe = 'Not engaged: no harm threshold is approached.';
    o.detect = detectLine(s.ring);
    const repeated = s.ledger.some((e) => e.kind === key && e.status === 'active');
    o.axes = { severity: key === 'breach' ? 'moderate' : 'low', pattern: repeated ? 'repeated' : 'isolated', reversibility: 'reversible' };
    o.cites.push(C.XIV);
    s.year = round1(s.year + act.years);

    o.classify = key === 'breach'
      ? 'Major non-criminal breach: serious enough for real consequence, not for enforcement.'
      : 'Minor, clearable. Correction happens inside the ring.';
    const r = applyHarm(s, act.points);
    addLedger(s, { label: act.name, kind: key, track: 1, tier: act.tier, status: act.clearable ? 'active' : 'entry', clearable: !!act.clearable, delta: r.delta });

    o.social.state = 'lit';
    o.social.rows = {
      ledger: act.tier === 'public' ? 'Public ledger entry: major violations are publicly visible.' : 'Private ledger tier: minor violations stay private.',
      score: `${signed(r.delta)} (${Math.round(r.before)} → ${Math.round(s.sti)})${r.compounded ? ' · trajectory penalty compounds it' : ''}`,
      fallout: {
        infraction: 'A fine. Nothing else follows while the record is corrected.',
        harass: repeated ? 'Repeated: the pattern is now socially legible even without enforcement.' : 'Colleagues who read the profile adjust.',
        breach: 'The partner can read the entry; endorsements tied to the relationship get withdrawn.'
      }[key],
      recovery: rebuildLine(Math.abs(r.delta)),
      placement: 'None. STI moves trust, not rings.'
    };
    o.cites.push(C.II, C.wp('§5.3'));
    if (s.sti < VISIBILITY_FLAG && r.before >= VISIBILITY_FLAG) {
      o.social.rows.fallout += ` Below ${VISIBILITY_FLAG}: automatic social visibility flag.`;
      o.cites.push(C.wp('§5.2'));
    }
    o.criminal.reason = 'Not reached. No qualifying act; the criminal record track receives nothing.';

    if (s.ring === '-3') {
      o.classify = 'No institution reads it in −3. The public ledger still carries it.';
      o.social.rows.fallout = 'Rated by −3\'s peers against the layer\'s ambient standard; associations, cooperatives and compounds read the ledger.';
      o.cites.push(C.wp('§14.3'), C.dossier('−3'));
    }
    if (s.ring === '+1') phaseBackIfDue(s, o, key === 'breach' ? 'breach' : 'score');

    // Main Layer pattern reading (Charter I second pathway, XV; Whitepaper §6.3).
    if (s.ring === '0' && !s.punitive && act.clearable) {
      const open = activeClearable(s).length;
      if (!s.warned && open >= 3) {
        s.warned = true;
        s.warnBase = open;
        o.criminal.state = 'watch';
        o.criminal.reason = 'Watching, not escalating.';
        o.criminal.rows = {
          threshold: `Pattern warning: ${open} uncorrected items. A documented correction opportunity; remediation resets it.`,
          enforcement: 'None.',
          review: 'Trajectory under evaluation. This is not a countdown.',
          placement: 'Unchanged.'
        };
        o.cites.push(C.I, C.XV, C.wp('§6.3'));
      } else if (s.warned && open >= s.warnBase + 2) {
        return patternReassignment(s, o);
      } else if (s.warned) {
        o.criminal.state = 'watch';
        o.criminal.reason = 'Pattern warning outstanding. Remediate to reset the trajectory.';
      }
    }
    o.announce = `${act.name}. Social path. STI ${signed(r.delta)}, now ${Math.round(s.sti)}.${o.phased ? ' Phased back to Main Layer.' : ''}`;
    return o;
  }

  function patternReassignment(s, o) {
    const stiNow = Math.round(s.sti);
    s.ring = '-1';
    s.punitive = true;
    s.credentialed = false;
    addLedger(s, { label: 'Unremediated pattern', track: 2, tier: 'public', status: 'record', delta: null });
    o.title = `${o.title}: the pattern crosses the threshold`;
    o.axes.pattern = 'repeated';
    o.classify = 'Unremediable pattern: accumulation continued after a documented correction opportunity.';
    o.criminal.state = 'lit';
    o.criminal.reason = '';
    o.criminal.rows = {
      threshold: 'Crossed by pattern: correction opportunities given, trajectory documented, no response.',
      enforcement: 'No force needed: identified and transported to intake.',
      review: 'Multi-factor evaluation of behaviour, context and cumulative history.',
      placement: 'Reassigned to −1 Noncompliance. Immediate and permanent.'
    };
    o.social.state = 'side';
    o.social.rows.placement = `None. STI stood at ${stiNow}: the pattern of acts decided this, not the score.`;
    o.destTone = RING['-1'].tone;
    o.cites.push(C.I, C.XII, C.XV, C.wp('§6.3'));
    o.announce = `Unremediated pattern. Criminal path. Reassigned to −1 Noncompliance with STI at ${stiNow}.`;
    return o;
  }

  // ----- criminal acts -----

  function criminalOutcome(s, key) {
    const act = ACTS[key];
    const o = blankOutcome(key);
    const lines = {
      dui: 'Drove after drinking. The implant warned first; the warning was dismissed.',
      assault: 'Struck a stranger in a dispute outside a bar.',
      fraud: 'Ran a false-invoicing scheme across dozens of clients.',
      predatory: 'Sexual violence against another resident.',
      killing: 'Killed another resident.'
    };
    o.title = act.name;
    o.line = lines[key];
    o.detect = detectLine(s.ring);
    s.year = round1(s.year + act.years);
    const prior = s.ledger.some((e) => e.track === 2 && e.kind === key);
    const irreversible = key === 'predatory' || key === 'killing';
    o.axes = { severity: 'high', pattern: prior ? 'repeated' : 'isolated', reversibility: irreversible ? 'irreversible' : 'reversible' };
    const axisCount = 1 + (prior ? 1 : 0) + (irreversible ? 1 : 0);
    o.cites.push(C.XIV);

    o.failsafe = act.violent
      ? (s.ring === '+1'
        ? 'Threshold Inhibition Protocol: motor inhibition and drones halt the act. No harm completes.'
        : s.ring === '-3' ? 'No failsafe network in daily −3 life.'
        : 'The failsafe warned as intent built; the citizen overrode it. Disabling it is itself logged.')
      : key === 'dui' ? (s.ring === '-3' ? 'No failsafe network in daily −3 life.' : 'The implant warned before the vehicle moved. The warning was dismissed.')
      : 'No motor failsafe applies to a non-violent act.';
    if (s.ring === '+1' && act.violent) o.cites.push(C.VI, C.dossier('+1'));

    const r = applyHarm(s, act.points);
    addLedger(s, { label: act.name, kind: key, track: 2, tier: 'public', status: act.permanent ? 'permanent' : 'record', delta: r.delta });

    // −3: the institution has withdrawn from daily conduct; the ledger has not.
    if (s.ring === '-3') {
      o.classify = 'No institution classifies it. The federal floor acts only on absolute federal law or the External Force Doctrine.';
      o.social.state = 'side';
      o.social.rows = {
        ledger: 'Public ledger entry: −3\'s associations, cooperatives and crews read it.',
        score: `${signed(r.delta)} (${Math.round(r.before)} → ${Math.round(s.sti)})`,
        fallout: 'Rated by −3\'s peers against the layer\'s ambient standard. No institution acts on it.',
        recovery: rebuildLine(Math.abs(r.delta)),
        placement: 'None. There is no ring below −3.'
      };
      o.criminal.state = 'side';
      o.criminal.reason = 'No daily institutional response. Private order answers, in whatever way the layer\'s organic order decides.';
      o.criminal.rows = {
        threshold: 'Below the federal floor triggers.',
        enforcement: 'None from the institution.',
        review: 'None.',
        victim: key === 'killing' ? 'Not revived. Death in −3 is final.' : 'No institutional restoration.',
        placement: 'Unchanged. There is no ring below −3.'
      };
      o.cites.push(C.VI, C.II, C.XXV, C.dossier('−3'));
      o.announce = `${act.name} in −3. No institutional response; the public ledger records it. STI ${signed(r.delta)}.`;
      return o;
    }

    // Where does this act land from this ring?
    let dest = null;
    let destWhy = '';
    if (s.ring === '+1' || s.ring === '0') {
      dest = act.dest;
      destWhy = act.named
        ? 'Article I names this act a single qualifying event for −1: the threshold is categorical, not a count.'
        : axisCount >= 3 ? 'All three axes met: a qualifying event.'
        : 'Severe and irreversible: formal multi-factor evaluation, and the act\'s class sets the destination.';
    } else if (s.ring === '-1') {
      /* −1 dossier: a bar fight reads one axis (corrective, STI hit); violence
         "moves a resident toward −2"; a patterned coercion operation qualifies
         for −2. The console reads a repeat act of violence as the pattern axis. */
      const priorViolence = s.ledger.slice(0, -1).some((e) => e.track === 2 && (e.kind === 'assault' || e.kind === 'predatory'));
      if (key === 'killing') { dest = '-3'; destWhy = 'Capital harm: reassignment to −3.'; }
      else if (key === 'predatory') { dest = '-2'; destWhy = 'Predatory violence: severe and irreversible, the class −2 exists for.'; }
      else if (key === 'assault' && priorViolence) { dest = '-2'; destWhy = 'Repeated violence in −1: severe and patterned. Formal evaluation moves the resident to −2.'; }
    } else if (s.ring === '-2') {
      if (key === 'killing') { dest = '-3'; destWhy = 'Killing is −2\'s one law: immediate reassignment to −3.'; }
    }

    o.social.state = 'side';
    o.social.reason = '';
    o.social.rows = {
      ledger: 'Public entry: the violations dimension registers the hard flag.',
      score: `${signed(r.delta)} (${Math.round(r.before)} → ${Math.round(s.sti)})`,
      fallout: 'Recorded on both tracks. The score falls, but it decided nothing.',
      recovery: s.ring === '0' || s.ring === '+1' ? 'Whatever the score does next, it cannot undo a reassignment.' : rebuildLine(Math.abs(r.delta)),
      placement: 'None. STI has no crossover to reassignment.'
    };
    o.cites.push(C.II);

    if (dest) {
      const from = s.ring;
      const halted = s.ring === '+1' && act.violent;
      o.classify = destWhy;
      o.criminal.state = 'lit';
      o.criminal.rows = {
        threshold: halted ? 'Crossed by the attempt: intent plus execution is enough.' : 'Crossed. The act qualifies for the criminal escalation path.',
        enforcement: act.violent
          ? (halted ? 'Subdued on the spot by inhibition and drones.' : 'Enforcement drones respond; sedation and restraint if needed; drone transport.')
          : 'Identified from implant telemetry and transported to intake.',
        review: 'Evidence, telemetry, context and severity are reviewed in minutes to hours. No plea, no bail.',
        placement: `Reassigned to ${ringName(dest)}. Immediate and permanent.`
      };
      if (key === 'killing' || key === 'predatory' || key === 'assault') {
        o.criminal.rows.victim = halted ? 'Unharmed: the act never completed. Neural therapy offered.'
          : key === 'killing'
            ? ({ '0': 'Revived by backup vessel at full fidelity.', '-1': 'Revived at full fidelity through a VMSS proxy installation.', '-2': 'Revived through a proxy installation (about 1 in 1,000 revivals fail).' })[from]
            : 'Treated and restored; therapy provided.';
      }
      if (key === 'fraud') o.criminal.rows.victim = 'Restitution is automated from the perpetrator\'s assets.';
      s.ring = dest;
      s.punitive = true;
      s.credentialed = false;
      if (dest === '-3') {
        o.social.rows.recovery = 'Terminal reassignment severs the backup vessel link. The score and the public ledger travel on into −3.';
      }
      o.destTone = RING[dest].tone;
      o.cites.push(act.named ? C.I : C.XIV, C.VII, C.XII, C.XIII, C.XV);
      if (act.named && from === '0') o.cites.push(C.threshold);
      if (from === '-1') o.cites.push(C.dossier('−1'));
      if (from === '-2') o.cites.push(C.dossier('−2'));
      o.announce = `${act.name}. Criminal path. Reassigned to ${ringName(dest)}. STI did not decide it.`;
    } else if (s.ring === '-2') {
      o.classify = 'Below the killing line.';
      o.criminal.state = 'side';
      o.criminal.reason = 'Logged on the record track. Below the killing line, −2 brings no federal response: the ledger fills and private order answers.';
      o.criminal.rows = { placement: 'Unchanged.' };
      o.social.rows.fallout = 'Public ledger entry: every private operator deciding access can read it.';
      o.cites.push(C.dossier('−2'));
      o.announce = `${act.name} in −2. Logged; no federal response below the killing line. STI ${signed(r.delta)}.`;
    } else {
      // −1: a first fight, or a non-violent act canon gives no further ring step.
      o.criminal.state = 'side';
      if (key === 'assault') {
        o.classify = 'One axis: severe, but isolated and reversible. Corrective intervention inside −1.';
        o.criminal.reason = 'Logged on the record track. A first fight in −1 draws corrective intervention and an STI hit; repeated violence builds the pattern that moves a resident to −2.';
      } else {
        o.classify = 'Already at this act\'s tier.';
        o.criminal.reason = 'Logged on the record track. The law names no further ring step for this act inside −1, so placement holds; −1\'s private courts act within Article XIV proportionality.';
      }
      o.criminal.rows = { placement: 'Unchanged.' };
      o.cites.push(C.dossier('−1'));
      o.announce = `${act.name} in −1. Logged; placement holds. STI ${signed(r.delta)}.`;
    }
    return o;
  }

  function runAct(s, key) {
    if (['steady', 'service', 'crisis', 'endorse'].includes(key)) return conductOutcome(s, key);
    if (key === 'remediate') return remediateOutcome(s);
    if (key === 'ascend') return ascendOutcome(s);
    if (ACTS[key].dest) return criminalOutcome(s, key);
    return socialOutcome(s, key);
  }

  /* After every act: keep the sustained-85 clock and the timeline. */
  function settle(s) {
    if (s.ring === '0') s.credentialed = isEligible(s);
    s.history.push({ year: s.year, sti: s.sti, ring: s.ring });
    if (s.history.length > 400) s.history.shift();
    if (s.recent.length > 12) s.recent.splice(0, s.recent.length - 12);
    if (s.ledger.length > 60) s.ledger.splice(0, s.ledger.length - 60);
  }

  // =========================
  // REACH (what STI can and cannot do, for this citizen now)
  // =========================

  const REACH = [
    { k: 'gate',     can: true,  on: (s) => s.ring === '+1' || s.ring === '0',
      text: 'Opens or narrows trust-dependent access: Trust Threshold Domains, contracts, partnerships, positions.', cite: [C.II, C.wp('§5.2')] },
    { k: 'standing', can: true,  on: (s) => s.ring === '-1' || s.ring === '-2' || s.ring === '-3',
      text: 'Sets standing inside a lower ring: better districts, security cooperatives, market associations, private domains.', cite: [C.XXV, C.dossier('−1'), C.dossier('−2'), C.dossier('−3')] },
    { k: 'ascent',   can: true,  on: (s) => s.ring === '0' && !s.punitive,
      text: `Opens Sanctuary eligibility at ${SANCTUARY_FLOOR} or above, including after a phase-back. The move is the citizen's choice.`, cite: [C.VII, C.wp('§5.2')] },
    { k: 'phase',    can: true,  on: (s) => s.ring === '+1',
      text: `Returns a Sanctuary resident to Main below ${SANCTUARY_FLOOR}. This is a condition lapsing, not a punishment, and the score's only placement effect.`, cite: [C.VII, C.XII, C.XIII] },
    { k: 'flag',     can: true,  on: (s) => s.sti < VISIBILITY_FLAG,
      text: `Below ${VISIBILITY_FLAG}, raises automatic social visibility flags.`, cite: [C.wp('§5.2')] },
    { k: 'input',    can: true,  on: (s) => s.ring !== '-3',
      text: 'Feeds multi-factor evaluation as one weighted input beside behaviour, context and history.', cite: [C.XII, C.wp('§5.10')] },
    { k: 'reassign', can: false, on: () => true,
      text: 'Reassign anyone below Main. That takes a qualifying act on the criminal record track, then review.', cite: [C.II, C.XII, C.XIII] },
    { k: 'return',   can: false, on: (s) => s.punitive,
      text: 'Lift a punitive resident back up. Improvement serves life in the ring, not a way out.', cite: [C.XV] },
    { k: 'thought',  can: false, on: () => true,
      text: 'Read thought. Only outwardly expressed actions move it; cognition is non-public.', cite: [C.II] },
    { k: 'crowd',    can: false, on: () => true,
      text: 'Move against the conduct record. Public approval and disapproval amplify a trajectory; they never create one.', cite: [C.wp('§5.6')] },
    { k: 'terminal', can: false, on: (s) => s.ring === '-3',
      text: 'Summon an institution in −3. The score and ledger travel with the resident; daily conduct meets private order.', cite: [C.VI, C.dossier('−3')] }
  ];

  // =========================
  // DOM
  // =========================

  function initConsole() {
    const root = document.getElementById('sti-console');
    if (!root) return;

    const q = (sel) => root.querySelector(sel);
    const qa = (sel) => Array.from(root.querySelectorAll(sel));
    const el = {
      startBtns: qa('[data-tc-start]'),
      restart: q('[data-tc-restart]'),
      modeBtns: qa('[data-tc-mode]'),
      acts: qa('[data-tc-act]'),
      ascendNote: q('[data-tc-ascend-note]'),
      moveGroup: q('.tc-act-group[data-kind="move"]'),
      ring: q('[data-tc-ring]'),
      ringBasis: q('[data-tc-ring-basis]'),
      ringStat: q('[data-tc-stat="ring"]'),
      sti: q('[data-tc-sti]'),
      stiNote: q('[data-tc-sti-note]'),
      record: q('[data-tc-record]'),
      sanct: q('[data-tc-sanctuary]'),
      sanctNote: q('[data-tc-sanctuary-note]'),
      year: q('[data-tc-year]'),
      traj: q('[data-tc-trajectory]'),
      fork: q('[data-tc-fork]'),
      evTitle: q('[data-tc-event-title]'),
      evLine: q('[data-tc-event-line]'),
      failsafe: q('[data-tc-failsafe]'),
      detect: q('[data-tc-detect]'),
      axes: qa('[data-tc-axis]'),
      classify: q('[data-tc-classify]'),
      lanes: { social: q('[data-tc-lane="social"]'), criminal: q('[data-tc-lane="criminal"]') },
      cites: q('[data-tc-cites]'),
      timeline: q('[data-tc-timeline]'),
      timelineSummary: q('[data-tc-timeline-summary]'),
      reachCan: q('[data-tc-reach="can"]'),
      reachCannot: q('[data-tc-reach="cannot"]'),
      ledger: q('[data-tc-ledger]'),
      mapLink: q('[data-tc-map-link]'),
      live: q('[data-tc-live]')
    };

    const narrow = window.matchMedia('(max-width: 900px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('start');
    let s = (requested && RING[requested]) ? freshSession(requested) : (loadSession() || freshSession('0'));
    let startRing = requested && RING[requested] ? requested : (s.history[0] ? s.history[0].ring : '0');
    let last = null;

    // ---------- renderers ----------

    function renderStatus() {
      el.ring.textContent = ringName(s.ring);
      el.ringStat.dataset.tone = RING[s.ring].tone;
      el.ringBasis.textContent = s.punitive ? 'Punitive placement · permanent'
        : s.ring === '+1' ? 'Phasing · held while the condition holds'
        : 'Resident';
      if (window.vmssAnimateNumber) window.vmssAnimateNumber(el.sti, Math.round(s.sti), { duration: 420 });
      else el.sti.textContent = String(Math.round(s.sti));
      el.stiNote.textContent = s.sti >= SANCTUARY_FLOOR ? `At or above the ${SANCTUARY_FLOOR} Sanctuary floor`
        : s.sti < VISIBILITY_FLAG ? `Below ${VISIBILITY_FLAG}: visibility flag`
        : `${SANCTUARY_FLOOR - Math.round(s.sti)} below the Sanctuary floor`;
      el.record.textContent = recordSummary(s);
      const [standing, note] = sanctuaryStanding(s);
      el.sanct.textContent = standing;
      el.sanctNote.textContent = note;
      el.year.textContent = `Year ${fmt(round1(s.year))}`;
      const t = trajectory(s);
      el.traj.textContent = { forming: 'Trajectory forming', improving: 'Trajectory improving', declining: 'Trajectory declining', mixed: 'Trajectory mixed' }[t];
      el.traj.dataset.state = t;
      el.startBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tcStart === startRing)));
      if (el.mapLink) el.mapLink.href = `layers.html?ring=${encodeURIComponent(s.ring)}#ring-atlas`;
    }

    function renderActs() {
      const open = activeClearable(s).length;
      el.acts.forEach((b) => {
        const key = b.dataset.tcAct;
        let disabled = false;
        if (key === 'remediate') disabled = open === 0;
        if (key === 'ascend') {
          b.hidden = s.ring !== '0' || s.punitive;
          disabled = !isEligible(s);
        }
        b.disabled = disabled;
      });
      if (el.moveGroup) el.moveGroup.hidden = s.ring !== '0' || s.punitive;
      if (el.ascendNote) {
        el.ascendNote.textContent = isEligible(s)
          ? 'Eligible. Moving up is a choice.'
          : `Opens at an STI of ${SANCTUARY_FLOOR} or above.`;
      }
    }

    function setLane(name, lane) {
      const node = el.lanes[name];
      node.dataset.state = lane.state;
      node.querySelector('[data-tc-lane-reason]').textContent = lane.reason || '';
      node.querySelectorAll('[data-tc-row]').forEach((row) => {
        const val = lane.rows[row.dataset.tcRow];
        row.hidden = !val && row.dataset.tcOptional === 'true';
        row.querySelector('.tc-row-val').textContent = val || '—';
        row.dataset.filled = val ? 'true' : 'false';
      });
      node.querySelector('[data-tc-lane-summary]').textContent = laneSummary(name, lane);
    }

    /* Simple view: one sentence per lane, built from the same rows. */
    function laneSummary(name, lane) {
      const r = lane.rows;
      if (name === 'social') {
        if (!r.score) return lane.reason;
        const score = /^([+−]|0 \()/.test(r.score) ? `STI ${r.score}.` : r.score;
        const rest = r.placement && r.placement !== 'None.' ? r.placement.replace(/^None\. /, '') : r.fallout;
        return `${score} ${rest || ''}`.trim();
      }
      if (lane.state === 'lit') return r.placement || lane.reason;
      if (lane.state === 'watch') return r.threshold || lane.reason;
      return lane.reason;
    }

    function renderFork(o) {
      if (!o) return;
      el.fork.dataset.path = o.criminal.state === 'lit' ? 'criminal' : o.social.state === 'lit' ? 'social' : 'none';
      el.fork.dataset.destTone = o.destTone || '';
      el.evTitle.textContent = o.title;
      el.evLine.textContent = o.line;
      el.failsafe.textContent = o.failsafe;
      el.detect.textContent = o.detect;
      el.classify.textContent = o.classify;
      el.axes.forEach((chip) => {
        const axis = chip.dataset.tcAxis;
        const val = o.axes ? o.axes[axis] : null;
        chip.querySelector('.tc-axis-val').textContent = val || '—';
        const lit = val && ((axis === 'severity' && val === 'high') || (axis === 'pattern' && val === 'repeated') || (axis === 'reversibility' && val === 'irreversible'));
        chip.dataset.lit = lit ? 'true' : 'false';
      });
      setLane('social', o.social);
      setLane('criminal', o.criminal);
      el.cites.replaceChildren();
      const seen = new Set();
      o.cites.forEach(([label, href]) => {
        if (seen.has(label)) return;
        seen.add(label);
        const a = document.createElement('a');
        a.href = href;
        a.textContent = minus(label);
        el.cites.appendChild(a);
      });
      el.fork.classList.remove('is-running');
      void el.fork.offsetWidth;
      el.fork.classList.add('is-running');
    }

    /* The reach lists are built once from REACH; renders only flip data-on. */
    const reachItems = REACH.map((item) => {
      const li = document.createElement('li');
      li.className = 'tc-reach-item';
      const text = document.createElement('span');
      text.textContent = item.text;
      const cites = document.createElement('span');
      cites.className = 'tc-reach-cite';
      item.cite.forEach(([label, href], i) => {
        if (i) cites.append(' · ');
        const a = document.createElement('a');
        a.href = href;
        a.textContent = minus(label);
        cites.appendChild(a);
      });
      li.append(text, cites);
      (item.can ? el.reachCan : el.reachCannot).appendChild(li);
      return [item, li];
    });

    function renderReach() {
      reachItems.forEach(([item, li]) => { li.dataset.on = item.on(s) ? 'true' : 'false'; });
    }

    function renderLedger() {
      el.ledger.replaceChildren();
      const entries = s.ledger.slice().reverse();
      if (!entries.length) {
        const li = document.createElement('li');
        li.className = 'tc-ledger-empty';
        li.textContent = 'Nothing recorded yet. Positive conduct shows in the timeline, not here.';
        el.ledger.appendChild(li);
        return;
      }
      entries.forEach((e) => {
        const li = document.createElement('li');
        li.className = 'tc-ledger-item';
        li.dataset.track = String(e.track);
        li.dataset.status = e.status;
        const when = document.createElement('span');
        when.className = 'tc-ledger-when';
        when.textContent = `Yr ${fmt(Number(e.year) || 0)}`;
        const label = document.createElement('span');
        label.className = 'tc-ledger-label';
        label.textContent = e.label;
        const tags = document.createElement('span');
        tags.className = 'tc-ledger-tags';
        const statusText = { active: 'clearable · open', cleared: 'cleared · history only', entry: 'on ledger', record: 'on record', permanent: 'permanent' }[e.status] || e.status;
        tags.textContent = `${e.track === 2 ? 'Track 2 · record' : 'Track 1 · STI'} · ${e.tier} · ${statusText}`;
        li.append(when, label, tags);
        el.ledger.appendChild(li);
      });
    }

    const SVG = 'http://www.w3.org/2000/svg';
    const svgEl = (name, attrs) => {
      const n = document.createElementNS(SVG, name);
      Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, String(v)));
      return n;
    };

    function renderTimeline() {
      const svg = el.timeline;
      const W = Math.max(280, Math.round(svg.getBoundingClientRect().width) || 640);
      const H = W < 520 ? 180 : 210;
      const m = { l: 30, r: 8, t: 10, b: 22 };
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svg.replaceChildren();
      const h = s.history;
      const maxYear = Math.max(6, (h[h.length - 1].year || 0) * 1.08);
      const x = (yr) => m.l + (yr / maxYear) * (W - m.l - m.r);
      const y = (v) => m.t + (1 - v / 100) * (H - m.t - m.b);

      // Placement bands
      for (let i = 0; i < h.length; i++) {
        const x0 = x(h[i].year);
        const x1 = i + 1 < h.length ? x(h[i + 1].year) : x(maxYear);
        if (x1 - x0 < 0.3) continue;
        svg.appendChild(svgEl('rect', { x: x0, y: m.t, width: x1 - x0, height: H - m.t - m.b, class: `tc-tl-band tone-${RING[h[i].ring].tone}` }));
      }
      // Reference lines
      [[SANCTUARY_FLOOR, `${SANCTUARY_FLOOR} Sanctuary floor`], [VISIBILITY_FLAG, `${VISIBILITY_FLAG} visibility flag`]].forEach(([v, label]) => {
        svg.appendChild(svgEl('line', { x1: m.l, x2: W - m.r, y1: y(v), y2: y(v), class: 'tc-tl-ref' }));
        const t = svgEl('text', { x: W - m.r - 4, y: y(v) - 4, 'text-anchor': 'end', class: 'tc-tl-label' });
        t.textContent = label;
        svg.appendChild(t);
      });
      // Axes
      [0, 50, 100].forEach((v) => {
        const t = svgEl('text', { x: m.l - 6, y: y(v) + 3, 'text-anchor': 'end', class: 'tc-tl-label' });
        t.textContent = String(v);
        svg.appendChild(t);
      });
      const step = maxYear > 40 ? 10 : maxYear > 16 ? 5 : maxYear > 8 ? 2 : 1;
      for (let yr = 0; yr <= maxYear; yr += step) {
        const t = svgEl('text', { x: x(yr), y: H - 6, 'text-anchor': yr === 0 ? 'start' : 'middle', class: 'tc-tl-label' });
        t.textContent = yr === 0 ? 'yr 0' : String(yr);
        svg.appendChild(t);
      }
      // STI line
      const d = h.map((p, i) => `${i ? 'L' : 'M'}${x(p.year).toFixed(1)} ${y(p.sti).toFixed(1)}`).join(' ');
      svg.appendChild(svgEl('path', { d, class: 'tc-tl-line' }));
      // Ledger ticks
      s.ledger.forEach((e) => {
        const cx = x(Number(e.year) || 0);
        svg.appendChild(svgEl('line', { x1: cx, x2: cx, y1: H - m.b, y2: H - m.b - (e.track === 2 ? 12 : 7), class: `tc-tl-tick track-${e.track}` }));
      });
      const lastP = h[h.length - 1];
      svg.appendChild(svgEl('circle', { cx: x(lastP.year), cy: y(lastP.sti), r: 4, class: `tc-tl-dot tone-${RING[lastP.ring].tone}` }));

      const rings = [...new Set(h.map((p) => ringName(p.ring)))].join(', then ');
      el.timelineSummary.textContent = `STI over ${fmt(round1(lastP.year))} simulated years: from ${Math.round(h[0].sti)} to ${Math.round(lastP.sti)}. Placement: ${rings}.`;
    }

    function publish(summaryEvent) {
      if (!window.VMSS) return;
      window.VMSS.setState({
        placement: s.ring,
        stiScore: Math.round(s.sti),
        record: recordSummary(s),
        profile: s.profile,
        lastEvent: summaryEvent
      }, { source: 'sti-console' });
    }

    function renderAll() {
      renderStatus();
      renderActs();
      renderReach();
      renderLedger();
      renderTimeline();
    }

    function introOutcome() {
      const o = blankOutcome('intro');
      o.title = 'Choose an act';
      o.line = s.history.length > 1 ? 'Session restored. Choose the next act.' : STARTS[startRing].line;
      o.social.state = 'idle';
      o.criminal.state = 'idle';
      o.failsafe = 'Implant warnings, motor overrides and restraint: the chance to stop.';
      o.detect = 'The implant and AR context register what happened and who was involved.';
      o.classify = 'Severity, pattern and reversibility decide which path the act takes.';
      o.social.reason = 'Trust damage without criminal enforcement. The STI moves; the ring does not.';
      o.criminal.reason = 'A qualifying act: enforcement, review, and reassignment set by the act.';
      o.cites.push(C.II, C.XIV, C.XII);
      return o;
    }

    function start(ring) {
      startRing = ring;
      s = freshSession(ring);
      last = introOutcome();
      saveSession(s);
      renderAll();
      renderFork(last);
      publish(STARTS[ring].line.split('.')[0]);
      el.live.textContent = `Started as ${STARTS[ring].profile.toLowerCase()}, ${ringName(ring)}. STI ${s.sti}.`;
    }

    function act(key) {
      if (!ACTS[key]) return;
      last = runAct(s, key);
      settle(s);
      saveSession(s);
      renderAll();
      renderFork(last);
      publish(last.title);
      el.live.textContent = last.announce;
      // On a single-column layout the fork sits below the acts: bring the
      // result of the tap into view.
      if (narrow.matches && el.fork.getBoundingClientRect().top > window.innerHeight * 0.6) {
        el.fork.scrollIntoView({ block: 'start', behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      }
    }

    // ---------- listeners ----------

    el.acts.forEach((b) => b.addEventListener('click', () => act(b.dataset.tcAct)));
    el.startBtns.forEach((b) => b.addEventListener('click', () => start(b.dataset.tcStart)));
    el.restart.addEventListener('click', () => start(startRing));

    // Simple / Full view. A per-viewer preference; the session is shared by both.
    const MODE_KEY = 'vmss_console_mode';
    function setMode(mode, save) {
      root.dataset.mode = mode;
      el.modeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tcMode === mode)));
      if (save) { try { localStorage.setItem(MODE_KEY, mode); } catch (e) { /* preference just won't persist */ } }
      if (mode === 'full') renderTimeline();
    }
    let savedMode = null;
    try { savedMode = localStorage.getItem(MODE_KEY); } catch (e) { /* storage blocked: default view */ }
    setMode(savedMode === 'full' ? 'full' : 'simple', false);
    el.modeBtns.forEach((b) => b.addEventListener('click', () => setMode(b.dataset.tcMode, true)));

    if ('ResizeObserver' in window) {
      let raf = 0;
      new ResizeObserver(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(renderTimeline);
      }).observe(el.timeline);
    }

    // ---------- first paint ----------
    if (requested && RING[requested]) {
      start(requested);
    } else {
      last = introOutcome();
      renderAll();
      renderFork(last);
      publish(s.ledger.length ? `${s.profile}: session restored` : STARTS[startRing].line.split('.')[0]);
    }
    root.classList.add('is-ready');
  }

  document.addEventListener('DOMContentLoaded', initConsole);

})();
