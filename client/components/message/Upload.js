import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import FormData from 'form-data';
// import multer from 'multer';
import { addMessage } from '../../redux/messages';

const UploadFile = (props) => {

  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileSelect = ev => {
    console.log('ev.target.files[0]: ', ev.target.files[0])
    setSelectedFile(ev.target.files[0])
  }

  const handleUpload = async (ev) => {
    ev.preventDefault();
    const postBody = {
      // will need to change fileType below according to file extension
      fileType: 'video',
      messageTitle: props.title,
      messageContent: 'file uploaded to AWS',
      latitude: props.latitude,
      longitude: props.longitude,
      radius: 1,
      channelId: props.channelId,
    };
    const formData = new FormData();
    formData.append('file', selectedFile)
    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    // console.log('formData in handleUpload: ', formData)
    axios.post('/api/aws/file',
      formData
      // {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }
    )
      .then((res) => {
        console.log('SUCCESS!!: ', res.data)
      })
      .catch(() => console.log('FAILURE!!'));
    // await props.addMessage(postBody, formData, true)
  }

  return (
    // onSubmit={ev => ev.preventDefault()}
    // onClick={ev => handleUpload(ev)}
    <form action="/api/aws/file" enctype="multipart/form-data" method="POST" >
      <input type='file' name="media" onChange={ev => handleFileSelect(ev)} />
      <button type='submit'>Upload</button>
    </form>
  )
}

const mapDispatch = dispatch => {
  return {
    addMessage: (msg, media, file) => dispatch(addMessage(msg, media, file))
  }
}

export default connect(null, mapDispatch)(UploadFile);