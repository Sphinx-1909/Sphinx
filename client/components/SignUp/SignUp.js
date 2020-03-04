import React from 'react';
import { connect } from 'react-redux';
import { createUserAndLogIn } from '../../redux/activeUser/activeUser';
import './SignUp.css';
import history from '../../history';

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
  handleSubmit = ev => {
    ev.preventDefault();
    console.log('this.state inside SignUp', this.state);
    if (this.state.reTypePassword !== this.state.password) {
      alert("Passwords don't match");
    } else {
      const { firstName, lastName, userName, email, password } = this.state;
      this.props.createUserAndLogIn({
        firstName,
        lastName,
        userName,
        email,
        password,
      });
    }
  };
  componentWillUpdate(prevProps) {
    if (prevProps.authentication.isLoggedIn === true) {
      history.push('/');
    }
  }

  render() {
    console.log('props in signUp', this.props);
    return (
      <div className="createUser">
        <form onSubmit={ev => ev.handleSubmit(ev)} className="createUser_form">
          <h3>Create an account</h3>

          <label>
            <b>first name</b>
          </label>

          <input
            type="firstName"
            name="firstName"
            onChange={this.handleChange}
          />

          <label>
            <b>last name</b>
          </label>

          <input type="lastName" name="lastName" onChange={this.handleChange} />

          <label>
            <b>username</b>
          </label>

          <input type="userName" name="userName" onChange={this.handleChange} />

          <label>
            <b>Email</b>
          </label>
          <input type="text" name="email" onChange={this.handleChange} />

          <label>
            <b>Password</b>
          </label>
          <input type="password" name="password" onChange={this.handleChange} />
          <label>
            <b>Re-type Password</b>
          </label>
          <input
            type="password"
            name="reTypePassword"
            onChange={this.handleChange}
          />
          <button
            onClick={ev => this.handleSubmit(ev)}
            type="submit"
            class="signupbtn"
          >
            Save
          </button>
          <button
            onClick={() => history.push('/')}
            type="button"
            class="cancelbtn"
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeUser: state.activeUser,
  authentication: state.authentication,
});

const mapDispatchToProps = dispatch => {
  return {
    createUserAndLogIn: newUserData =>
      dispatch(createUserAndLogIn(newUserData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
// need to add error message if passwords don't match
