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
import { fetchChannels } from './redux/channels'
import { fetchUnreadMessages } from './redux/messages';
import { initialLogInAttempt } from './redux/authentication/authentication';
import LogIn from './components/login/login';

class App extends React.Component {
  async componentDidMount() {
    await this.props.initialLogInAttempt();
    await this.props.fetchChannels()
    await this.props.fetchUnreadMessages()
    
    // Request to get notifications
    Notification.requestPermission(function (status) {
      console.log('Notification permission status:', status);
    });
  }

  render() {
    console.log('props in render', this.props);
    return (
      <main>
        <div className="main">
          <Burger openSlide={this.props.openSlide} />
          <SlideMenu openSlide={this.props.openSlide} />
          <Container />
          <BottomMenu />
<div style={{ backgroundColor: 'white' }}>
          {this.props.activeUser.id ? (
            `${this.props.activeUser.firstName}`
          ) : (
            <LogIn />
          )}
        </div>
        </div>
      </main>
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

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(fetchChannels()),
    fetchUnreadMessages: () => dispatch(fetchUnreadMessages())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
