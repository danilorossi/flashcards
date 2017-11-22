/**
* The initial state for the Redux store.
*/
export default {

  decks: [], // { id, name, cards: [] }

  quiz: {
    deck: null, // ref of the deck
    questionIndex: 0,
    answers: [], // each index, TRUE or FALSE, maintain relationship with question
    finished: false
  }
};
