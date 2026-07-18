# Seed record

Generator: 32-bit LCG, x[n+1] = 1664525*x[n] + 1013904223 modulo 2^32. Sub-seeds: mix32(baseSeed XOR ((outer+1)*0x9e3779b1) XOR ((inner+1)*0x85ebca6b)); inner zero is reserved for the outer draw. B-1 uses 999 outer and 199 inner replications. B-4 uses 1,999 direct scalar replications. Type-7 quantiles are filed. Zero or nonfinite inner standard errors discard that outer draw; execution aborts below 90% valid or on a zero original-estimate standard error.

- I-certification-linear-b1: 74001
- II-certification-linear-b1: 74002
- III-certification-linear-b1: 74003
- IV-certification-linear-b1: 74004
- IV-refusal-partial-id-b4: 74005
