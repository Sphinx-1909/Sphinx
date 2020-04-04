import React, { useState } from 'react';
import { connect } from 'react-redux';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import MediaPreview from './MediaPreview';
import { addMessage } from '../../redux/messages';
import './TakePhoto.css';

// replace with thunk
import axios from 'axios';
import { PostSuccess } from './PostSuccess';

function TakePhoto(props) {
  const { channel } = props;

  console.log('props in takePhoto: ', props);

  const [dataUri, setDataUri] = useState('');
  const [success, setSuccess] = useState(false);

  function handleTakePhoto(data) {
    setDataUri(data);
    console.log('data: ', data);
  }

  function handleTakePhotoAnimationDone(dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  function handleCameraError(error) {
    console.log('handleCameraError', error);
  }

  function handleCameraStart(stream) {
    console.log('handleCameraStart');
  }

  function handleCameraStop() {
    console.log('handleCameraStop');
  }

  const handlePost = async () => {
    const postBody = {
      fileType: 'image',
      messageTitle: props.title,
      messageContent: 'image posted to AWS',
      latitude: props.latitude,
      longitude: props.longitude,
      radius: 1,
      channelId: channel,
    };
    await props.addMessage(postBody, dataUri);
    setSuccess(true);
  };

  return dataUri ? (
    <>
      {!success ? (
        <div>
          <MediaPreview data={dataUri} type="image" />
          <div className="TakePhoto_buttons">
            <button className="TakePhoto_Post" onClick={handlePost}>
              POST
            </button>
            <button className="TakePhoto_Retake" onClick={() => setDataUri('')}>
              RETAKE
            </button>
          </div>
        </div>
      ) : (
        <PostSuccess />
      )}
    </>
  ) : (
    <Camera
      onTakePhoto={dataUri => handleTakePhoto(dataUri)}
      // onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
      onCameraError={error => handleCameraError(error)}
      idealFacingMode={FACING_MODES.USER}
      idealResolution={{ width: 640, height: 480 }}
      imageType={IMAGE_TYPES.JPG}
      imageCompression={0.97}
      isMaxResolution={true}
      isImageMirror={false}
      isSilentMode={false}
      isDisplayStartCameraError={true}
      isFullscreen={false}
      sizeFactor={1}
      onCameraStart={stream => {
        handleCameraStart(stream);
      }}
      onCameraStop={() => {
        handleCameraStop();
      }}
    />
  );
}

const mapState = ({ nav }) => {
  return {
    channel: nav.channel,
  };
};

const mapDispatch = dispatch => {
  return {
    addMessage: (msg, media) => dispatch(addMessage(msg, media)),
  };
};

export default connect(mapState, mapDispatch)(TakePhoto);
