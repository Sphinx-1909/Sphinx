import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOneUser } from '../../redux/oneUser/oneUser';
import { fetchChannels } from '../../redux/channels';

import './MyAccount.css';
class MyAccount extends React.Component {
  constructor(props) {
    super(props);
  }

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
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  activeUser: state.activeUser,
  //channels: state.channels,
});

// const mapDispatchToProps = dispatch => {
//   return {
//     //channelthunk: () => dispatch(fetchChannels()),
//   };
// };

export default connect(mapStateToProps)(MyAccount);

//display subscriptions
