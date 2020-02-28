import React from 'react';

const SVG = ({
  fill = '#fff',
  width = '100%',
  height = '100%',
  className = 'bottomMenu_icon_svg',
}) => (
  <svg
    viewBox="0 0 16 16"
    height={height}
    width={width}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <title />
    <defs />
    <g>
      <g transform="translate(0.000000, -528.000000)">
        <path d="M4,535 L4,537 L7,537 L7,540 L9,540 L9,537 L12,537 L12,535 L9,535 L9,532 L7,532 L7,535 Z M8,544 C3.58172178,544 0,540.418278 0,536 C0,531.581722 3.58172178,528 8,528 C12.4182782,528 16,531.581722 16,536 C16,540.418278 12.4182782,544 8,544 Z M8,544" />
      </g>
    </g>
  </svg>
);

export default SVG;
