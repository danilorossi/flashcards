import { combineReducers } from 'redux';

// Combine reducers into the root one
const rootReducer = combineReducers({

  decks: (state = {}, action) => state // TEMP
});

export default rootReducer;
