import React, { Component } from 'react';
import axios from 'axios';

export default class LogIn extends Component {
  state = {
    email: '',
    password: '',
    loggedIn: false,
    logInError: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      logInError: false,
      [name]: value,
    });
  };
  handleLogin = ev => {
    // ev.preventDefault();
    // const {email, password} = this.state;
    // if ()
    axios.post('/login', this.state).then(() => {
      this.setState({
        loggedIn: true,
        logInError: false,
      }).catch(() => {
        this.setState({
          logInError: true,
        });
      });
    });
  };
  render() {
    return (
      <div style={{ backgroundColor: this.state.logInError ? 'red' : 'gray' }}>
        <input name={'email'} onChange={this.handleChange} />
        <input name={'password'} onChange={this.handleChange} />
        <button> Login</button>
      </div>
    );
  }
}
