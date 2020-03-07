import React from 'react';
import { connect } from 'react-redux';
import './EditChannel.css';
import { editChannelThunk } from '../../redux/channels';
import history from '../../history';

class EditAChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: this.props.match.params.id,
      channelTitle: '',
      channelDescrpition: '',
      //channelsModerators: '',
    };
  }
  componentDidMount() {
    console.log('CDM this.props.channels', this.props.channels);
    const {
      channelTitle,
      channelDescription,
    } = this.props.channels.myChannels[0];

    this.setState({
      channelTitle: channelTitle,
      channelDescrpition: channelDescription,
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    // console.log('this.props.match.params.id', this.props.match.params.id);
    // const channelId=this.props.match.params.id
    const idOfChannelOwner = this.props.activeUser.id;
    console.log('idOfChannelOwner', idOfChannelOwner);
    const { channelTitle, channelDescription, channelId } = this.state;
    this.props.editChannelT({
      channelId,
      channelTitle,
      channelDescription,
    });
  };
  //only one channel passed in
  render() {
    console.log('inside render', this.props);
    let myOneChannel = this.props.channels.myChannels[0];
    console.log(
      'this.props.channels.myChannels[0]',
      this.props.channels.myChannels[0]
    );
    if (!myOneChannel) {
      return <div>please hold</div>;
    } else {
      return (
        <div className="editchannel">
          <form
            onSubmit={ev => ev.handleSubmit(ev)}
            className="editChannel_form"
          >
            <h3>Edit a Channel</h3>

            <label>
              <b>Name</b>
            </label>

            <input
              type="channelTitle"
              name="channelTitle"
              placeholder={`${myOneChannel.channelTitle}`}
              onChange={ev => this.handleChange(ev)}
            />

            <label>
              <b>Description</b>
            </label>

            <input
              type="channelDescription"
              name="channelDescription"
              placeholder={`${myOneChannel.channelDescription}`}
              onChange={ev => this.handleChange(ev)}
            />
            <label>
              <b>Add Moderator</b>
            </label>

            <input
              type="channelsModerators"
              name="channelsModerators"
              onChange={ev => this.handleChange(ev)}
            />

            <button
              onClick={ev => this.handleSubmit(ev)}
              type="submit"
              class="editbtn"
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
}

const mapStateToProps = state => ({
  channels: state.channels,
  activeUser: state.activeUser,
});

const mapDispatchToProps = dispatch => {
  return {
    editChannelT: editedChannelInfo =>
      dispatch(editChannelThunk(editedChannelInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditAChannel);

//You can do an edit channels for channels that the user created
//You’d need to utilize the api for channels and look at the ChannelUser to see if they are the owner
//And put those channels info a component that lets them modify the details
//edit name, description, moderators
