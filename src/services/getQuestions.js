const getQuestions = async () => {
  try {
    const token = localStorage.getItem('token');
    const URL_QUESTIONS = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const response = await fetch(URL_QUESTIONS);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default getQuestions;
