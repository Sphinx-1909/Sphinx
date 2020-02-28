import React from 'react';
//css
import './app.css';

// react-redux
import { connect } from 'react-redux';
//component
import BottomMenu from './components/BottomMenu/BottomMenu';
import Burger from './components/Burger/Burger';
import Container from './components/container/Container';
import SlideMenu from './components/SlideMenu/SlideMenu';
import { initialLogInAttempt } from './redux/authentication/authentication';
import LogIn from './components/login/login';

class App extends React.Component {
  componentDidMount() {
    console.log('props in CDM', this.props);
    this.props.initialLogInAttempt();
    // Request to get notifications
    Notification.requestPermission(function(status) {
      console.log('Notification permission status:', status);
    });
  }

  render() {
    console.log('props in render', this.props);
    return (
      <div className="main">
        <Burger openSlide={this.props.openSlide} />
        <SlideMenu openSlide={this.props.openSlide} />
        <Container />
        <BottomMenu />

        {this.props.activeUser.id ? 'Hi User' : <LogIn />}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    initialLogInAttempt: () => dispatch(initialLogInAttempt()),
  };
};
const mapStateToProps = state => ({
  openSlide: state.nav.displaySlideMenu,
  displayOverlay: state.nav.displayOverlay,
  activeUser: state.activeUser,
  authentication: state.authentication,
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
