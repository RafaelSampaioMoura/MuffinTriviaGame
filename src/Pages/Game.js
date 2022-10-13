import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import Header from '../components/Header';
import { getQuestionsFromApi,
  submitPlayerScore,
  submitPlayerRanking } from '../redux/actions';

class Game extends Component {
  state = {
    questionsLocal: [],
    currentQuestion: {},
    answerLocal: [],
    correctAnswer: '',
    loading: false,
    isActive: false,
    currentQuestionIndex: 0,
    reset: false,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    await dispatch(getQuestionsFromApi(token));
    this.handleRedirect();
  }

  handleRedirect = async () => {
    const { history } = this.props;
    const errorCode = localStorage.getItem('errorCode');
    const ERROR_NUM = '3';
    if (errorCode === ERROR_NUM) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      const questionStorage = JSON.parse(localStorage.getItem('questions'));

      this.setState({
        questionsLocal: questionStorage,
        loading: true,
      }, () => {
        this.handleCurrentQuestion();
      });
    }
  };

  handleCurrentQuestion = async () => {
    const { questionsLocal, currentQuestionIndex } = this.state;
    const maxQuestions = 5;
    // console.log(questionsLocal);
    if (currentQuestionIndex < maxQuestions) {
      const answersShuffled = this.shuffleArray([
        questionsLocal[currentQuestionIndex].correct_answer,
        ...questionsLocal[currentQuestionIndex].incorrect_answers,
      ]);
      this.setState({
        currentQuestion: questionsLocal[currentQuestionIndex],
        answerLocal: answersShuffled,
        correctAnswer: questionsLocal[currentQuestionIndex].correct_answer,
        loading: false,
        isActive: false,
      });
    } else {
      const { history, player, dispatch } = this.props;
      // console.log(player);
      dispatch(submitPlayerRanking(player));
      history.push('/feedback');
    }
  };

  shuffleArray = (questionsArray) => {
    const MIN_RANDOM = 0.5;
    const NEGATIVE_NUMBER = -1;
    const shuffledArray = questionsArray.sort(() => (
      Math.random() > MIN_RANDOM ? 1 : NEGATIVE_NUMBER
    ));
    return shuffledArray;
  };

  handleAnswer = () => {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
    }));
  };

  handlePonctuation = (questionDifficulty, timer) => {
    // const { isActive } = this.state;
    const { dispatch, score } = this.props;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    let difficultyPoints;

    if (questionDifficulty === 'hard') {
      difficultyPoints = hard;
    } else if (questionDifficulty === 'easy') {
      difficultyPoints = easy;
    } else {
      difficultyPoints = medium;
    }
    const basePoints = 10;
    const totalPoints = score + (basePoints + (difficultyPoints * timer));
    // console.log(questionDifficulty);
    // console.log(totalPoints);
    // console.log(score);
    dispatch(submitPlayerScore(totalPoints));
    // console.log(score);
  };

  handleResetCounter = () => {
    const { reset } = this.state;
    this.setState((prevState) => ({
      reset: !prevState.state,
    }));
    console.log(reset);
  };

  handleNextQuestion = () => {
    this.handleResetCounter();
    this.setState((prevState) => ({
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      reset: !prevState.state,
    }));
    this.handleRedirect();
  };

  render() {
    const { answerLocal,
      correctAnswer,
      currentQuestion,
      loading,
      isActive,
      initCounter,
      reset,
    } = this.state;

    return (
      <div>
        <Timer
          handleAnswer={ this.handleAnswer }
          reset={ reset }
          initCounter={ initCounter }
        />
        <Header />
        {loading && <p>Loading...</p>}
        <div>
          <h1 data-testid="question-category">
            {currentQuestion.category}
          </h1>
          <h2 data-testid="question-text">
            {currentQuestion.question}
          </h2>
          <div data-testid="answer-options" id="teste">
            {answerLocal.map((answer, index) => (
              answer === correctAnswer
                ? (
                  <button
                    data-testid="correct-answer"
                    type="button"
                    key={ answer }
                    onClick={ () => {
                      const timerCount = Number(
                        document.querySelector('#timer').textContent,
                      );
                      // console.log(timerCount);
                      this.handleAnswer();
                      this.handlePonctuation(currentQuestion.difficulty, timerCount);
                    } }
                    style={ {
                      // border: isActive ? '3px solid rgb(6, 240, 15)' : '',
                      border: '3px solid rgb(6, 240, 15)',
                    } }
                    disabled={ isActive }
                  >
                    {answer}
                  </button>)
                : (
                  <button
                    data-testid={ `wrong-answer-${index}` }
                    type="button"
                    key={ answer }
                    onClick={ () => { this.handleAnswer(); } }
                    style={ {
                      border: isActive ? '3px solid red' : '',
                    } }
                    disabled={ isActive }
                  >
                    {answer}
                  </button>)
            ))}
          </div>
          { isActive ? (
            <button
              data-testid="btn-next"
              onClick={ this.handleNextQuestion }
              type="button"
            >
              Next
            </button>) : ''}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape).isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    assertions: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questionsReducer,
  token: state.tokenReducer.token,
  score: state.player.score,
  player: state.player,
});

export default connect(mapStateToProps)(Game);
