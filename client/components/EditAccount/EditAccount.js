import React from 'react';
import { connect } from 'react-redux';
import { modifyUser } from '../../redux/activeUser/activeUser';
import './EditAccount.css';
import history from '../../history';

class EditAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      username: '',
    };
  }
  componentDidMount() {
    const { activeUser } = this.props;
    //console.log('activeUser', activeUser);
    this.setState({
      firstName: activeUser.firstName,
      lastName: activeUser.lastName,
      password: activeUser.password,
      email: activeUser.email,
      username: activeUser.username,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    console.log('...this.state inside HandleSubmit', { ...this.state });

    this.props.editUser(this.state);
  };

  render() {
    return (
      <div className="liner">
        <div className="contentCenter">
          <form
            onSubmit={ev => this.handleSubmit(ev)}
            className="editUser_form"
          >
            <div className="editUser_form_subHeader">Edit your account</div>

            <label className="editUser_form_item">
              <b>first name</b>
            </label>

            <input
              type={'firstName'}
              placeholder={`${this.props.activeUser.firstName}`}
              name={'firstName'}
              onChange={this.handleChange}
              className="editUser_form_input"
            />

            <label className="editUser_form_item">
              <b>last name</b>
            </label>

            <input
              type={'lastName'}
              placeholder={`${this.props.activeUser.lastName}`}
              name={'lastName'}
              onChange={this.handleChange}
              className="editUser_form_input"
            />

            <label className="editUser_form_item">
              <b>username</b>
            </label>

            <input
              type={'username'}
              placeholder={`${this.props.activeUser.username}`}
              name={'username'}
              onChange={this.handleChange}
              className="editUser_form_input"
            />

            <label className="editUser_form_item">
              <b>Email</b>
            </label>
            <input
              type={'text'}
              placeholder={`${this.props.activeUser.email}`}
              name={'email'}
              onChange={this.handleChange}
              className="editUser_form_input"
            />

            <label className="editUser_form_item">
              <b>Password</b>
            </label>
            <input
              type={'password'}
              placeholder={`${this.props.activeUser.password}`}
              name={'password'}
              onChange={this.handleChange}
              className="editUser_form_input"
            />
            <div className="login_buttons">
              <button
                onSubmit={ev => this.handleSubmit(ev)}
                type="submit"
                class="editUser_form_links"
              >
                Save
              </button>
              <button
                onClick={() => history.push('/')}
                type="button"
                class="editUser_form_links_cancel"
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
});

const mapDispatchToProps = dispatch => {
  return {
    editUser: edits => dispatch(modifyUser(edits)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
