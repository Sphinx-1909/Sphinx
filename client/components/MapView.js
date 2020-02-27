import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './container/Container.css'

const containerStyle = {
  width: '100%',
  height: '60%',
  flexGrow: '1',
};

const MapContainer = containerProps => {
  const [messages, setMessages] = useState([]);
  const [activeMarker, setActiveMarker] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState({});
  const [currentPosition, setCurrentPosition] = useState({})
  const [geoSupported, setGeoSupported] = useState(true)
  const [displayMessage, setDisplayMessage] = useState(false)

  const minDistance = 10000;

  if (!navigator.geolocation) {
    setGeoSupported(false);
  } else {
    navigator.geolocation.watchPosition(pos => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      if (coords.lat !== currentPosition.lat || coords.lng !== currentPosition.lng) {
        // console.log('coords: ', coords)
        setCurrentPosition(coords)
      }
    })
  }

  useEffect(() => {
    if (!loaded) {
      axios
        .get('http://localhost:4000/api/messages')
        .then(messages => {
          messages = messages.data;
          console.log('messages: ', messages);
          setMessages(messages);
          setLoaded(true);
        })
        .catch(e => console.log('error fetching messages in useEffect: ', e));
    }
  }, []);

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

  // console.log('container props: ', containerProps)

  const openMsgIcon = {
    url: 'https://image.flaticon.com/icons/svg/1483/1483336.svg',
    scaledSize: new containerProps.google.maps.Size(50, 50),
  }

  const closedMsgIcon = {
    url: 'https://image.flaticon.com/icons/svg/1483/1483234.svg',
    scaledSize: new containerProps.google.maps.Size(50, 50),
  }

  const computeDistance = (msg, curPos) => {
    // console.log('curPos.lat: ', parseFloat(curPos.lat));
    // console.log('curPos.lng: ', parseFloat(curPos.lng));
    // console.log('msg.latitude: ', msg.latitude);
    // console.log('msg.longitude: ', msg.longitude);
    const curLatLng = new containerProps.google.maps.LatLng(
      parseFloat(curPos.lat),
      parseFloat(curPos.lng)
    );
    const msgLatLng = new containerProps.google.maps.LatLng(
      parseFloat(msg.latitude),
      parseFloat(msg.longitude)
    );
    const distance = containerProps.google.maps.geometry.spherical.computeDistanceBetween(curLatLng, msgLatLng)
    // console.log('distance in computeDistance: ', distance)
    return distance;
  }

  // console.log('displayMessage: ', displayMessage)

  return (
    <>
      {
        displayMessage ? (
          <div>
            <h2>{selectedMessage.messageTitle}</h2>
            <p>{selectedMessage.messageContent}</p>
            <button onClick={() => setDisplayMessage(false)}>Close</button>
          </div>
        ) : (
            geoSupported ?
              <Map
                google={containerProps.google}
                zoom={14}
                containerStyle={containerStyle}
                initialCenter={currentPosition.lat ? currentPosition : { lat: 40.7831, lng: -73.9352 }}
              >
                <Marker
                  icon="https://www.robotwoods.com/dev/misc/bluecircle.png"
                  scaledSize={new containerProps.google.maps.Size(10, 10)}
                  position={currentPosition} />
                {
                  messages.length > 0 &&
                  messages.map((msg, idx) => {
                    const distance = computeDistance(msg, currentPosition)
                    // console.log('distance: ', distance)
                    return (
                      <Marker
                        icon={distance < minDistance ? openMsgIcon : closedMsgIcon}
                        name={msg.messageTitle}
                        key={idx}
                        position={{ lat: msg.latitude, lng: msg.longitude }}
                        onClick={(props, marker, e) => onMarkerClick(props, marker, e, msg, distance)}
                      />
                    )
                  })
                }
              </Map>
              :
              <div className='container'>Location access must be turned on to view messages!</div>
          )
      }
    </>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBuvzQNuDiQUkXKwp5lUIc3fDLYkKS5Ru8',
})(MapContainer);
