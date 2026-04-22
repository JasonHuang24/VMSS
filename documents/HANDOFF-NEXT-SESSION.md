# Handoff Prompt for Next Claude Doctrine Expert Session

## Context
This is the VMSS / The Five Rings civilization design project by Jason Huang. The repo is at `F:\Programming\VMSS\VMSS Website`. The session system prompt contains the full doctrine expert setup — read it first, then load the Charter and whitepaper as instructed.

## Current State
- **Academy:** 32 rubric-graded questions in `documents/academy-source.html`
- **Academic Resources:** 29 resources across 3 categories in `documents/resources-source.html` (World of VMSS: R3, R7, R12, R13, R14, R15, R16, R17, R18 · Universe of VMSS: R1, R2, R4, R6, R19, R20 · VMSS Advanced: R5, R8, R9, R10, R11, R21, R22, R23, R24, R25, R26, R27, R28, R30)
- **Simulations:** 81 total (39 world, 42 resident) with doctrine snapshot stamps
- **Dossiers:** 4 (World Scenarios, Resident Stories, The Academy, Academic Resources)

## Typography
Write prose with native Unicode typography (curly quotes, em dashes, section symbols, middle dots). Every page declares `<meta charset="UTF-8">`, so HTML entities are unnecessary and add source noise. Do not convert existing Unicode to entities.

## PDF Regeneration
- Academy: `"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="F:\Programming\VMSS\VMSS Website\documents\vmss-academy-course-packet.pdf" --no-margins "file:///F:/Programming/VMSS/VMSS Website/documents/academy-source.html"`
- Resources: `"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="F:\Programming\VMSS\VMSS Website\documents\vmss-academic-resources.pdf" --no-margins "file:///F:/Programming/VMSS/VMSS Website/documents/resources-source.html"`
- After PDF regeneration, bump the cache-busting query string on the iframe src in `simulations-academy.html` / `simulations-resources.html` to match the new version

## Format Conventions
- Q1-Q20 use the older academy format — don't modify unless Jason asks
- Q21-Q32 use the structured metadata format: Question (Type) label, Response Mode / Question Family / Evaluation Emphasis / Canon Anchors in question-meta, Difficulty with parenthetical, Course Scaling with full range, descriptive grade labels
- Academic Resources follow the pattern established by R12/R13: `resource-page` div with `resource-title` h2, styled subtitle paragraph, `resource-intro` div, h3 section headers, concluding pedagogical reflection addressed to "the student"

## Always Load From Source
Doctrine summaries age faster than the Charter and whitepaper. Load those two files directly each session rather than trusting prior notes.
