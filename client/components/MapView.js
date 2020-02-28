import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchUnreadMessages, markAsRead } from '../redux/messages';

const containerStyle = {
  position: 'static',
  flexGrow: '1',
};

const MapContainer = props => {
  const [activeMarker, setActiveMarker] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});
  const [currentPosition, setCurrentPosition] = useState({});
  const [geoSupported, setGeoSupported] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(false);

  const minDistance = 10000;

  const { messages } = props;

  if (!navigator.geolocation) {
    setGeoSupported(false);
  } else {
    navigator.geolocation.watchPosition(pos => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      if (
        coords.lat !== currentPosition.lat ||
        coords.lng !== currentPosition.lng
      ) {
        // console.log('coords: ', coords)
        setCurrentPosition(coords);
      }
    });
  }

  const onMarkerClick = (props, marker, e, msg, distance) => {
    if (distance > minDistance) return;
    // store the selectedMessage in local state
    setSelectedMessage(msg);
    // store the selectedMarker in local state
    setActiveMarker(marker);
    // display message in overlay
    setDisplayMessage(true);
    // ...
  };

  // console.log('container props: ', props)

  const openMsgIcon = {
    url: 'https://image.flaticon.com/icons/svg/1483/1483336.svg',
    scaledSize: new props.google.maps.Size(50, 50),
  };

  const closedMsgIcon = {
    url: 'https://image.flaticon.com/icons/svg/1483/1483234.svg',
    scaledSize: new props.google.maps.Size(50, 50),
  };

  const computeDistance = (msg, curPos) => {
    // console.log('curPos.lat: ', parseFloat(curPos.lat));
    // console.log('curPos.lng: ', parseFloat(curPos.lng));
    // console.log('msg.latitude: ', msg.latitude);
    // console.log('msg.longitude: ', msg.longitude);
    const curLatLng = new props.google.maps.LatLng(
      parseFloat(curPos.lat),
      parseFloat(curPos.lng)
    );
    const msgLatLng = new props.google.maps.LatLng(
      parseFloat(msg.latitude),
      parseFloat(msg.longitude)
    );
    const distance = props.google.maps.geometry.spherical.computeDistanceBetween(
      curLatLng,
      msgLatLng
    );
    // console.log('distance in computeDistance: ', distance)
    return distance;
  };

  const handleClose = async () => {
    await markAsRead(selectedMessage.id);
    setDisplayMessage(false);
  };

  // console.log('displayMessage: ', displayMessage)

  return (
    <>
      {displayMessage ? (
        <div>
          <h2>{selectedMessage.messageTitle}</h2>
          <p>{selectedMessage.messageContent}</p>
          <button onClick={handleClose}>Close</button>
        </div>
      ) : geoSupported ? (
        <Map
          google={props.google}
          disableDefaultUI={true}
          zoom={14}
          style={{
            width: '100%',
            height: '90%',
            overfloe: 'hidden',
            position: 'static',
          }}
          initialCenter={
            currentPosition.lat
              ? currentPosition
              : { lat: 40.7831, lng: -73.9352 }
          }
        >
          <Marker
            icon="https://www.robotwoods.com/dev/misc/bluecircle.png"
            scaledSize={new props.google.maps.Size(10, 10)}
            position={currentPosition}
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
        <div className="container">
          Location access must be turned on to view messages!
        </div>
      )}
    </>
  );
};

const Wrapper = GoogleApiWrapper({
  apiKey: 'AIzaSyBuvzQNuDiQUkXKwp5lUIc3fDLYkKS5Ru8',
})(MapContainer);

const mapState = ({ unreadMessages }) => {
  return {
    messages: unreadMessages,
  };
};

const mapDispatch = dispatch => {
  return {
    fetchMessages: () => dispatch(fetchUnreadMessages()),
    markAsRead: msgId => dispatch(markAsRead(msgId)),
  };
};

export default connect(mapState, mapDispatch)(Wrapper);
