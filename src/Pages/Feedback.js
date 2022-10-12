import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

const mapStateToProps = ({ player: { assertions, score } }) => ({ assertions, score });

class Feedback extends Component {
  render() {
    const { assertions, score } = this.props;
    const acceptableLimit = 3;
    return (
      <>
        <Header />
        { assertions >= acceptableLimit
          ? <h2 data-testid="feedback-text">Well done!</h2>
          : <h2 data-testid="feedback-text">Could be better...</h2>}
        <div>
          <h3 data-testid="feedback-total-score">
            Pontuação :
            <span>{ score }</span>
          </h3>
          <h3 data-testid="feedback-total-question">
            Quantidade de respostas corretas:
            <span>{ assertions }</span>
          </h3>

        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
