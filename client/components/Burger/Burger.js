import React from 'react';
//css
import './Burger.css';
//react-redux
import { connect } from 'react-redux';
//actions
import { setToggleSlideMenu } from '../../redux/nav/action/nav.action';

class Burger extends React.Component {
  render() {
    return (
      <div className="burger" onClick={e => this.props.setToggleSlideMenu(e)}>
        <div
          style={{
            transform: this.props.openSlide ? 'rotate(45deg)' : 'rotate(0)',
          }}
        />
        <div
          style={{
            opacity: this.props.openSlide ? '0' : '1',
            transform: this.props.openSlide
              ? 'translateX(20px)'
              : 'translateX(0)',
          }}
        />
        <div
          style={{
            transform: this.props.openSlide ? 'rotate(-45deg)' : 'rotate(0)',
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setToggleSlideMenu: () => dispatch(setToggleSlideMenu()),
});

export default connect(null, mapDispatchToProps)(Burger);
