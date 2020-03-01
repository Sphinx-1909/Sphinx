import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChannelsList from './ChannelsList';

class MyChannelSubscriptions extends Component {
  componentDidMount() {
    this.setState({
      filtered: this.props.channelData.allChannels,
    });
  }

  render() {
    return (
      <div>
        <div>My Channel Subscriptions</div>
        <ChannelsList channels={this.props.channelData.myChannels} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channelData: state.channels,
});

export default connect(mapStateToProps, null)(MyChannelSubscriptions);
