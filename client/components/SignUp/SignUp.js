import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { modifyUser } from '../../redux/activeUser/activeUser';
import './EditAccount.css';

class EditAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log('props in EditAccount', this.props);
    return (
      <div>
        <form
          onSubmit={ev => ev.preventDefault()}
          style={{ border: '1px solid #ccc' }}
        >
          <div class="container">
            <h1>Sign Up</h1>
            <p>Please fill in this form to create an account.</p>
            <label for={'email'}>
              <b>Email</b>
            </label>
            <input
              type={'text'}
              placeholder={'Enter Email'}
              name={'email'}
              required
            />

            <label for={'psw'}>
              <b>Password</b>
            </label>
            <input
              type={'password'}
              placeholder={'Enter Password'}
              name={'psw'}
              required
            />

            <label for={'psw-repeat'}>
              <b>Repeat Password</b>
            </label>
            <input
              type={'password'}
              placeholder={'Repeat Password'}
              name={'psw-repeat'}
              required
            />

            <label>
              <input
                type={'checkbox'}
                checked={'checked'}
                name={'remember'}
                style={{ marginBottom: '15px' }}
              />{' '}
              Remember me
            </label>

            <div class="clearfix">
              <button type="button" class="cancelbtn">
                Cancel
              </button>
              <button type="submit" class="signupbtn">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeUser: state.activeUser,
});

const mapDispatchToProps = dispatch => {
  return {
    editUser: edits => dispatch(modifyUser(edits)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
