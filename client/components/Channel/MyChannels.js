import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyChannelLineItem from './MyChannelLineItem';
import {
  List,
  ListItem,
  Checkbox,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { filteredMessages, fetchUnreadMessages } from '../../redux/messages';

class MyChannelSubscriptions extends Component {
  constructor() {
    super();
    this.state = {
      selectedChannels: [],
      selectFilterOption: false,
    };
  }

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
          <h2>
            <u>CHANNELS</u>
          </h2>
          <ListItem>
            <ListItemSecondaryAction>
              <span>Filter Channels</span>
              <Checkbox
                color="primary"
                value="Filter Channel"
                onChange={() => {
                  this.setState({
                    selectFilterOption: !this.state.selectFilterOption,
                  });
                  //At this point its going to be reverse logic so if its false then filtermessage is will be overriding the unread messages. A bit confusing but oh well... for now...
                  this.state.selectFilterOption === false
                    ? this.props.filteredMessages(this.state.selectedChannels)
                    : this.props.fetchUnreadMessages();
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          {this.props.channelData.myChannels.map((channel, idx) => (
            <MyChannelLineItem
              channelDetails={channel}
              key={`channel.${idx}`}
              divider={idx !== this.props.channelData.myChannels.length - 1}
              filterFunction={() => this.addToFilterList(channel.id)}
              fetchFilteredMessage={() =>
                this.props.filteredMessages(this.state.selectedChannels)
              }
              isFilterOn={this.state.selectFilterOption}
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
    fetchUnreadMessages: () => dispatch(fetchUnreadMessages()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyChannelSubscriptions);
