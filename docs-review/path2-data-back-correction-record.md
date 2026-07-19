# Path 2 DATA-BACK mirror-correction record

Status: **authorized Process-tier continuity repair; no in-world §11.3 correction**

The evidence record landed at `dae0db0` fixed the run's lock at 2292-02-15 but labeled completed Main and Lower observations as 2293 and allowed the dividend window to extend through 2293. Those labels postdated the governing vintage and could not satisfy Charter §§6.2–6.3.

The founder ruled DATA-BACK. The corrective package retains the statutory 2292 lock and changes only completed-observation periods, matching source identifiers, and explicit vintage metadata:

| Evidence | Landed label | Corrected label |
|---|---|---|
| Main current receipts and obligations | 2293-01 through 2293-12; `MAIN-LEDGER-2293-*` | 2291-01 through 2291-12; `MAIN-LEDGER-2291-*` |
| −1 current receipts and obligations | 2293-01 through 2293-12; `L1-LEDGER-2293-*` | 2291-01 through 2291-12; `L1-LEDGER-2291-*` |
| −2 current receipts and obligations | 2293-01 through 2293-12; `L2-LEDGER-2293-*` | 2291-01 through 2291-12; `L2-LEDGER-2291-*` |
| −3 current receipts and obligations | 2293-01 through 2293-12; `L3-LEDGER-2293-*` | 2291-01 through 2291-12; `L3-LEDGER-2291-*` |
| ADT and dividend completed window | 2291-01 through 2293-12; `ADT-LEDGER-2291-2293-*` | 2289-01 through 2291-12; `ADT-LEDGER-2289-2291-*` |

The source authorities' maximum published reporting lag is fixed at forty-five days. Subtracting it from 2292-02-15 gives a 2292-01-01 cutoff. All corrected completed observations ended by that cutoff and were published and fixed at the 2292-02-01 vintage, before lock.

No value, weight, adjustment, rate, statutory threshold, computed metric, Finding, Schedule condition, certificate, projection target, notice date, effective date, or ratified outcome changed. The annual 2295–2324 horizon and monthly 2295–2297 windows remain projections. Their target dates may postdate lock because their inputs end by the cutoff and their transformations were preregistered at lock.

Lock-forward was rejected because LP-075 required lock no later than 2292. Moving the lock would also have shifted the §6.1 observation window, §6.2 cutoff, and baseline periods, creating a substantive methodological rewrite rather than a label repair.

The verifier now enforces two evidence classes:

- `COMPLETED_OBSERVATION`: period end no later than the computed cutoff; publication and vintage before lock; source reporting lag equal to the pinned maximum.
- `PREREGISTERED_PROJECTION`: target may postdate lock; input cutoff no later than the §6.2 cutoff; transformation fixed no later than lock.

The correction is disclosed because silently relabeling the evidence would resemble the in-world vintage violation that the authored-history repair cures. In-world, the issued 2294 record was always admissible and complete; this record describes repair of its repository mirror.
