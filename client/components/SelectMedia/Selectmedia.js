import React from 'react';
//css
import './SelectMedia.css';
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

class SelectMedia extends React.Component {
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
    this.props.setMediaType(e.target.id);
    history.push('/message');
  };

  onChangeChannel = e => {
    e.preventDefault();
    console.log(e.target.value);
    this.props.setChannel(e.target.value);
  };

  render() {
    return (
      <div className="liner">
        <div className="contentCenter">
          {this.state.latitude ? (
            <>
              <div className="selectMedia_subHeader">SELECT MEDIA</div>
              <div
                className="selectMedia"
                id="POST"
                style={{ backgroundColor: 'rgb(243, 217, 184)' }}
                onClick={e => this.onHandleClick(e)}
              >
                MESSAGE
              </div>
              <div
                className="selectMedia"
                id="PHOTO"
                style={{ backgroundColor: 'rgb(243, 217, 184)' }}
                onClick={e => this.onHandleClick(e)}
              >
                PHOTO
              </div>
              <div
                className="selectMedia"
                id="VIDEO"
                style={{ backgroundColor: 'rgb(214, 186, 150)' }}
                onClick={e => this.onHandleClick(e)}
              >
                VIDEO
              </div>
              <div
                className="selectMedia"
                id="LINK"
                style={{ backgroundColor: 'rgb(177, 149, 112)' }}
                onClick={e => this.onHandleClick(e)}
              >
                LINK
              </div>
              <div
                className="selectMedia"
                id="UPLOAD"
                style={{ backgroundColor: 'rgb(97, 76, 48)' }}
                onClick={e => this.onHandleClick(e)}
              >
                UPLOAD
              </div>
              <label className="message_form_item">
                SELECT CHANNEL FIRST**************
              </label>
              <label className="message_form_item">Channel</label>
              <select
                onChange={ev => this.onChangeChannel(ev)}
                className="message_form_input"
              >
                <option>{''}</option>
                {this.props.channels.map(channel => (
                  <option value={channel.id} key={channel.id}>
                    {channel.channelTitle}
                  </option>
                ))}
              </select>
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
  connect(mapStateToProps, mapDispatchToProps)(SelectMedia)
);
