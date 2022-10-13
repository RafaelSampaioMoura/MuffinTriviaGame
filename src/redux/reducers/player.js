import INITIAL_STATE from './initialState';
import { SUBMIT_PLAYER_INFO, SUBMIT_PLAYER_SCORE } from '../actions';

const player = (state = INITIAL_STATE.player, action) => {
  switch (action.type) {
  case SUBMIT_PLAYER_INFO:
    return {
      ...state,
      name: action.payload.playerName,
      gravatarEmail: action.payload.playerEmail,
    };
  case SUBMIT_PLAYER_SCORE:
    return {
      ...state,
      score: action.payload,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;
