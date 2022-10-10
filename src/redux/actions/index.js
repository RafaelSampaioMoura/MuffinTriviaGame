import getToken from '../../services/tokenAPI';

export const SUBMIT_PLAYER_INFO = 'SUBMIT_PLAYER_INFO';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SUCCESS_TOKEN = 'SUCCESS_TOKEN';
export const FAILURE_TOKEN = 'FAILURE_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export const submitPlayerInfo = (payload) => ({
  type: SUBMIT_PLAYER_INFO,
  payload,
});

const requestToken = () => ({
  type: REQUEST_TOKEN,
});

const successToken = (payload) => ({
  type: SUCCESS_TOKEN,
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

export const fetchToken = () => async (dispatch) => {
  dispatch(requestToken());

  try {
    const response = await getToken();
    console.log(response.token);
    localStorage.setItem('token', response.token);
    dispatch(successToken(response));
  } catch (error) {
    const errorAction = failureToken(error);
    dispatch(errorAction);
  }
};

export const getQuestionsFromApi = (token) => async (dispatch) => {
  try {
    const URL_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL_QUESTIONS);
    const data = await response.json();
    dispatch(getQuestions(data));
  } catch (error) {
    console.log(error);
  }
};
