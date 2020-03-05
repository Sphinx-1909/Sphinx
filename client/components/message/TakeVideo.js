import React, { useState } from 'react';
import { connect } from 'react-redux';
import VideoRecorder from 'react-video-recorder';
import MediaPreview from './MediaPreview';
import { addMessage } from '../../redux/messages';
import axios from 'axios'
import { PostSuccess } from './PostSuccess';

function TakeVideo(props) {

  console.log('props in takeVideo: ', props)

  const [blobUrl, setBlobUrl] = useState('')
  const [blob, setBlob] = useState('')
  const [success, setSuccess] = useState(false)

  function handleRecordingComplete(data) {
    // setDataUri(data)
    // console.log('data (blob): ', data)
    setBlob(data)
    // console.log('blob: ', blob)
    const videoUrl = URL.createObjectURL(data)
    setBlobUrl(videoUrl)
    // console.log('videoUrl: ', videoUrl)
  }



  const handlePost = async () => {
    const postBody = {
      fileType: 'video',
      messageTitle: props.title,
      messageContent: 'video posted to AWS',
      latitude: props.latitude,
      longitude: props.longitude,
      radius: 1,
      channelId: props.channelId,
    };
    await props.addMessage(postBody, blobUrl)
    setSuccess(true)
  }

  return (
    blobUrl ? (
      <>
        {
          !success ? (
            <div>
              <MediaPreview data={blobUrl} type='video' />
              <button onClick={handlePost}>POST</button>
              <button onClick={() => setBlobUrl('')}>RETAKE</button>
            </div>
          ) : (
              <PostSuccess />
            )
        }
      </>
    ) : (
        <VideoRecorder
          // onTurnOnCamera={}
          // onTurnOffCamera={}
          // onStartRecording={}
          // onStopRecording={}
          onRecordingComplete={data => handleRecordingComplete(data)}
          // onOpenVideoInput={}
          // onStopReplaying={}
          // onError={}
          timeLimit={10000}
        />
      )
  );
}

const mapDispatch = dispatch => {
  return {
    addMessage: (msg, media) => dispatch(addMessage(msg, media))
  }
}

export default connect(null, mapDispatch)(TakeVideo);