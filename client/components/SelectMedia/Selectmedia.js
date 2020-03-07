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

  render() {
    return (
      <div className="liner">
        <div className="contentCenter">
          {this.state.latitude ? (
            <>
              <div className="selectMedia_subHeader">SELECT MEDIA</div>
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
                id="MESSAGE"
                style={{ backgroundColor: 'rgb(134, 108, 74)' }}
                onClick={e => this.onHandleClick(e)}
              >
                MESSAGE
              </div>
              <div
                className="selectMedia"
                id="UPLOAD"
                style={{ backgroundColor: 'rgb(97, 76, 48)' }}
                onClick={e => this.onHandleClick(e)}
              >
                UPLOAD
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

const mapDispatchToProps = dispatch => ({
  setCurrentLocation: location => dispatch(setCurrentLocation(location)),
  setMediaType: mediaType => dispatch(setMediaType(mediaType)),
});

export default withRouter(connect(null, mapDispatchToProps)(SelectMedia));