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
      username: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = ev => {
    ev.preventDefault();

    if (this.state.reTypePassword !== this.state.password) {
      alert("Passwords don't match");
    } else {
      console.log('line 31 in SignUp.js');
      const { firstName, lastName, username, email, password } = this.state;
      this.props.createUserAndLogIn({
        firstName,
        lastName,
        username,
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
    // console.log('props in signUp', this.props);
    return (
      <div className="liner">
        <div className="contentCenter">
          <form
            onSubmit={ev => ev.handleSubmit(ev)}
            className="createUser_form"
          >
            <div className="signUp_form_subHeader">Create an account</div>

            <label className="signUp_form_item">
              <b>first name</b>
            </label>

            <input
              type="firstName"
              name="firstName"
              onChange={this.handleChange}
              className="signUp_form_input"
            />

            <label className="signUp_form_item">
              <b>last name</b>
            </label>

            <input
              type="lastName"
              name="lastName"
              onChange={this.handleChange}
              className="signUp_form_input"
            />

            <label className="signUp_form_item">
              <b>username</b>
            </label>

            <input
              type="username"
              name="username"
              onChange={this.handleChange}
              className="signUp_form_input"
            />

            <label className="signUp_form_item">
              <b>Email</b>
            </label>
            <input
              type="text"
              name="email"
              className="signUp_form_input"
              onChange={this.handleChange}
            />

            <label className="signUp_form_item">
              <b>Password</b>
            </label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              className="signUp_form_input"
            />
            <label className="signUp_form_item">
              <b>Re-type Password</b>
            </label>
            <input
              type="password"
              name="reTypePassword"
              onChange={this.handleChange}
              className="signUp_form_input"
            />
            <div className="signUp_form_buttons">
              <button
                onClick={ev => this.handleSubmit(ev)}
                type="submit"
                className="signUp_form_links"
              >
                Save
              </button>
              <button
                onClick={() => history.push('/')}
                type="button"
                className="signUp_form_links_cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
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
