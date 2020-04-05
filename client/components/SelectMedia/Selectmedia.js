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
    this.state = {};
  }

  onHandleClick = e => {
    e.preventDefault();
    this.props.setMediaType(e.target.id);
    history.push('/message');
  };

  render() {
    return (
      <div className="liner">
        <div className="contentCenter">
          <div className="selectMedia_subHeader">SELECT MEDIA</div>
          <div
            className="selectMedia"
            id="POST"
            onClick={e => this.onHandleClick(e)}
          >
            MESSAGE
          </div>
          <div
            className="selectMedia"
            id="PHOTO"
            onClick={e => this.onHandleClick(e)}
          >
            PHOTO
          </div>
          <div
            className="selectMedia"
            id="VIDEO"
            onClick={e => this.onHandleClick(e)}
          >
            VIDEO
          </div>
          <div
            className="selectMedia"
            id="LINK"
            onClick={e => this.onHandleClick(e)}
          >
            LINK
          </div>
          <div
            className="selectMedia"
            id="UPLOAD"
            onClick={e => this.onHandleClick(e)}
          >
            UPLOAD
          </div>
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
