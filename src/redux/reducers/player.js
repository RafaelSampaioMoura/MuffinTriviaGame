import { SUBMIT_PLAYER_INFO } from '../actions';

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

export default playerInfoReducer;
