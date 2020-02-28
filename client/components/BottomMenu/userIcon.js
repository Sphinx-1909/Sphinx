import React from 'react';

const searchIcon = ({
  fill = '#fff',
  width = '100%',
  height = '100%',
  className = 'bottomMenu_icon_svg',
}) => (
  <svg
    viewBox="0 0 512 512"
    height={height}
    width={width}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m348.918 37.751c50.334 50.334 50.334 131.942 0 182.276s-131.942 50.334-182.276 0-50.334-131.942 0-182.276c50.334-50.335 131.942-50.335 182.276 0" />
    <path d="m455.486 350.669c-117.498-79.391-277.917-79.391-395.415 0-17.433 11.769-27.848 31.656-27.848 53.211v111.676h451.111v-111.676c0-21.555-10.416-41.442-27.848-53.211z" />
  </svg>
);

export default searchIcon;
