import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUserAndLogIn } from '../../redux/activeUser/activeUser';
import './SignUp.css';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
      email: '',
      userName: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  handleLogin = ev => {
    ev.preventDefault();
    const {
      firstName,
      lastName,
      repeatPassword,
      userName,
      email,
      password,
    } = this.state;

    this.props.createUserAndLogIn(this.state);
  };
  // componentWillUpdate(prevProps) {
  //   const { activeUser } = this.props;
  //   if (prevProps.activeUser.firstName !== "" && prevProps.activeUser.lastName !==""){

  //   }

  //   //console.log('activeUser', activeUser);
  // }
  render() {
    console.log('props in signUp', this.props);
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
              name={'password'}
              required
            />

            <label for={'psw-repeat'}>
              <b>Repeat Password</b>
            </label>
            <input
              type={'password'}
              placeholder={'Repeat Password'}
              name={'repeatPassword'}
              required
            />
            <div>
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
    createUserAndLogIn: newUserData =>
      dispatch(createUserAndLogIn(newUserData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
