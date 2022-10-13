import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleReturnBtn = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        Ranking:
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleReturnBtn }
        >
          Back to Login
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape([]).isRequired,
};

export default connect()(Ranking);
