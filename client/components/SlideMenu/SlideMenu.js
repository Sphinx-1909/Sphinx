import React from 'react';
import { connect } from 'react-redux';
//css
import './SlideMenu.css';
//actions
import { setToggleSlideMenu } from '../../redux/nav/action/nav.action';
//import { StyledMenu } from './Menu.styled';
import { Link } from 'react-router-dom';
import MyChannelSubscriptions from '../Channel/MyChannels';
import { logOutAttempt } from '../../redux/authentication/authentication';
class SlideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onHandleClick = e => {
    if (e.target.title === 'outside') {
      this.props.setToggleSlideMenu();
    }
  };
  render() {
    return (
      <div
        className="slideMenu-wrapper"
        title="outside"
        style={{
          transform: this.props.openSlide
            ? 'translateX(0)'
            : 'translateX(-100%)',
        }}
        onClick={e => this.onHandleClick(e)}
      >
        <div
          className="slideMenu"
          style={{
            transform: this.props.openSlide
              ? 'translateX(0)'
              : 'translateX(-100%)',
          }}
        >
          <MyChannelSubscriptions />
          <Link 
            onClick={() => this.props.setToggleSlideMenu()}
            to="/createnewchannel">
            <span>Create Channel</span>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(logOutAttempt()),
  setToggleSlideMenu: () => dispatch(setToggleSlideMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideMenu);
