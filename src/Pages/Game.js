import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import Header from '../components/Header';
import {
  getQuestionsFromApi, submitPlayerScore, submitPlayerRanking } from '../redux/actions';


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
    dispatch(submitPlayerScore(totalPoints));
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
      <div className="bg-hero bg-cover w-screen h-screen text-white overflow-hidden">
        <Header />
        <div className="flex flex-wrap flex-row w-full h-full mx-0">
          {loading && <p>Loading...</p>}
          <div
            className="card flex flex-wrap
          w-1/3 h-96 ml-16 mt-32 pt-12 pb-12
          bg-slate-100 text-slate-900"
          >
            <div
              className="flex flex-wrap justify-center rounded-xl bg-orange-400
               text-center -mt-10 mb-12 mx-12"
            >
              <h1
                data-testid="question-category"
                className="text-2xl text-center"
              >
                {currentQuestion.category}
              </h1>
            </div>
            <div className="flex flex-wrap justify-center align-center mx-auto">
              <h2 data-testid="question-text" className="text-xl px-4">
                {currentQuestion.question}
              </h2>
            </div>
            <div className="mt-12 text-center">
              <Timer
                handleAnswer={ this.handleAnswer }
                reset={ reset }
                initCounter={ initCounter }
              />
            </div>
          </div>
          <div
            data-testid="answer-options"
            id="teste"
            className="flex flex-wrap flex-col w-1/3 mt-36 mx-auto"
          >
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
                      this.handleAnswer();
                      this.handlePonctuation(currentQuestion.difficulty, timerCount);
                    } }
                    style={ {
                      border: isActive ? '3px solid rgb(6, 240, 15)' : '',
                    } }
                    disabled={ isActive }
                    className="btn my-2 disabled:bg-slate-200 disabled:text-slate-400"
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
                    className="btn my-2 disabled:bg-slate-200 disabled:text-slate-400"
                  >
                    {answer}
                  </button>)
            ))}
            { isActive ? (
              <button
                data-testid="btn-next"
                onClick={ this.handleNextQuestion }
                type="button"
                className="btn btn-primary my-2
                disabled:bg-slate-200 disabled:text-slate-400"
              >
                Next
              </button>) : ''}
          </div>
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
