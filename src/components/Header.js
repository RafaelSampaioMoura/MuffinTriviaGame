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
      <div
        className="
      flex flex-wrap flex-row
      justify-end gap-12 align-center pr-16
      bg-slate-100 text-slate-900
      py-4"
      >
        <img
          src={ this.handleImg() }
          alt="gravatar-imagen"
          data-testid="header-profile-picture"
          className="w-24 mask mask-hexagon"
        />
        <span
          data-testid="header-player-name"
          className="self-center font-bold text-lg"
        >
          { name }

        </span>
        <div className="rating">
          <input
            type="radio"
            name="rating-2"
            className="mask mask-star-2 bg-orange-400 self-center -mr-10"

          />
        </div>
        <span
          data-testid="header-score"
          className="self-center font-bold text-lg"
        >
          { score }

        </span>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClick }
          className="btn btn-info self-center"
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
