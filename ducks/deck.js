import uuid from 'uuid';

// Actions
const CREATE_DECK = 'flashcards/decks/CREATE_DECK';
const DELETE_DECK = 'flashcards/decks/DELETE_DECK';
const ADD_CARD = 'flashcards/decks/ADD_CARD';

// Reducer
export default function reducer(state = [], action = {}) {

  switch (action.type) {

    case CREATE_DECK:
      return state.concat({
        id: uuid.v4(),
        name: action.name,
        cards: [],
        ts: Date.now()
      })
      .sort((a,b) =>
        ((a.ts > b.ts) ? -1 : ((b.ts > a.ts) ? 1 : 0))
      );

    case DELETE_DECK:
      return state.filter((deck) => deck.id !== action.deck.id);

    case ADD_CARD:
      return state.map((deck) => {
        if (deck.id === action.deckId) {
          return {
            ...deck,
            cards: deck.cards.concat({
              answer: action.answer,
              question: action.question
            })
          }
        } else {
          return deck;
        }
      });

    default:
      return state;
  }
}

// Action Creators
export function createDeck(name) {
  return { type: CREATE_DECK, name };
}
export function deleteDeck(deck) {
  return { type: DELETE_DECK, deck };
}
export function addCard(question, answer, deckId) {
  return { type: ADD_CARD, question, answer, deckId };
}
