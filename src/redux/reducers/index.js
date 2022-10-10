import { combineReducers } from 'redux';
import {
  FAILURE_TOKEN,
  REQUEST_TOKEN,
  SUCCESS_TOKEN,
  SUBMIT_PLAYER_INFO,
  GET_QUESTIONS,
} from '../actions';
import INITIAL_QUESTIONS_STATE from './initialQuestionsState';
import INITIAL_STATE from './initialState';

const playerInfoReducer = (state = INITIAL_STATE.player, action) => {
  switch (action.type) {
  case SUBMIT_PLAYER_INFO:
    return {
      ...state,
      name: action.payload.playerName,
      gravatarEmail: action.payload.playerEmail,
    };
  default:
    return state;
  }
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isFetching: true,
    };
  case SUCCESS_TOKEN:
    return {
      ...state,
      token: action.payload.token,
      isFetching: false,
    };
  case FAILURE_TOKEN:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};

const questionsReducer = (state = INITIAL_QUESTIONS_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      code: action.payload.response_code,
      questions: action.payload.results,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  playerInfoReducer, tokenReducer, questionsReducer,
});

export default rootReducer;
