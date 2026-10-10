import { ACCOUNT_HOLDER, CARDS, PEOPLE, cardById, personByUid } from './people';
import type { Transaction, TransactionKind } from './transactions';

// ── Filter groups (v2) ──────────────────────────────────────────────────────
// 1. Transaction Type  2. Benefit Account  3. Date Range  4. Individual  5. Card

export const BENEFIT_OPTIONS = ['Health Savings', 'Dependent Care FSA', 'General Health FSA', 'Remote Work'];

export const TRANSACTION_TYPE_OPTIONS: { label: string; kind: TransactionKind }[] = [
  { label: 'Card Transaction', kind: 'CardTransaction' },
  { label: 'Claim Reimbursement', kind: 'ClaimReimbursement' },
  { label: 'Contribution/Funding', kind: 'Contribution' },
  { label: 'Deposit', kind: 'Deposit' },
];
export const TRANSACTION_TYPE_LABELS = TRANSACTION_TYPE_OPTIONS.map((o) => o.label);
const kindByLabel = Object.fromEntries(TRANSACTION_TYPE_OPTIONS.map((o) => [o.label, o.kind]));

export const INDIVIDUAL_OPTIONS = PEOPLE.map((p) => ({ label: `${p.firstName} ${p.lastName}`, uid: p.uid }));
export const INDIVIDUAL_LABELS = INDIVIDUAL_OPTIONS.map((o) => o.label);
const uidByLabel = Object.fromEntries(INDIVIDUAL_OPTIONS.map((o) => [o.label, o.uid]));

export const CARD_OPTIONS = CARDS.map((c) => {
  const p = personByUid(c.cardHolderUid);
  return { label: `${p?.firstName} ${p?.lastName} •••• ${c.cardLast4}`, cardId: c.cardId };
});
export const CARD_LABELS = CARD_OPTIONS.map((o) => o.label);
const cardIdByLabel = Object.fromEntries(CARD_OPTIONS.map((o) => [o.label, o.cardId]));

// ── Row helpers ─────────────────────────────────────────────────────────────

/** Who a transaction belongs to: the claimant, else the cardholder, else the account holder. */
export const transactionPersonUid = (t: Transaction) =>
  t.claimantUid ?? (t.cardId ? cardById(t.cardId)?.cardHolderUid : undefined) ?? ACCOUNT_HOLDER.uid;

export const matchesTransactionType = (t: Transaction, selectedLabels: string[]) =>
  selectedLabels.length === 0 || selectedLabels.some((l) => kindByLabel[l] === t.kind);

export const matchesIndividual = (t: Transaction, selectedLabels: string[]) =>
  selectedLabels.length === 0 || selectedLabels.some((l) => uidByLabel[l] === transactionPersonUid(t));

export const matchesCard = (t: Transaction, selectedLabels: string[]) =>
  selectedLabels.length === 0 || (!!t.cardId && selectedLabels.some((l) => cardIdByLabel[l] === t.cardId));

// ── Row labels (mirror fd-web) ──────────────────────────────────────────────

/** "for Sherry Ford - Dependent" — only when the claim is for a dependent. */
export const claimantLabel = (t: Transaction) => {
  if (t.kind !== 'ClaimReimbursement' || !t.claimantUid) return undefined;
  const p = personByUid(t.claimantUid);
  return p?.isDependent ? `for ${p.firstName} ${p.lastName} - Dependent` : undefined;
};

/** "Card Transaction • Frank F...1234" — category plus the card that made the swipe (fd-web format). */
export const cardLabel = (t: Transaction) => {
  if (t.kind !== 'CardTransaction' || !t.cardId) return undefined;
  const c = cardById(t.cardId);
  const p = c && personByUid(c.cardHolderUid);
  return c && p ? `Card Transaction • ${p.firstName} ${p.lastName[0]}...${c.cardLast4}` : undefined;
};
