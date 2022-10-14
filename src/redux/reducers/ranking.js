import INITIAL_STATE from './initialState';
import { PLAYER_RANKING } from '../actions';

const rankingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_RANKING:
    return {
      ...state,
      ranking: [...state.ranking, action.payload],
    };
  default:
    return state;
  }
};

export default rankingReducer;
