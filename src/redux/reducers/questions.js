import { GET_QUESTIONS } from '../actions';

const INITIAL_QUESTIONS_STATE = {
  code: '',
  questions: [],
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

export default questionsReducer;
