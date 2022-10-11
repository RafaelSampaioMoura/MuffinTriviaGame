import { FAILURE_TOKEN, REQUEST_TOKEN, SUCCESS_TOKEN } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  ranking: [],
  token: '',
  responseCode: 0,
  isFetching: false,
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

export default tokenReducer;
