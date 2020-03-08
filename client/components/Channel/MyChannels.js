import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyChannelLineItem from './MyChannelLineItem';
import { List } from '@material-ui/core';
import { filteredMessages } from '../../redux/messages';

class MyChannelSubscriptions extends Component {
  constructor() {
    super();
    this.state = {
      selectedChannels: [],
    };
  }
  // componentDidMount() {
  //   this.setState({
  //     filtered: this.props.channelData.allChannels,
  //   });
  // }

  addToFilterList = channelId => {
    const { selectedChannels } = this.state;

    //logic to add channel to an array for comparison on odd number clicks and every even number clicks it will remove the channel from filter
    if (!selectedChannels.includes(channelId)) {
      selectedChannels.push(channelId);
    } else if (selectedChannels.includes(channelId)) {
      const idx = selectedChannels.indexOf(channelId);
      selectedChannels.splice(idx, 1);
    }
    console.log('FILTER CHANNELIDS', channelId);
    console.log(
      'WHAT IS THE ARRAY OF SELECTED CHANNELS',
      this.state.selectedChannels
    );
  };

  render() {
    return (
      <div>
        <List style={{ overflow: 'auto', height: '600px' }}>
          {this.props.channelData.myChannels.map((channel, idx) => (
            <MyChannelLineItem
              channelDetails={channel}
              key={`channel.${idx}`}
              divider={idx !== this.props.channelData.myChannels.length - 1}
              filterFunction={() => this.addToFilterList(channel.id)}
              fetchFilteredMessage={() =>
                this.props.filteredMessages(this.state.selectedChannels)
              }
            />
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channelData: state.channels,
  messages: state.unreadMessages,
});

const mapDispatchToProps = dispatch => {
  return {
    filteredMessages: arrOfChannelIds =>
      dispatch(filteredMessages(arrOfChannelIds)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyChannelSubscriptions);
