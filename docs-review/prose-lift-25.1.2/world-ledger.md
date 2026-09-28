# world.html — v25.1.2 doctrine-fix ledger

Doctrine-fix pass (fixes 8, 9, 10, 11 of the 25.1.2 set, approved by Jason 2026-09-28). Source flags: `docs-review/prose-lift-24.9.0/world-ledger.md`, "### Flags" 1, 2, 8, 6. Only four `<p>` elements changed. Everything else is byte-identical to `world.html` at 0672302.

## Fixes

### Fix 11: page 2, refugee-wave period label (24.9.0 flag 6)
- Before: 'The 20th century's refugee waves, from the Holocaust, the Partition of India and the Syrian civil war, were driven by violence.'
- After: 'The refugee waves of the 20th and early 21st centuries, from the Holocaust, the Partition of India and the Syrian civil war, were driven by violence.'
- Source: historical fact (the Syrian civil war began in 2011). The page 22 Earth line 'The 20th century's refugee waves were driven by violence.' names no 21st-century case, so it was left unchanged.

### Fix 8: page 5, Lower Layer Travel Restrictions, -3 paragraph (24.9.0 flag 1)
- Before: 'the implant may be disabled or removed, and VMSS has withdrawn institutional oversight.'
- After: 'the implant may be disabled or removed, and VMSS has withdrawn AI enforcement of daily conduct.'
- Canon: the STI and the public ledger run in -3. layer--3.html has 'without the AI enforcement that reads conduct for layer reassignment' and 'The public ledger still travels with every resident'. The implant clause was kept because it matches systems.html: 'many -2 and -3 residents will have removed or disabled their implants'.

### Fix 9: page 7, Citizenship Revocation (24.9.0 flag 2)
- Before: 'Only after consequence delivery is complete can the citizen file for revocation from their assigned layer. … the sequence is act, consequence, then exit if desired.'
- After: 'Only after consequence delivery is complete can the citizen file for revocation, and only if the assigned layer permits exit (Main Layer or above); -1 and -2 have no exit, and -3 is terminal. … the sequence is act, consequence, then exit if desired and permitted.'
- Canon: faq.html, "Can I leave VMSS?": 'Exit is always allowed from Main Layer (0) and above', '(-1/-2) have no exit', 'From -3, exit is impossible; it is terminal.' The closing 'then exit if desired' got 'and permitted' so the paragraph's last sentence doesn't bring the implication back. Tier-equivalent allied transfer is not named here because the FAQ does not class it as exit.

### Fix 10: page 22, Death, VMSS paragraph (24.9.0 flag 8)
- Before: 'You must first descend through the lower gradients: from Main to -1, from -1 to -2, from -2 to -3. Each descent requires committing qualifying offenses and surviving…'
- After: 'You must first descend through the lower gradients: from Main to -1, from -1 to -2, from -2 to -3, or file for voluntary permanent residency in -3, which triggers additional psychological screening. Each punitive descent requires committing qualifying offenses and surviving…'
- Canon: charter.html Article III, Voluntary Permanent Residency ('Citizens filing for voluntary permanent residency in a lower layer…'). layer--3.html: 'filed the voluntary permanent residency application from Main Layer' and 'voluntary permanent residency in -3 triggers additional psychological screening'. VPR can be filed from Main as well as from -2, so the fix adds a VPR alternative to 'must first descend' and does not limit it to -2 residents.

## Claims ledger (edited paragraphs only)

Page 2 migration paragraph:
- Catastrophe premise: "Every prior mass migration in human history had a catastrophe behind it."
- Africa / climate: "The Great Migration out of Africa was driven by climate."
- Slave trade / force: "The Transatlantic slave trade was driven by force."
- Colonization causes: "driven by famine, persecution, and economic desperation"
- Period label (fixed): "The refugee waves of the 20th and early 21st centuries"
- Named cases: "the Holocaust, the Partition of India and the Syrian civil war"
- Scale conclusion: "people moved at scale only when staying was worse than the uncertainty of going"

Page 5, -3 travel paragraph:
- No travel: "-3 Terminal residents do not travel."
- Vessel link: "The backup vessel link is severed"
- Implant clause (kept): "the implant may be disabled or removed"
- Withdrawal (fixed): "VMSS has withdrawn AI enforcement of daily conduct"
- Infrastructure: "International travel requires the infrastructure -3 residents no longer carry."
- Sealed border: "The border is sealed in both directions for terminal placement."

Page 7 revocation paragraph:
- Pending action bar: "Revocation cannot be processed while an active recall or enforcement action is pending."
- Instant recording: "The implant ledger records qualifying conduct instantaneously"
- Attachment moment: "the recall attaches at the moment of the act rather than at physical recovery"
- Queue precedence: "the recall queue takes precedence over the administrative queue"
- Sequence: "recovered, returned to VMSS territory, and processed through standard severity-based reassignment"
- Timing: "Only after consequence delivery is complete can the citizen file for revocation"
- Exit gate (fixed): "only if the assigned layer permits exit (Main Layer or above)"
- No exit below (fixed): "-1 and -2 have no exit, and -3 is terminal"
- No evasion: "Resigning citizenship once the system is in motion does not evade consequence"
- Order (fixed): "act, consequence, then exit if desired and permitted"

Page 22 Death, VMSS paragraph:
- Arduous process: "Orchestrating your own permanent death is an arduous multi-stage process."
- Gradients: "from Main to -1, from -1 to -2, from -2 to -3"
- VPR route (fixed): "or file for voluntary permanent residency in -3"
- Screening (fixed): "which triggers additional psychological screening"
- Offense requirement (fixed): "Each punitive descent requires committing qualifying offenses"
- Environment: "surviving the environmental consequences of each layer"
- Hardware severance: "Only in -3 Terminal does the backup vessel link sever at the hardware level"
- Resident scope: "(punitive placements and voluntary permanent residents)"
- Finality: "Only then does death become final"
- Means: "you must find a willing murderer or succeed at self-termination in a frontier environment"
- Failsafe hedge: "the implant's failsafe inhibition (if still enabled) works against you"
- Design intent: "The civilization made death hard on purpose."
- Stopping points: "Every layer you pass through is another opportunity to stop."

## Word counts

| Element | Before | After |
|---|---|---|
| Page 2 migration `<p>` | 81 | 86 |
| Page 5 -3 travel `<p>` | 45 | 48 |
| Page 7 revocation `<p>` | 121 | 141 |
| Page 22 Death VMSS `<p>` | 121 | 135 |
| Whole page (tags, script and style stripped) | 21,245 | 21,287 |

All four paragraphs grew (+42 words in total). This is a doctrine-fix patch, so the length target does not apply, and each fix adds the minimum clause needed.

## Flags

1. **Page 22, Death paragraph: other routes to permanent death remain unaddressed (held for Jason).** The paragraph says permanent death is only reachable in -3. faq.html ("Is suicide stigmatized?") says a resident in +1 through -2 can remove their implant, which 'severs the backup vessel link and makes death final'. LP-004.2 also makes death final for a *visitor* to -3. Both contradict the paragraph's thesis that permanent death requires reaching -3. The 'for residents' scope phrase partly hedges the visitor case, but not the implant-removal case. Fix 10 only covered the VPR route, so the rest is left as it was.
2. **Fix 9 scope.** Tier-equivalent allied transfer from -1/-2 is deliberately not mentioned, because the FAQ treats it as a transfer and not as exit. If Jason wants the revocation paragraph to point at it, one clause would do.
3. **Fix 10 wording.** Canon allows VPR into -3 from Main (layer--3 story) as well as from -2 (the patch anchor), so the fix names the VPR route without naming an origin layer. The screening claim comes from the layer--3 story ('triggers additional psychological screening').
4. **Held from 24.9.0, not in this patch:** flags 3 (longevity stack, pages 8/13), 4 (refugee category, pages 6/14), 5 (who migrates, page 2) and 7 (allied STI milestones, page 4) are unchanged.
