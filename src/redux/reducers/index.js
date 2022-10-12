import { combineReducers } from 'redux';
import player from './player';
import questionsReducer from './questions';
import tokenReducer from './token';

const rootReducer = combineReducers({
  player, tokenReducer, questionsReducer,
});

export default rootReducer;
