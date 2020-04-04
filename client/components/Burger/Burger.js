import React from 'react';
//css
import './Burger.css';
//react-redux
import { connect } from 'react-redux';
//actions
import { setToggleSlideMenu } from '../../redux/nav/action/nav.action';

class Burger extends React.Component {
  handleClick = e => {
    if (this.props.authentication.isLoggedIn) {
      this.props.setToggleSlideMenu(e);
    } else {
      return '';
    }
  };
  render() {
    return (
      <div className="burger" onClick={e => this.handleClick(e)}>
        <div
          style={{
            transform: this.props.openSlide ? 'rotate(45deg)' : 'rotate(0)',
          }}
        />
        <div
          style={{
            opacity: this.props.openSlide ? '0' : '1',
            transform: this.props.openSlide
              ? 'translateX(0px)'
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

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const mapDispatchToProps = dispatch => ({
  setToggleSlideMenu: () => dispatch(setToggleSlideMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Burger);
