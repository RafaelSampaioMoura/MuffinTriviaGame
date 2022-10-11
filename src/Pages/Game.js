import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getQuestionsFromApi } from '../redux/actions';

class Game extends Component {
  state = {
    questions: [],
    loading: false,
  };

  componentDidMount() {
    this.handleQuestions();
  }

  handleQuestions = async () => {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');
    dispatch(getQuestionsFromApi(token));
    // this.setState({
    //   loading: true,
    // }, async () => {
    // const questions = await getQuestions();
    // console.log(questions);
    // if (questions.response_code === 0) {
    //   this.setState({
    //     questions: questions.results,
    //     loading: false,
    //   }, () => { console.log(questions.results); });
    // } else {
    //   localStorage.removeItem('token');
    //   history.push('/');
    // }
  // });
  };

  render() {
    const { questions, loading } = this.state;
    return (
      <div>
        <Header />
        <div>
          {loading && <p>Loading</p>}
          {!loading && (
            <div>
              <p data-testid="question-category">
                {questions[0]?.category}

              </p>
            </div>)}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
