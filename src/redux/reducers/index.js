import { combineReducers } from 'redux';
import md5 from 'crypto-js/md5';
import {
  FAILURE_TOKEN,
  REQUEST_TOKEN,
  SUCCESS_TOKEN,
  SUBMIT_PLAYER_INFO,
} from '../actions';
import INITIAL_STATE from './initialState';

const playerInfoReducer = (state = INITIAL_STATE.player, action) => {
  switch (action.type) {
  case SUBMIT_PLAYER_INFO:
    return {
      ...state,
      name: action.payload.playerName,
      gravatarEmail: md5(action.payload.playerEmail).toString(),
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
      responseCode: action.payload.response_code,
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

const rootReducer = combineReducers({ playerInfoReducer, tokenReducer });

export default rootReducer;
