import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import FormData from 'form-data';
// import multer from 'multer';
import { addMessage } from '../../redux/messages';
import { v4 as uuidv4 } from 'uuid';
import { PostSuccess } from './PostSuccess';

const key = uuidv4();

const UploadFile = props => {

  const { channel } = props;

  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = ev => {
    console.log('ev.target.files[0]: ', ev.target.files[0]);
    setSelectedFile(ev.target.files[0]);
  };

  const handleUpload = async () => {
    const postBody = {
      // will need to change fileType below according to file extension
      id: key,
      fileType: 'video',
      messageTitle: props.title,
      messageContent: 'file uploaded to AWS',
      latitude: props.latitude,
      longitude: props.longitude,
      radius: 1,
      channelId: channel,
    };

    await props.addMessage(postBody, 'upload');
    setSuccess(true);
  };

  return success ? (
    <PostSuccess />
  ) : (
      <div>
        <iframe
          name="hiddenFrame"
          width="0"
          height="0"
          border="0"
          style={{ display: 'none' }}
        ></iframe>
        <form
          action="/api/aws/file"
          target="hiddenFrame"
          encType="multipart/form-data"
          method="POST"
        >
          <input type="file" name="media" onChange={ev => handleFileSelect(ev)} />
          <input type="text" name="Key" value={key} style={{ display: 'none' }} />
          <button type="submit" onClick={handleUpload}>
            Upload
        </button>
        </form>
      </div>
    );
};

const mapState = ({ nav }) => {
  return {
    channel: nav.channel,
  }
}

const mapDispatch = dispatch => {
  return {
    addMessage: (msg, media) => dispatch(addMessage(msg, media)),
  };
};

export default connect(mapState, mapDispatch)(UploadFile);
