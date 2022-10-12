import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  handleImg = () => {
    const { player: { gravatarEmail } } = this.props;
    const generateHash = md5(gravatarEmail).toString();
    const linkImg = `https://www.gravatar.com/avatar/${generateHash}`;
    return linkImg;
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatarEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
