import React, { Component } from 'react';

const AuthForm = () => {
  return (
    <form>
      <div>Please enter your phone number to receive a verification code</div>
      <input type='text'></input>
      <button>Get Verification Code</button>
    </form>
  )
}

export default AuthForm;