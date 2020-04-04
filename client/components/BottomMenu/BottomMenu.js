import React from 'react';
//css
import './BottomMenu.css';
//React-Redux
import { connect } from 'react-redux';
//React Router Dom
import { Link } from 'react-router-dom';
//icons
import Search from './searchIcon';
import Feed from './feedIcon';
import Add from './AddIcon';
import Login from './loginIcon';
import User from './userIcon';
import Map from './mapIcon';

class BottomMenu extends React.Component {
  render() {
    console.log('bottomMenu props', this.props);
    return (
      <div
        className="bottomMenu"
        style={{
          transform:
            this.props.openSlide === false
              ? 'translateY(0)'
              : 'translateY(200%)',
        }}
      >
        <div className="bottomMenu_icon">
          {this.props.activeUser.id ? (
            <Link to="/channelsearch">
              <Search width={40} />
            </Link>
          ) : (
            <Search width={40} />
          )}
        </div>

        <div className="bottomMenu_icon">
          {this.props.activeUser.id ? (
            <Link to="/">
              <Map width={40} />
            </Link>
          ) : (
            <Map width={40} />
          )}
        </div>

        <div className="bottomMenu_icon">
          {this.props.activeUser.id ? (
            <Link to="/channelSelect">
              <Add width={40} />
            </Link>
          ) : (
            <Add width={40} />
          )}
        </div>
        <div className="bottomMenu_icon">
          {this.props.activeUser.id ? (
            <Link to="/feed">
              <Feed width={40} />
            </Link>
          ) : (
            <Feed width={40} />
          )}
        </div>
        {this.props.activeUser.id ? (
          <div className="bottomMenu_icon">
            <Link to="/user">
              <User width={40} />
            </Link>
          </div>
        ) : (
          <div className="bottomMenu_icon">
            <Link to="/login">
              <Login fill="#fff" width={40} />
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeUser: state.activeUser,
});

export default connect(mapStateToProps)(BottomMenu);
