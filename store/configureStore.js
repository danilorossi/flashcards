import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import decks from '../ducks/deck';
import quiz from '../ducks/quiz';

export default function configureStore(initialState = {}) {

  // Combine reducers into the root one
  const rootReducer = combineReducers({
    decks,
    quiz
  });

  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Return createStore utility
  return createStore(
      rootReducer,
      initialState,
      // composeEnhancers(
      //   applyMiddleware(
      //   )
      // )

  );
}
