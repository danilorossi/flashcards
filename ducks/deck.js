import uuid from 'uuid';

// Actions
const CREATE_DECK = 'flashcards/decks/CREATE_DECK';

// Reducer
export default function reducer(state = [], action = {}) {

  switch (action.type) {

    case CREATE_DECK:
      return state.concat({
        id: uuid.v4(),
        name: action.name,
        cards: []
      });

    default: return state;
  }
}

// Action Creators
export function createDeck(name) {
  return { type: CREATE_DECK, name };
}
