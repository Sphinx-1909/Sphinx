import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const VerificationCode = (props) => {
  const { reqId } = props;

  console.log('props in VerificationCode: ', props)

  const [code, setCode] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = ev => {
    ev.preventDefault();
    // send code and reqId back to nexmo
    axios.post('/api/nexmo/check', { reqId, code })
      .then(res => {
        console.log('res: ', res.data)
        const result = res.data;
        if (result.status === '0') {
          setSuccess(true)
          setTimeout(() => {
            props.history.push('/')
          }, 2000)
        } else {
          setError(true)
        }
      })
      .catch(e => console.log('error checking code: ', e))
    // .then ... check for status code
  }

  return (
    !success ? (
      <div>
        <form onSubmit={ev => handleSubmit(ev)}>
          {/* <div>Please enter your 4-digit verification code</div> */}
          <input type='text' onChange={ev => setCode(ev.target.value)}></input>
          <button>Submit</button>
        </form>
        {
          error && <div>Incorrect code. Please <a href='/phoneinput'>try again.</a></div>
        }
      </div>
    ) : (
        <div>
          <div>Verification successful!</div>
          <p>Redirecting...</p>
        </div>
      )
  )
}

export default withRouter(VerificationCode);