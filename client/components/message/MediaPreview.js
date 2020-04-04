import React from 'react';
import './MediaPreview.css';
export const MediaPreview = props => {
  const { type } = props;
  return (
    <>
      {type === 'image' ? (
        <img src={props.data} className="image" />
      ) : (
        <video src={props.data} autoPlay={true} className="image" />
      )}
    </>
  );
};

export default MediaPreview;
