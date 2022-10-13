import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const mapStateToProps = ({ player: { assertions, score } }) => ({ assertions, score });

class Feedback extends Component {
  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { assertions, score } = this.props;
    const acceptableLimit = 3;
    return (
      <>
        <Header />
        {assertions >= acceptableLimit
          ? <h2 data-testid="feedback-text">Well Done!</h2>
          : <h2 data-testid="feedback-text">Could be better...</h2>}
        <div>
          <h3 data-testid="feedback-total-score">
            {score}
          </h3>
          <h3 data-testid="feedback-total-question">
            {assertions}
          </h3>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handlePlayAgain }
          >
            Play Again
          </button>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
