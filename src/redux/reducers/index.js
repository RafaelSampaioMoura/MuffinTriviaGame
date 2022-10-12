import { combineReducers } from 'redux';
import playerInfoReducer from './player';
import questionsReducer from './questions';
import tokenReducer from './token';

const rootReducer = combineReducers({
  playerInfoReducer, tokenReducer, questionsReducer,
});

export default rootReducer;
