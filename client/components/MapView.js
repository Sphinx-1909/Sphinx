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
            height: '100%',
            overfloe: 'hidden',
            position: 'static',
          }}
          styles={[
            {
              elementType: 'geometry',
              stylers: [
                {
                  color: '#f5f5f5',
                },
              ],
            },
            {
              elementType: 'labels.icon',
              stylers: [
                {
                  visibility: 'off',
                },
              ],
            },
            {
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#616161',
                },
              ],
            },
            {
              elementType: 'labels.text.stroke',
              stylers: [
                {
                  color: '#f5f5f5',
                },
              ],
            },
            {
              featureType: 'administrative.land_parcel',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#bdbdbd',
                },
              ],
            },
            {
              featureType: 'landscape',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#ffe4c4',
                },
              ],
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#ffe4c4',
                },
              ],
            },
            {
              featureType: 'landscape.natural',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#ffe4c4',
                },
              ],
            },
            {
              featureType: 'landscape.natural.landcover',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#ffe4c4',
                },
              ],
            },
            {
              featureType: 'landscape.natural.terrain',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#ffe4c4',
                },
              ],
            },
            {
              featureType: 'poi',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#eeeeee',
                },
              ],
            },
            {
              featureType: 'poi',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#ffe4c4',
                },
              ],
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#757575',
                },
              ],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#e5e5e5',
                },
              ],
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry.fill',
              stylers: [
                {
                  color: '#ffe4c4',
                },
              ],
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e',
                },
              ],
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#ffffff',
                },
              ],
            },
            {
              featureType: 'road.arterial',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#757575',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#dadada',
                },
              ],
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#616161',
                },
              ],
            },
            {
              featureType: 'road.local',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e',
                },
              ],
            },
            {
              featureType: 'transit.line',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#e5e5e5',
                },
              ],
            },
            {
              featureType: 'transit.station',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#eeeeee',
                },
              ],
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [
                {
                  color: '#c9c9c9',
                },
              ],
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [
                {
                  color: '#9e9e9e',
                },
              ],
            },
          ]}
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
