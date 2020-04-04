import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logOutAttempt } from '../../redux/authentication/authentication';
import history from '../../history';
import './MyAccount.css';
class MyAccount extends React.Component {
  constructor(props) {
    super(props);
  }
  handleLogOut = ev => {
    console.log('hitting handleLogOut method?', ev);
    this.props.signout();
    history.push('/');
  };

  render() {
    const { activeUser, channels } = this.props;
    return (
      <div className="liner">
        <div className="contentCenter">
          {/*<img src="img.jpg" alt="John" style="width:100%">*/}
          <div className="myAccountBox_account_subHeader">ACCOUNT INFO</div>
          <div className="myAccountBox_account_info">
            <div className="myAccountBox_account_info_name">{`${activeUser.firstName} ${activeUser.lastName}`}</div>
            <div className="myAccountBox_account_info_item">
              password: {activeUser.password}
            </div>
            <div className="myAccountBox_account_info_item">
              username: {activeUser.username}
            </div>
            <div className="myAccountBox_account_info_item">
              email: {activeUser.email}
            </div>
          </div>
          <div className="myAccountBox_buttons">
            <button
              className="myAccountBox_buttons_links"
              to="/editaccount"
              onClick={e => history.push('/editaccount')}
            >
              Edit
            </button>

            <button
              className="myAccountBox_buttons_links"
              onClick={ev => this.handleLogOut(ev)}
              type="button"
            >
              log-out
            </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  activeUser: state.activeUser,
  authentication: state.authentication,
  //channels: state.channels,
});

const mapDispatchToProps = dispatch => ({
  signout: () => dispatch(logOutAttempt()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MyAccount)
);

//display subscriptions
