import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addMessage } from '../../redux/messages';
import '../../app.css'
import { setLogInError } from '../../redux/authentication/authentication';
import TakePhoto from './TakePhoto';
import TakeVideo from './TakeVideo';
import { PostSuccess } from './PostSuccess';
import Upload from './Upload';

const AddMessage = (props) => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [channelId, setChannelId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [positionLoaded, setPositionLoaded] = useState(false)
  const [loadingTicker, setLoadingTicker] = useState(0)
  // const [loadingDisplay, setLoadingDisplay] = useState('')
  const [media, setMedia] = useState('')

  const loadingArr = ['Accessing location data...', 'Fetching your location...', 'Setting your location...']

  const { channels } = props;

  navigator.geolocation.getCurrentPosition(pos => {
    setPositionLoaded(true)
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
    };
    // console.log('postBody: ', postBody)
    await props.addMessage(postBody)
    setSuccess(true)
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        props.history.push('/');
      }, 2000);
    }
    if (!positionLoaded && !success) {
      setTimeout(() => {
        if (loadingTicker < 2) {
          setLoadingTicker(loadingTicker + 1)
        }
        else {
          setLoadingTicker(0)
        }
      }, 2000)
    }
  })

  return (
    success ? (
      <PostSuccess />
    ) : (
        <>
          {
            positionLoaded && !success ? (
              <>
                {
                  !media ? (
                    <form onSubmit={handleSubmit}>
                      <label>Channel</label>
                      <select onChange={ev => setChannelId(ev.target.value)}>
                        <option>{''}</option>
                        {
                          channels.map(channel => <option value={channel.id} key={channel.id}>{channel.channelTitle}</option>)
                        }
                      </select>
                      <label>Title</label>
                      <input placeholder='Title' value={title} name="messageTitle" onChange={ev => setTitle(ev.target.value)} />
                      <label>Body</label>
                      <textarea placeholder='Message Body' value={body} name="messageBody" onChange={ev => setBody(ev.target.value)} />
                      <p>Title and Channel must not be empty in order to upload photo/video below</p>
                      <button disabled={!title || !channelId} onClick={() => setMedia('photo')}>Take photo</button>
                      <button disabled={!title || !channelId} onClick={() => setMedia('video')}>Take video</button>
                      <button disabled={!title || !channelId} onClick={() => setMedia('upload')}>Upload photo or video</button>
                      <button type='submit'>POST</button>
                      {
                        error && <div style={{ backgroundColor: 'red' }}>Error posting new message. Please refresh the page and try again.</div>
                      }
                    </form>
                  ) : (
                      media === 'photo' ? (
                        <TakePhoto
                          title={title}
                          latitude={latitude}
                          longitude={longitude}
                          channelId={channelId}
                        />
                      ) : (
                          media === 'video' ? (
                            <TakeVideo
                              title={title}
                              latitude={latitude}
                              longitude={longitude}
                              channelId={channelId}
                            />
                          ) : (
                              <Upload
                                title={title}
                                latitude={latitude}
                                longitude={longitude}
                                channelId={channelId}
                              />
                            )
                        )
                    )
                }
              </>
            ) : (
                <div>
                  <h3>Loading...</h3>
                  <div>{loadingArr[loadingTicker]}</div>
                </div>
              )
          }
        </>
      )
  );
}

const mapState = ({ channels }) => {
  return {
    channels: channels.myChannels,
  }
}

const mapDispatch = dispatch => {
  return {
    addMessage: msg => dispatch(addMessage(msg))
  }
}

export default connect(mapState, mapDispatch)(AddMessage);
