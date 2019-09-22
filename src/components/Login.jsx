import React, { Component } from 'react';
import { logUser } from '../utils';
import { Redirect } from 'react-router-dom';
import '../stylesheets/login.css';
import users from '../users';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: null,
    loggedIn: false
  }

  validateLogin = (email, password) => {
    const user = users.find(user => {
      return user.email === email && user.password === password
    });

    return user;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    const user = this.validateLogin(email, password)

    if (user) {
      this.setState({ loggedIn: true, error: null }, () => {
        logUser(user);
      });

    } else {
      this.setState({ error: 'Invalid email or password!' });
    }
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  render() {
    const { email, password, error, loggedIn } = this.state;

    return (
      loggedIn ? <Redirect to="/" /> :

      <div className="login-container">
        <h1 className="big-title">CloneFlix</h1>

        <form onSubmit={this.handleSubmit}>
          {error && <span className="alert alert-danger">{error}</span>}
          <input className="input-email" type="text" name="email" value={email}
            onChange={this.handleEmailChange} placeholder="Email" />
          <input className="input-password" type="password" autoComplete="off" name="password"
            value={password} onChange={this.handlePasswordChange} placeholder="Password" />
          <input type="submit" className="btn btn-danger btn-login" value="Login" />
        </form>
      </div>
    );
  }
}

export default Login;
