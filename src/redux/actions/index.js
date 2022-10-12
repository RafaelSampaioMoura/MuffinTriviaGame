import getToken from '../../services/tokenAPI';

export const SUBMIT_PLAYER_INFO = 'SUBMIT_PLAYER_INFO';
export const SUBMIT_PLAYER_SCORE = 'SUBMIT_PLAYER_SCORE';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SUCCESS_TOKEN = 'SUCCESS_TOKEN';
export const FAILURE_TOKEN = 'FAILURE_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const submitPlayerInfo = (payload) => ({
  type: SUBMIT_PLAYER_INFO,
  payload,
});

export const submitPlayerScore = (payload) => ({
  type: SUBMIT_PLAYER_SCORE,
  payload,
});

const failureToken = (errorMessage) => ({
  type: FAILURE_TOKEN,
  error: errorMessage,
});

const getQuestions = (payload) => ({
  type: GET_QUESTIONS,
  payload,
});

export const getQuestionsFromApi = (token) => async (dispatch) => {
  try {
    const URL_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL_QUESTIONS);
    const data = await response.json();

    localStorage.setItem('errorCode', data.response_code);
    localStorage.setItem('questions', JSON.stringify(data.results));
    dispatch(getQuestions(data));
    console.log('getQuestions');
  } catch (error) {
    console.log(error);
  }
};

export const fetchToken = () => async (dispatch) => {
  try {
    const response = await getToken();
    localStorage.setItem('token', response.token);
    // await dispatch(getQuestionsFromApi());
    // dispatch(successToken(response));
    console.log('FetchToken');
  } catch (error) {
    const errorAction = failureToken(error);
    dispatch(errorAction);
  }
};
