import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './container/Container.css'

const containerStyle = {
  width: '100%',
  height: '60%',
  flexGrow: '1',
};

const MapContainer = (containerProps) => {

  const [messages, setMessages] = useState([])
  const [activeMarker, setActiveMarker] = useState({});
  const [loaded, setLoaded] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState({});
  const [currentPosition, setCurrentPosition] = useState({})
  const [geoSupported, setGeoSupported] = useState(true)

  if (!navigator.geolocation) {
    setGeoSupported(false);
  } else {
    navigator.geolocation.watchPosition(pos => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      }
      if (coords.lat !== currentPosition.lat || coords.lng !== currentPosition.lng) {
        setCurrentPosition(coords)
      }
    })
  }

  useEffect(() => {
    if (!loaded) {
      axios.get('http://localhost:4000/api/messages')
        .then(messages => {
          messages = messages.data;
          console.log('messages: ', messages)
          setMessages(messages)
          setLoaded(true)
        })
        .catch(e => console.log('error fetching messages in useEffect: ', e))
    }
  }, [])

  const onMarkerClick = (props, marker, e) => {
    console.log('i am clickable!')
    // store the selectedMessage in local state
    setSelectedMessage(props);
    // store the selectedMarker in local state
    setActiveMarker(marker);
    // display message in overlay
    // ...
  }

  const openMsgIcon = {
    url: 'https://image.flaticon.com/icons/svg/1483/1483336.svg',
    scaledSize: new containerProps.google.maps.Size(50, 50),
  }

  const closedMsgIcon = {
    url: 'https://image.flaticon.com/icons/svg/1483/1483234.svg',
    scaledSize: new containerProps.google.maps.Size(50, 50),
  }

  const minDistance = 10000;

  const computeDistance = (msg, curPos) => {
    const curLatLng = new containerProps.google.maps.LatLng(
      parseFloat(curPos.lat),
      parseFloat(curPos.lng)
    );
    const msgLatLng = new containerProps.google.maps.LatLng(
      parseFloat(msg.latitude),
      parseFloat(msg.longitude)
    );
    const distance = containerProps.google.maps.geometry.spherical.computeDistanceBetween(curLatLng, msgLatLng)
    return distance;
  }

  return (
    geoSupported ?
      <Map
        google={containerProps.google}
        zoom={14}
        containerStyle={containerStyle}
        initialCenter={{ lat: 40.7831, lng: -73.9352 }}
      >
        <Marker
          icon="https://www.robotwoods.com/dev/misc/bluecircle.png"
          scaledSize={new containerProps.google.maps.Size(10, 10)}
          position={currentPosition} />
        {
          messages.length > 0 &&
          messages.map((msg, idx) => {
            const distance = computeDistance(msg, currentPosition)
            return (
              <Marker
                icon={distance < minDistance ? openMsgIcon : closedMsgIcon}
                name={msg.messageTitle}
                key={idx}
                position={{ lat: msg.latitude, lng: msg.longitude }}
                onClick={distance < minDistance && onMarkerClick}
              />
            )
          })
        }
      </Map>
      :
      <div className='container'>Location access must be turned on to view messages!</div>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBuvzQNuDiQUkXKwp5lUIc3fDLYkKS5Ru8'
})(MapContainer);