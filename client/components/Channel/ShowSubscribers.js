import React from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import { fetchOneChannelThunk } from '../../redux/channels';

class ShowSubscribers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //   const id = this.props.channels.myChannels[0].id;
    //   this.props.fetchOneChannel(id);
  }
  handleSubmit = ev => {
    ev.preventDefault();
    // console.log('this.props.match.params.id', this.props.match.params.id);
    // const channelId=this.props.match.params.id
    //const idOfChannelOwner = this.props.activeUser.id;
    const id = this.props.channels.myChannels[0].id;

    const { channelTitle, channelDescription } = this.state;
    this.props.editChannelT({
      id,
      channelTitle,
      channelDescription,
    });
  };

  render() {
    console.log('channel', channel);
    const channelId = this.props.channelId;
    const channelWithSub = this.props.fetchOneChannel(id);

    if (!channel) {
      return <div>please hold</div>;
    } else {
      return <div>hi</div>;
    }
  }
}

const mapStateToProps = state => ({
  channels: state.channels,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchOneChannel: channelId => dispatch(fetchOneChannelThunk(channelId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowSubscribers);

//get all users that have this channel as myChannels
// drop down menu of everyone and select user to delete
//delete subscribers from
