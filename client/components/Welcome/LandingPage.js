import React from 'react';
import { withRouter } from 'react-router-dom';
//css
import './landing.css';

const LandingPage = props => {
  return (
    <div className="liner">
      <div className="contentCenter">
        <div className="landing_Header">Welcome to Sphinx!</div>
        <div className="landing_subHeader">Please login to continue</div>
        <div className="landing_buttons">
          <button
            className="landing_buttons_links"
            onClick={() => props.history.push('/login')}
          >
            LOGIN
          </button>
          <button
            className="landing_buttons_links_new"
            onClick={() => props.history.push('/signup')}
          >
            CREATE ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LandingPage);
