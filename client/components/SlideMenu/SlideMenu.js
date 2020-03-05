import React from 'react';
import { connect } from 'react-redux';
//css
import './SlideMenu.css';
//import { StyledMenu } from './Menu.styled';
import { Link } from 'react-router-dom';

import { logOutAttempt } from '../../redux/authentication/authentication';
class SlideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
        <Link to="/mychannels">
          <a>CHANNELS</a>
        </Link>
        <Link to="/createnewchannel">
          <a>Create a new channel</a>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
});

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(logOutAttempt()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlideMenu);
