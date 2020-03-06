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
      userName: '',
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
      userName: activeUser.userName,
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
      <div className="editUser">
        <form onSubmit={ev => this.handleSubmit(ev)} className="editUser_form">
          <h3>Edit your account</h3>

          <label>
            <b>first name</b>
          </label>

          <input
            type={'firstName'}
            placeholder={`${this.props.activeUser.firstName}`}
            name={'firstName'}
            onChange={this.handleChange}
          />

          <label>
            <b>last name</b>
          </label>

          <input
            type={'lastName'}
            placeholder={`${this.props.activeUser.lastName}`}
            name={'lastName'}
            onChange={this.handleChange}
          />

          <label>
            <b>username</b>
          </label>

          <input
            type={'userName'}
            placeholder={`${this.props.activeUser.userName}`}
            name={'userName'}
            onChange={this.handleChange}
          />

          <label>
            <b>Email</b>
          </label>
          <input
            type={'text'}
            placeholder={`${this.props.activeUser.email}`}
            name={'email'}
            onChange={this.handleChange}
          />

          <label>
            <b>Password</b>
          </label>
          <input
            type={'password'}
            placeholder={`${this.props.activeUser.password}`}
            name={'password'}
            onChange={this.handleChange}
          />
          <button
            onSubmit={ev => this.handleSubmit(ev)}
            type="submit"
            class="saveupbtn"
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
});

const mapDispatchToProps = dispatch => {
  return {
    editUser: edits => dispatch(modifyUser(edits)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
