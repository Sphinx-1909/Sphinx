import React, { Component, useState } from 'react';
import { authPhone } from '../../../redux/authentication/authentication'
import { connect } from 'react-redux';

const PhoneInput = () => {

  const [num, setNum] = useState('')

  const handleClick = () => {
    this.props.authPhone(num)
  }

  return (
    <form>
      <div>Please enter your 10-digit phone number to receive a verification code</div>
      <input type='text' onChange={ev => setNum(ev.target.value)}></input>
      <button onClick={handleClick}>Get Verification Code</button>
    </form>
  )
}

const mapDispatch = dispatch => {
  return {
    authPhone: phoneNum => dispatch(authPhone(phoneNum))
  }
}

export default connect(null, mapDispatch)(PhoneInput);