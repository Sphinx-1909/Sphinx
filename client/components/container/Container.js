import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ChannelSearch from '../Channel/SearchFrom';
//css
import './Container.css';
import MapView from '../MapView';

class Container extends React.Component {
  componentDidMount() {
    this.displayNotification();
  }

  //Testing push notification
  //https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
  displayNotification() {
    if (Notification.permission == 'granted') {
      console.log('Should have displayed notificaiton');
      navigator.serviceWorker.getRegistration().then(reg => {
        const options = {
          body:
            'The test notification worked on componentDidMount in the container',
          //sample image
          icon: 'images/example.png',
          // for phone vibration
          // vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
          },
          actions: [
            {
              action: 'explore',
              title: 'Explore this new world',
              icon: 'images/checkmark.png',
            },
            {
              action: 'close',
              title: 'Close notification',
              icon: 'images/xmark.png',
            },
          ],
        };
        reg.showNotification('Hello world!', options);
      });
    }
  }

  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route path="/" component={MapView} exact />
            <Route path="/channelsearch" component={ChannelSearch} exact />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Container;
