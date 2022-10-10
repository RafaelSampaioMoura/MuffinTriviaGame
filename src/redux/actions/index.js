import getToken from '../../services/tokenAPI';

export const SUBMIT_PLAYER_INFO = 'SUBMIT_PLAYER_INFO';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SUCCESS_TOKEN = 'SUCCESS_TOKEN';
export const FAILURE_TOKEN = 'FAILURE_TOKEN';

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