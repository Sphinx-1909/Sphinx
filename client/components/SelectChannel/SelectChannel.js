import React from 'react';
//css
import './SelectChannel.css';
//React-redux
import { connect } from 'react-redux';
//react-router-dom
import { withRouter } from 'react-router-dom';
import history from '../../history';
//actions
import {
  setCurrentLocation,
  setMediaType,
  setChannel,
} from '../../redux/nav/action/nav.action';

class SelectChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
    };
  }

  componentDidMount() {
    this.grabLocation();
  }

  grabLocation = () => {
    console.log('getting location data');
    navigator.geolocation.getCurrentPosition(
      pos => {
        const {
          coords: { latitude, longitude },
        } = pos;
        this.setState({
          latitude: latitude,
          longitude: longitude,
        });
        console.log('lat', pos.coords.latitude, 'lng', pos.coords.longitude);
        this.props.setCurrentLocation({
          latitude: latitude,
          longitude: longitude,
        });
      },
      () => {
        console.log('did load geo');
      },
      { enableHighAccuracy: false, maximumAge: Infinity, timeout: 60000 }
    );
  };

  onHandleClick = e => {
    e.preventDefault();
    this.props.setChannel(e.target.id);
    history.push('/post');
  };

  render() {
    return (
      <div className="liner">
        <div className="contentCenter">
          {this.state.latitude ? (
            <>
              <div className="selectChannel_subHeader">SELECT CHANNEL</div>
              <div className="selectChannel_list">
                {this.props.channels.map(channel => (
                  <div
                    className="selectChannel_list_item"
                    id={channel.id}
                    key={channel.id}
                    onClick={e => this.onHandleClick(e)}
                  >
                    {channel.channelTitle}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div> loading</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ channels }) => {
  return {
    channels: channels.myChannels,
  };
};

const mapDispatchToProps = dispatch => ({
  setCurrentLocation: location => dispatch(setCurrentLocation(location)),
  setMediaType: mediaType => dispatch(setMediaType(mediaType)),
  setChannel: channel => dispatch(setChannel(channel)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SelectChannel)
);
