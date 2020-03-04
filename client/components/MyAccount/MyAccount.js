import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    console.log('props in MYAccount', this.props.activeUser);
    const { activeUser, channels } = this.props;
    console.log('channels', channels);
    return (
      <div className="card">
        <div className="inner_card">
          {/*<img src="img.jpg" alt="John" style="width:100%">*/}
          <h2>{`${activeUser.firstName} ${activeUser.lastName}`}</h2>
          <p>password: {activeUser.password}</p>
          <p>username: {activeUser.userName}</p>
          <p>email: {activeUser.email}</p>
          <Link to="/editaccount">
            <button>Edit</button>
          </Link>
          <button
            onClick={ev => this.handleLogOut(ev)}
            type="button"
            class="logoutbtn"
          >
            log-out
          </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);

//display subscriptions
