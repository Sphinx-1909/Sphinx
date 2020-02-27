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

class App extends React.Component {
  async componentDidMount() {
    await this.props.fetchChannels()
    // Request to get notifications
    Notification.requestPermission(function (status) {
      console.log('Notification permission status:', status);
    });
  }

  render() {
    return (
      <div className="main">
        <Burger openSlide={this.props.openSlide} />
        <SlideMenu openSlide={this.props.openSlide} />
        <Container />
        <BottomMenu />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  openSlide: state.nav.displaySlideMenu,
  displayOverlay: state.nav.displayOverlay,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(fetchChannels())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
