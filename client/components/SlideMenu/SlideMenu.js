import React from 'react';
//css
import './SlideMenu.css';
//import { StyledMenu } from './Menu.styled';

class SlideMenu extends React.Component {
  render() {
    return (
      <div
        className="slideMenu"
        style={{
          transform: this.props.openSlide
            ? 'translateX(0)'
            : 'translateX(-100%)',
        }}
      >
        <a>CHANNELS</a>
        <a>SETTINGS</a>
        <a>ACCOUNT</a>
      </div>
    );
  }
}

export default SlideMenu;
