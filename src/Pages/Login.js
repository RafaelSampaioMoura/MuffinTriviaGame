import React, { Component } from 'react';
// import getToken from '../services/tokenAPI';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken, submitPlayerInfo } from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: '',
      playerEmail: '',
    };
  }

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // const { playerName, playerEmail } = this.state;
    const { dispatch, history } = this.props;
    dispatch(submitPlayerInfo({ ...this.state }));
    dispatch(fetchToken());
    history.push('/game');
  };

  btnSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { playerName, playerEmail } = this.state;
    const playerNameValidation = String(playerName).length > 0;
    const playerEmailValidation = String(playerEmail)
      .toLowerCase()
      .match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    const enable = playerNameValidation && playerEmailValidation;
    // console.log(fetchToken());
    // console.log(this.props);
    return (
      <>
        <h3>Login</h3>
        <form>
          <label htmlFor="input-player-name">
            Nome:
            <input
              type="text"
              name="playerName"
              id="input-player-name"
              data-testid="input-player-name"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            Email:
            <input
              type="email"
              name="playerEmail"
              id="input-gravatar-email"
              data-testid="input-gravatar-email"
              onChange={ this.handleInput }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            onClick={ this.handleSubmit }
            disabled={ !enable }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="submit"
            onClick={ this.btnSettings }
          >
            Settings
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
  // responseCode: state.tokenReducer.responseCode,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Login);
