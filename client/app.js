import React from 'react';
//css
import './app.css';
// react-redux
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
//Utils
import { urlBase64ToUint8Array } from './utils/utils';
//axios
import axios from 'axios';
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
    Notification.requestPermission(result => {
      if (result !== 'granted') {
        //console.log('no notification granted!');
      } else {
        this.configurePushSub();
      }
    });
  }

  displayConfirmNotification = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(swreg => {
        swreg.showNotification('Succesfully Subcribed!', options);
      });
    }
    let options = {
      body: 'you have succesfully subscribed to our notification service',
      icon: '../static/images/icon-120x120.png',
      //image: '.../',
      vibrate: [100, 50, 100],
      badge: '../static/images/icon-120x120.png',
    };
  };

  configurePushSub = () => {
    if (!('serviceWorker' in navigator)) {
      return;
    }
    let reg;
    navigator.serviceWorker.ready
      .then(swreg => {
        reg = swreg;
        return swreg.pushManager.getSubscription();
      })
      .then(sub => {
        if (sub === null) {
          // create new subscription
          let vapidPubKey =
            'BJZp_1rq7Cjl2Ij8-9GI4UnTG2jCB5MUvWyZRFh93VP9Wy2SKjNBDqiW-X1sQHud0Pc2BmNOsylUVSDznPTGk4g';
          let convertedPubVapidkey = urlBase64ToUint8Array(vapidPubKey);
          return reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedPubVapidkey,
          });
        } else {
          //going todo something else
        }
      })
      .then(newSub => {
        const endpoint = newSub.endpoint;
        const p256dh = newSub.toJSON().keys.p256dh;
        const auth = newSub.toJSON().keys.auth;
        return axios.post('/api/subscription', { endpoint, p256dh, auth });
      })
      .then(res => {
        this.displayConfirmNotification();
      })
      .catch(e => {
        console.log('subscription error', e);
      });
  };

  render() {
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
