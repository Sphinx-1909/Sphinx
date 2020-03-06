import React from 'react';
import { connect } from 'react-redux';
import './CreateChannel.css';
import { createChannelThunk } from '../../redux/channels';
<<<<<<< HEAD

class CreateChannel extends React.Component {
=======
import history from '../../history';
class CreateAChannel extends React.Component {
>>>>>>> 085563fde3e516ad4ee93d5881ad7feefef506bb
  constructor() {
    super();
    this.state = {
      channelTitle: '',
      channelDescrpition: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    console.log('this.state inside CreateChannel', this.state);
    const { channelTitle, channelDescription } = this.state;
    this.props.createChannel({ channelTitle, channelDescription });
    history.push('/');
  };

  render() {
    console.log('props in createChannel', this.props);
    return (
      <div className="createchannel">
        <form
          onSubmit={ev => ev.handleSubmit(ev)}
          className="createChannel_form"
        >
          <h3>Create a new Channel</h3>

          <label>
            <b>Channel Title</b>
          </label>

          <input
            type="channelTitle"
            name="channelTitle"
            onChange={this.handleChange}
          />

          <label>
            <b>channel Description</b>
          </label>

          <input
            type="channelDescription"
            name="channelDescription"
            onChange={this.handleChange}
          />

          <button
            onClick={ev => this.handleSubmit(ev)}
            type="submit"
            class="createbtn"
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
  channels: state.channels,
});

const mapDispatchToProps = dispatch => {
  return {
    createChannel: newChannelInfo =>
      dispatch(createChannelThunk(newChannelInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAChannel);
// need to add error message if passwords don't match
