import React from 'react';
import './TakePhoto.css';
export const PostSuccess = () => {
  return (
    <div>
      <div className="PostSuccess_subHeader">Success posting new message!</div>
      <a href="/">
        <h5 className="TakePhoto_buttons TakePhoto_Post">Return to Map</h5>
      </a>
    </div>
  );
};
