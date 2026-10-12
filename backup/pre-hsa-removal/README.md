# Backup: before HSA removal (2026-10-12)

Copies of every file touched by the "temporarily remove all things HSA" change.
Restore by copying these back over `src/`.

- `src/data/transactions.ts` — had 11 Health Savings rows and `'HSA_FSA'` in the benefit union
- `src/data/filterOptions.ts` — had "Health Savings" in `BENEFIT_OPTIONS`
- `src/data/investmentTransactions.ts` — parked investment rows, typed against the old union
- `src/HomescreenWeb.tsx`, `src/HomescreenWebUnified.tsx` — Health Savings account card, HSA statement banner, Deposit button
