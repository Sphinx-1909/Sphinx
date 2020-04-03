import React from 'react';
import './TakePhoto.css';
export const PostSuccess = () => {
  return (
    <div>
      <h4>Success posting new message!</h4>
      <a href="/">
        <h5 className="TakePhoto_buttons TakePhoto_Post">Return to Map</h5>
      </a>
    </div>
  );
};
