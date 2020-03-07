import React from 'react';
import { connect } from 'react-redux';
import './CreateChannel.css';
import { createChannelThunk } from '../../redux/channels';
import history from '../../history';

class CreateAChannel extends React.Component {
  constructor() {
    super();
    this.state = {
      channelTitle: '',
      channelDescription: '',
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
      <div className="liner">
        <div className="contentCenter">
          <form
            onSubmit={ev => ev.handleSubmit(ev)}
            className="createChannel_form"
          >
            <div className="creastChannel_form_subHeader">CREATE CHANNEL</div>

            <label className="creastChannel_form_item">
              <b>Name</b>
            </label>

            <input
              type="channelTitle"
              name="channelTitle"
              onChange={this.handleChange}
              className="creastChannel_form_input"
            />

            <label className="creastChannel_form_item">
              <b>Description</b>
            </label>

            <input
              type="channelDescription"
              name="channelDescription"
              onChange={this.handleChange}
              className="creastChannel_form_input"
            />
            <div className="creastChannel_form_buttons">
              <button
                onClick={ev => this.handleSubmit(ev)}
                type="submit"
                className="creastChannel_form_links"
              >
                Save
              </button>
              <button
                onClick={() => history.push('/')}
                type="button"
                className="creastChannel_form_links_cancel"
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
