const API_ADDRESS = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(API_ADDRESS);
  const data = await response.json();
  return data;
};

export default getToken;
