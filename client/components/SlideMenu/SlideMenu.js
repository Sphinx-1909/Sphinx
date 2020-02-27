import React from 'react';
import { connect } from 'react-redux';
//css
import './SlideMenu.css';
//import { StyledMenu } from './Menu.styled';
import { Link } from 'react-router-dom';
import LogIn from '../login/login';
import { logOutAttempt } from '../../redux/authentication/authentication';
class SlideMenu extends React.Component {
  loginStatus = () => {
    const { authentication } = this.props;
    console.log(authentication);
    // const { isLoggedIn } = authentication;
    //   if (isLoggedIn) {
    //     return (
    //       <div>
    //         <Link to="/account" style={{ textDecoration: 'none' }}>
    //           Account
    //         </Link>
    //         <Button onClick={this.props.signout}>Log Out!</Button>
    //       </div>
    //     );
    //   }
    //   return (
    //     <div>
    //       <Link to="/login" style={{ textDecoration: 'none' }}>
    //         <Button>Log in / Register</Button>
    //       </Link>
    //     </div>
    //   );
    // };
  };
  render() {
    return (
      <div
        className="slideMenu"
        style={{
          transform: this.props.openSlide
            ? 'translateX(0)'
            : 'translateX(-100%)',
        }}
      >
        <a>CHANNELS</a>
        <a>SETTINGS</a>
        {/*} {this.loginStatus()}*/}
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
