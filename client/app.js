import React from 'react';
//css
import './app.css';
// react-redux
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
//component
import BottomMenu from './components/BottomMenu/BottomMenu';
import Burger from './components/Burger/Burger';
//import Container from './components/container/Container';
import SlideMenu from './components/SlideMenu/SlideMenu';
import MapView from './components/MapView';
import LogIn from './components/login/logIn';
import ChannelSearch from './components/Channel/SearchForm';
import AddMessage from './components/message/AddMessage';
import { fetchChannels } from './redux/channels';
import { fetchUnreadMessages } from './redux/messages';
import { initialLogInAttempt } from './redux/authentication/authentication';

class App extends React.Component {
  async componentDidMount() {
    await this.props.initialLogInAttempt();
    await this.props.fetchChannels();
    await this.props.fetchUnreadMessages();
    // Request to get notifications
    Notification.requestPermission(function (status) {
      console.log('Notification permission status:', status);
    });
  }

  //Testing push notification
  //https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
  // displayNotification() {
  //   if (Notification.permission == 'granted') {
  //     console.log('Should have displayed notificaiton');
  //     navigator.serviceWorker.getRegistration().then(reg => {
  //       const options = {
  //         body:
  //           'The test notification worked on componentDidMount in the container',
  //         //sample image
  //         icon: 'images/example.png',
  //         // for phone vibration
  //         // vibrate: [100, 50, 100],
  //         data: {
  //           dateOfArrival: Date.now(),
  //           primaryKey: 1,
  //         },
  //         actions: [
  //           {
  //             action: 'explore',
  //             title: 'Explore this new world',
  //             icon: 'images/checkmark.png',
  //           },
  //           {
  //             action: 'close',
  //             title: 'Close notification',
  //             icon: 'images/xmark.png',
  //           },
  //         ],
  //       };
  //       reg.showNotification('Hello world!', options);
  //     });
  //   }
  // }

  render() {
    console.log('props in render', this.props);
    return (
      <main>
        <div className="main">
          <Burger openSlide={this.props.openSlide} />
          <SlideMenu openSlide={this.props.openSlide} />
          <div className="container">
            <Route path="/" component={MapView} exact />
            <Route path="/post" component={AddMessage} exact />
            <Route path="/channelsearch" component={ChannelSearch} exact />
            <Route path="/login" component={LogIn} exact />
          </div>
          <BottomMenu />
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  openSlide: state.nav.displaySlideMenu,
  displayOverlay: state.nav.displayOverlay,
  activeUser: state.activeUser,
  authentication: state.authentication,
});

const mapDispatchToProps = dispatch => {
  return {
    initialLogInAttempt: () => dispatch(initialLogInAttempt()),
    fetchChannels: () => dispatch(fetchChannels()),
    fetchUnreadMessages: () => dispatch(fetchUnreadMessages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);