import { combineReducers } from 'redux';
import { FAILURE_TOKEN, REQUEST_TOKEN, SUCCESS_TOKEN } from '../actions';
import INITIAL_STATE from './initialState';

const nameReducer = (state = INITIAL_STATE.player, action) => {
  switch (action.type) {
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

const rootReducer = combineReducers({ nameReducer, tokenReducer });

export default rootReducer;
