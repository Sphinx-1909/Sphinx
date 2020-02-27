import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  logInAttempt,
  removeLogInError,
} from '../../redux/authentication/authentication';

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  handleLogin = ev => {
    ev.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };
  render() {
    return (
      <div style={{ backgroundColor: this.state.logInError ? 'red' : 'gray' }}>
        <input name={'email'} onChange={this.handleChange} />
        <input name={'password'} onChange={this.handleChange} />
        <button onClick={ev => this.handleLogin(ev)}> Log In</button>
        <link to="/register" style={{ textDecoration: 'none' }}>
          Sign Up
        </link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const mapDispatchToProps = dispatch => {
  return {
    login: info => dispatch(logInAttempt(info)),
    removeLogInError: () => dispatch(removeLogInError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
