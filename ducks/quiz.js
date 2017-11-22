import initialState from '../store/initialState';
// Actions
const START_QUIZ = 'flashcards/quiz/START_QUIZ';
const SUBMIT_ANSWER = 'flashcards/quiz/SUBMIT_ANSWER';

// Reducer
export default function quiz(state = initialState.quiz, action = {}) {

  switch (action.type) {

    case START_QUIZ:
      return {
        ...initialState.quiz,
        deck: action.deck
      }

    case SUBMIT_ANSWER:
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        answers: state.answers.concat(action.answer),
        finished: state.questionIndex === state.deck.cards.length - 1
      }

    default:
      return state;
  }
}

// Action Creators
export function startQuiz(deck) {
  return { type: START_QUIZ, deck };
}
export function submitAnswer(answer) {
  return { type: SUBMIT_ANSWER, answer };
}
