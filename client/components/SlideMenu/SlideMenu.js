import React from 'react';
import { connect } from 'react-redux';
//css
import './SlideMenu.css';
//import { StyledMenu } from './Menu.styled';
import { Link } from 'react-router-dom';

import { logOutAttempt } from '../../redux/authentication/authentication';
class SlideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loginStatus = () => {
    const { authentication } = this.props;
    //console.log('this.props have authentication?', this.props);
    const { isLoggedIn } = authentication;
    if (isLoggedIn) {
      return (
        <div>
          <a href="/account" style={{ textDecoration: 'none' }}>
            Account
          </a>
          <button onClick={this.props.signout}>Log Out!</button>
        </div>
      );
    }
    return (
      <div>
        <Link to="/login">
          <button>Log in / Register</button>
        </Link>
      </div>
    );
  };

  render() {
    const { authenticaion } = this.props;
    return (
      <div
        className="slideMenu"
        style={{
          transform: this.props.openSlide
            ? 'translateX(0)'
            : 'translateX(-100%)',
        }}
      >
        <Link to="/mychannels">
          <a>CHANNELS</a>
        </Link>
        <a>SETTINGS</a>
        {this.loginStatus()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(logOutAttempt()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideMenu);
