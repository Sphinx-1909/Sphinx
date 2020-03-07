import React from 'react';
import { withRouter } from 'react-router-dom';

const LandingPage = (props) => {
  return (
    <div>
      <h1>Welcome to Sphinx!</h1>
      <h3>Please login to continue</h3>
      <button onClick={() => props.history.push('/login')}>LOGIN</button>
      <a href='/signup'>Create a free account</a>
    </div>
  )
}

export default withRouter(LandingPage)