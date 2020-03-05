import React from 'react';

export const MediaPreview = (props) => {
  const { type } = props
  return (
    <>
      {
        type === 'image' ? (
          <img src={props.data} />
        ) : (
            <video src={props.data} autoPlay={true} />
          )
      }
    </>
  );
};

export default MediaPreview;