import React from 'react';
//css
import './SlideMenu.css';
//import { StyledMenu } from './Menu.styled';
import { Link } from 'react-router-dom';
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
        <Link to="/account">Account</Link>
      </div>
    );
  }
}

export default SlideMenu;
