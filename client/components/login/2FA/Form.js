import React, { Component } from 'react';

const AuthForm = () => {
  return (
    <form>
      <div>Please enter your 10-digit phone number to receive a verification code</div>
      <input type='text'></input>
      <button>Get Verification Code</button>
    </form>
  )
}

export default AuthForm;