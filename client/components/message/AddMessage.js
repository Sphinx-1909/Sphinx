import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addMessage } from '../../redux/messages';
import '../../app.css'

const AddMessage = (props) => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [channelId, setChannelId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const { channels } = props;

  navigator.geolocation.getCurrentPosition(pos => {
    setLatitude(pos.coords.latitude);
    setLongitude(pos.coords.longitude);
  })

  const handleSubmit = async ev => {
    ev.preventDefault();
    const postBody = {
      fileType: 'text',
      messageTitle: title,
      messageContent: body,
      latitude,
      longitude,
      radius: 1,
      channelId,
    }
    await props.addMessage(postBody)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Channel</label>
      <select onChange={ev => setChannelId(ev.target.value)}>
        <option>{''}</option>
        {
          channels.map(channel => <option value={channel.id} idx={channel.id}>{channel.channelTitle}</option>)
        }
      </select>
      <label>Title</label>
      <input placeholder='Title' value={title} name="messageTitle" onChange={ev => setTitle(ev.target.value)} />
      <label>Body</label>
      <textarea placeholder='Message Body' value={body} name="messageBody" onChange={ev => setBody(ev.target.value)} />
      <button type='submit'>POST</button>
    </form>
  );
}

const mapState = ({ channels }) => {
  return {
    channels,
  }
}

const mapDispatch = dispatch => {
  return {
    addMessage: msg => dispatch(addMessage(msg))
  }
}

export default connect(mapState, mapDispatch)(AddMessage);
