import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { withRouter } from 'react-router-dom';

class Header extends Component {
  handleImg = () => {
    const { player: { gravatarEmail } } = this.props;
    const generateHash = md5(gravatarEmail).toString();
    const linkImg = `https://www.gravatar.com/avatar/${generateHash}`;
    return linkImg;
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { player: { name, score } } = this.props;
    return (
      <div>
        <img
          src={ this.handleImg() }
          alt="gravatar-imagen"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClick }
        >
          Ranking

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(withRouter(Header));
