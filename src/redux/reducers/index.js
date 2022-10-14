import { combineReducers } from 'redux';
import player from './player';
import questionsReducer from './questions';
import tokenReducer from './token';
import rankingReducer from './ranking';

const rootReducer = combineReducers({
  player, tokenReducer, questionsReducer, rankingReducer,
});

export default rootReducer;
