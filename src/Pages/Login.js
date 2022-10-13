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
    const { dispatch, history } = this.props;
    await dispatch(submitPlayerInfo({ ...this.state }));
    await dispatch(fetchToken());
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
    return (

      <div
        className="
      flex flex-col flex-wrap w-screen h-screen pt-36
      justify-center align-center bg-green-200
      bg-hero bg-cover"
      >
        <form className="form flex flex-col gap-4 mx-auto">
          <img
            src="../img/image.png"
            className="w-40 mx-auto"
            alt="logo"
          />
          {/* <h3 className="text-4xl text-center w-full text-white">Login</h3> */}
          <div
            className="
            flex flex-col flex-wrap mx-auto justify-center align-center gap-2
          "
          >
            <label
              htmlFor="input-player-name"
              className="text-white"
            >
              Nome:
              <input
                type="text"
                name="playerName"
                id="input-player-name"
                data-testid="input-player-name"
                onChange={ this.handleInput }
                className="input input-bordered text-black"
              />
            </label>
            <label
              htmlFor="input-gravatar-email"
              className="justify-self-end text-white"
            >
              Email:
              <input
                type="email"
                name="playerEmail"
                id="input-gravatar-email"
                data-testid="input-gravatar-email"
                onChange={ this.handleInput }
                className="input input-bordered ml-1 text-black"
              />
            </label>
          </div>
          <button
            type="submit"
            data-testid="btn-play"
            onClick={ this.handleSubmit }
            disabled={ !enable }
            className="btn btn-primary disabled:bg-slate-200 disabled:text-slate-400"
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            type="submit"
            onClick={ this.btnSettings }
            className="btn btn-secondary"
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Login);
