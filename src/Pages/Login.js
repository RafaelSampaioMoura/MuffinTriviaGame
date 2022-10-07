import React, { Component } from "react";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: "",
      playerEmail: "",
    };
  }

  handleInput = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { playerName, playerEmail } = this.state;
    const playerNameValidation = String(playerName).length > 0;
    const playerEmailValidation = String(playerEmail)
      .toLowerCase()
      .match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
    const enable = playerNameValidation && playerEmailValidation;
    return (
      <>
        <h3>Login</h3>
        <form>
          <label htmlFor='input-player-name'>
            Nome:
            <input
              type='text'
              name='playerName'
              id='input-player-name'
              data-testid='input-player-name'
              onChange={this.handleInput}
            />
          </label>
          <label htmlFor='input-gravatar-email'>Email:
            <input
              type='email'
              name='playerEmail'
              id='input-gravatar-email'
              data-testid='input-gravatar-email'
              onChange={this.handleInput}
            />
          </label>
          <button
            type='submit'
            data-testid='btn-play'
            onClick={this.handleSubmit}
            disabled={!enable}
          >
            Play
          </button>
        </form>
      </>
    );
  }
}

export default Login;
