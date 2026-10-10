export interface Person {
  uid: string;
  firstName: string;
  lastName: string;
  isDependent: boolean;
  relationship?: 'CHILD' | 'SPOUSE' | 'OTHER';
}

export interface CardInfo {
  cardId: string;
  cardLast4: string;
  cardHolderUid: Person['uid'];
}

export const ACCOUNT_HOLDER: Person = { uid: 'frank', firstName: 'Frank', lastName: 'Ford', isDependent: false };

export const DEPENDENTS: Person[] = [
  { uid: 'sherry', firstName: 'Sherry', lastName: 'Ford', isDependent: true, relationship: 'CHILD' },
];

export const PEOPLE: Person[] = [ACCOUNT_HOLDER, ...DEPENDENTS];

export const CARDS: CardInfo[] = [
  { cardId: 'card-frank-1234', cardLast4: '1234', cardHolderUid: 'frank' },
  { cardId: 'card-sherry-5678', cardLast4: '5678', cardHolderUid: 'sherry' },
];

export const personByUid = (uid: string) => PEOPLE.find((p) => p.uid === uid);
export const cardById = (cardId: string) => CARDS.find((c) => c.cardId === cardId);
