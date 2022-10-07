import { combineReducers } from 'redux';
import INITIAL_STATE from './initialState';

const nameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({ nameReducer });

export default rootReducer;
