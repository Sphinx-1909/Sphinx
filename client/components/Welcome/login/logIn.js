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
      <div className="liner">
        <div className="contentCenter">
          <form onSubmit={ev => this.handleLogin(ev)}>
            <div className="login_subHeader">SIGN IN</div>
            <input type="email" name={'email'} onChange={this.handleChange} />
            <input
              type="password"
              name={'password'}
              onChange={this.handleChange}
            />
            <div className="login_buttons">
              <button
                className="login_buttons_links"
                onClick={ev => this.handleLogin(ev)}
              >
                Log In
              </button>

              <button
                className="login_buttons_links"
                onClick={() => history.push('/signup')}
              >
                Sign up
              </button>
            </div>
            {/* <a href="/register" style={{ textDecoration: 'none' }}>
          Sign Up
        </a> */}
          </form>
        </div>
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
