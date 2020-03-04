import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  logInAttempt,
  removeLogInError,
} from '../../redux/authentication/authentication';
import './logIn.css';
import history from '../../history';

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
  componentWillUpdate(prevProps) {
    if (prevProps.authentication.isLoggedIn === true) {
      history.push('/');
    }
  }

  render() {
    return (
      <div className="logInUser">
        <form onSubmit={ev => this.handleLogin(ev)} className="logInUser_form">
          <h3>Sign into your account</h3>
          <input type="email" name={'email'} onChange={this.handleChange} />
          <input
            type="password"
            name={'password'}
            onChange={this.handleChange}
          />
          <button onClick={ev => this.handleLogin(ev)}> Log In</button>

          <button onClick={() => history.push('/signup')}> Sign up</button>

          {/* <a href="/register" style={{ textDecoration: 'none' }}>
          Sign Up
        </a> */}
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
