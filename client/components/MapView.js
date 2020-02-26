import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

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

  const currentPosition = navigator.geolocation.getCurrentPosition(pos => {
    console.log('pos.coords: ', pos.coords)
    // return pos.coords;
  })

  console.log('current position: ', currentPosition)

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
    // store the selectedMessage in local state
    setSelectedMessage(props);
    // store the selectedMarker in local state
    setActiveMarker(marker);
    // some conditional logic based on whether the message is "viewable" (is user in range)
    // ...
  }

  return (
    <Map
      google={containerProps.google}
      zoom={14}
      containerStyle={containerStyle}
      initialCenter={{ lat: 40.7831, lng: -73.9352 }}
    >
      {
        messages.length > 0 &&
        messages.map((msg, idx) => {
          return (
            <Marker
              name={msg.messageTitle}
              key={idx}
              position={{ lat: msg.latitude, lng: msg.longitude }}
              onClick={onMarkerClick}
            />
          )
        })
      }
    </Map>
  )
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBuvzQNuDiQUkXKwp5lUIc3fDLYkKS5Ru8'
})(MapContainer);