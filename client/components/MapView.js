import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import LandingPage from './Welcome/LandingPage';
import { connect } from 'react-redux';
import {
  fetchUnreadMessages,
  markAsRead,
  upVoteMessage,
  downVoteMessage,
} from '../redux/messages';
import { minDistance } from '../../utils';
import { googleMapStyles } from '.././utils/utils';
import {
  setCurrentLocation,
  setMediaType,
} from '../redux/nav/action/nav.action';

import './MapView.css';

const MapContainer = props => {
  const [activeMarker, setActiveMarker] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});
  // const [currentPosition, setCurrentPosition] = useState({});
  const [geoSupported, setGeoSupported] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [dataUri, setDataUri] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  const { messages, activeUser, currentLocation } = props;

  const currentPosition = currentLocation;

  const grabLocation = () => {
    console.log('getting location data');
    if (!navigator.geolocation) {
      setGeoSupported(false);
    } else {
      navigator.geolocation.getCurrentPosition(
        pos => {
          console.log('lat', pos.coords.latitude, 'lng', pos.coords.longitude);
          props.setCurrentLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        () => {
          console.log('did load geo');
        },
        { enableHighAccuracy: false, maximumAge: Infinity, timeout: 60000 }
      );
    }
  };

  useEffect(() => {
    setInitialLoad(false);
    grabLocation();
  }, currentPosition);

  const onMarkerClick = (props, marker, e, msg, distance) => {
    console.log(msg);
    if (distance > minDistance) return;
    console.log('msg: ', msg);
    setSelectedMessage(msg);
    setActiveMarker(marker);
    // check if it is a media message
    if (msg.fileType !== 'text' && msg.fileType !== 'link') {
      axios
        .get(`/api/aws/${msg.id}`)
        .then(media => {
          setDataUri(media.data);
          setDisplayMessage(true);
        })
        .catch(e => console.log('error in getMediaMessage thunk: ', e));
    }
    // display message in overlay
    setDisplayMessage(true);
  };

  const openMsgIcon = {
    url: 'https://image.flaticon.com/icons/svg/1483/1483336.svg',
    scaledSize: new props.google.maps.Size(50, 50),
  };

  const closedMsgIcon = {
    url: 'https://image.flaticon.com/icons/svg/1483/1483234.svg',
    scaledSize: new props.google.maps.Size(50, 50),
  };

  const computeDistance = (msg, curPos) => {
    const curLatLng = new props.google.maps.LatLng(
      parseFloat(curPos.latitude),
      parseFloat(curPos.longitude)
    );
    const msgLatLng = new props.google.maps.LatLng(
      parseFloat(msg.latitude),
      parseFloat(msg.longitude)
    );
    const distance = props.google.maps.geometry.spherical.computeDistanceBetween(
      curLatLng,
      msgLatLng
    );
    return distance;
  };

  const handleClose = () => {
    props.markAsRead(selectedMessage.id);
    setDisplayMessage(false);
  };

  console.log('currentPosition.latitude: ', currentPosition.latitude);

  const handelUpVote = () => {
    props.upVoteMessage(selectedMessage.id);
    selectedMessage.positiveVotes++;
  };

  const handleDownVote = () => {
    props.downVoteMessage(selectedMessage.id);
    selectedMessage.negativeVotes++;
  };

  return !activeUser.firstName && !initialLoad ? (
    <LandingPage />
  ) : (
    <>
      {displayMessage ? (
        <>
          {dataUri ? (
            selectedMessage.fileType !== 'text' &&
            selectedMessage.fileType !== 'link' ? (
              // message type is 'image':
              <div className="liner">
                <div className="contentCenter">
                  <img src={dataUri} />
                  <div className="MapView_buttons">
                    <button onClick={handleClose} className="MapView_links">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // message type is 'video':
              <div className="liner">
                <div className="contentCenter">
                  <video src={dataUri} autoPlay={true} />
                  <div className="MapView_buttons">
                    <button onClick={handleClose} className="MapView_links">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )
          ) : // message type is 'link':
          selectedMessage.fileType === 'link' ? (
            <div className="liner">
              <div className="contentCenter">
                <ReactPlayer url={selectedMessage.messageContent} playing />
                <div className="MapView_buttons">
                  <button onClick={handleClose} className="MapView_links">
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // message type is 'text':
            <div className="liner">
              <div className="contentCenter">
                <div className="MapView_subHeader">
                  {selectedMessage.messageTitle}
                </div>
                <div className="MapView_item">
                  {selectedMessage.messageContent}
                </div>
                <div className="MapView_item">
                  UpVotes: {selectedMessage.positiveVotes}, DownVotes:
                  {selectedMessage.negativeVotes}
                </div>
                <div className="MapView_buttons">
                  <button onClick={handelUpVote} className="MapView_links_up">
                    VOTE UP
                  </button>
                  <button
                    onClick={handleDownVote}
                    className="MapView_links_down"
                  >
                    VOTE DOWN
                  </button>
                </div>
                <div className="MapView_buttons">
                  <button onClick={handleClose} className="MapView_links">
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : geoSupported && currentPosition.latitude && !initialLoad ? (
        <Map
          google={props.google}
          disableDefaultUI={true}
          zoom={16}
          style={{
            width: '100%',
            height: '100%',
            overfloe: 'hidden',
            position: 'static',
          }}
          styles={googleMapStyles}
          initialCenter={{
            lat: currentPosition.latitude,
            lng: currentPosition.longitude,
          }}
        >
          <Marker
            icon="https://www.robotwoods.com/dev/misc/bluecircle.png"
            scaledSize={new props.google.maps.Size(12, 12)}
            position={{
              lat: currentPosition.latitude,
              lng: currentPosition.longitude,
            }}
          />
          {messages.length > 0 &&
            messages.map((msg, idx) => {
              const distance = computeDistance(msg, currentPosition);
              // console.log('distance: ', distance)
              return (
                <Marker
                  icon={distance < minDistance ? openMsgIcon : closedMsgIcon}
                  name={msg.messageTitle}
                  key={idx}
                  position={{ lat: msg.latitude, lng: msg.longitude }}
                  onClick={(props, marker, e) =>
                    onMarkerClick(props, marker, e, msg, distance)
                  }
                />
              );
            })}
        </Map>
      ) : (
        (!geoSupported && (
          <div className="container">
            Location access must be enabled to view messages!
          </div>
        ),
        !currentPosition.latitude && (
          <div className="container">Loading...</div>
        ))
      )}
    </>
  );
};

const Wrapper = GoogleApiWrapper({
  apiKey: 'AIzaSyBuvzQNuDiQUkXKwp5lUIc3fDLYkKS5Ru8',
})(MapContainer);

const mapState = ({ unreadMessages, activeUser, nav }) => {
  return {
    messages: unreadMessages,
    activeUser,
    currentLocation: nav.currentLocation,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchMessages: () => dispatch(fetchUnreadMessages()),
    markAsRead: msgId => dispatch(markAsRead(msgId)),
    setCurrentLocation: location => dispatch(setCurrentLocation(location)),
    upVoteMessage: msgId => dispatch(upVoteMessage(msgId)),
    downVoteMessage: msgId => dispatch(downVoteMessage(msgId)),
    // getMediaMessage: key => dispatch(getMediaMessage(key)),
  };
};

export default connect(mapState, mapDispatch)(Wrapper);
