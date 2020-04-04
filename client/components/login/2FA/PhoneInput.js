import React, { useState } from 'react';
// import { authPhone } from '../../../redux/authentication/authentication'
import { connect } from 'react-redux';
import axios from 'axios'
import VerificationCode from './VerificationCode';

const PhoneInput = (props) => {

  const [num, setNum] = useState('')
  const [reqId, setReqId] = useState('')

  const handleSubmit = (ev) => {
    ev.preventDefault();
    axios.post('/api/nexmo/verify', { phoneNum: num })
      // receive the request ID back to use on the front end (When your user submits the correct PIN, you will need to plug both the PIN and the request ID into the check() function.)
      .then(id => setReqId(id.data))
      .catch(e => console.log('error authorizing phone: ', e))
  }

  return (
    reqId ? (
      <VerificationCode reqId={reqId} />
    ) : (
        <form onSubmit={ev => handleSubmit(ev)}>
          {/* <p>Please enter your 10-digit phone number to receive a verification code</p> */}
          <input type='text' onChange={ev => setNum(ev.target.value)}></input>
          <button type='submit' >Get Verification Code</button>
        </form>
      )
  )
}

// const mapDispatch = dispatch => {
//   return {
//     authPhone: phoneNum => dispatch(authPhone(phoneNum))
//   }
// }

// export default connect(null, mapDispatch)(PhoneInput);

export default PhoneInput