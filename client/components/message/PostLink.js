import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../../redux/messages';
import { PostSuccess } from './PostSuccess';

const PostLink = (props) => {

  const { channel } = props;

  const [link, setLink] = useState('')
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    const postBody = {
      fileType: 'link',
      messageTitle: props.title,
      messageContent: link,
      latitude: props.latitude,
      longitude: props.longitude,
      radius: 1,
      channelId: channel,
    };
    await props.addMessage(postBody)
    setSuccess(true)
  }

  return (
    !success ? (
      <form onSubmit={ev => handleSubmit(ev)}>
        <label>Link:</label>
        <input type="text" name="link" value={link} onChange={ev => setLink(ev.target.value)} />
        <button type="submit">
          Post
        </button>
      </form>
    ) : (
        <PostSuccess />
      )
  )
}

const mapState = ({ nav }) => {
  return {
    channel: nav.channel,
  }
}

const mapDispatch = dispatch => {
  return {
    addMessage: (msg) => dispatch(addMessage(msg))
  }
}

export default connect(mapState, mapDispatch)(PostLink);