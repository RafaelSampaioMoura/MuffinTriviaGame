import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from '../components/Timer';
import Header from '../components/Header';
import { getQuestionsFromApi } from '../redux/actions';

class Game extends Component {
  state = {
    questionsLocal: [],
    currentQuestion: {},
    answerLocal: [],
    correctAnswer: '',
    loading: false,
    isActive: false,
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
    const { questionsLocal } = this.state;
    console.log(questionsLocal);
    const answersShuffled = this.shuffleArray([
      questionsLocal[0].correct_answer,
      ...questionsLocal[0].incorrect_answers,
    ]);
    this.setState({
      currentQuestion: questionsLocal[0],
      answerLocal: answersShuffled,
      correctAnswer: questionsLocal[0].correct_answer,
      loading: false,
    });
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

  render() {
    const { answerLocal,
      correctAnswer,
      currentQuestion,
      loading,
      isActive } = this.state;

    return (
      <div>
        <Timer handleAnswer={ this.handleAnswer } />
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
                    onClick={ this.handleAnswer }
                    style={ {
                      border: isActive ? '3px solid rgb(6, 240, 15)' : '',
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
                    onClick={ this.handleAnswer }
                    style={ {
                      border: isActive ? '3px solid red' : '',
                    } }
                    disabled={ isActive }
                  >
                    {answer}
                  </button>)
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape).isRequired,
    code: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questionsReducer,
  token: state.tokenReducer.token,
});

export default connect(mapStateToProps)(Game);
