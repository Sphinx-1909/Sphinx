import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribeToChannel, unsubscribeToChannel } from '../../redux/channels';

import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Button,
} from '@material-ui/core';
import Eject from '@material-ui/icons/Eject';

class MyChannelLineItem extends Component {
  constructor(props) {
    super(props);
  }

  // unsubscribe currently works but needs to be refreshed WIP.
  // TODO: FIX IT
  clickToUnsubscribeToChannel = (ev, channelId) => {
    ev.preventDefault();
    console.log('WHAT IS THE CHANNELID ON UNSUB', channelId);
    this.props.unsubscribeToChannel(channelId);
  };

  render() {
    return (
      <ListItem divider={this.props.divider}>
        {/* <ListItemText primary={this.props.channelDetails.channelTitle} /> */}
        <Typography>{this.props.channelDetails.channelTitle}</Typography>
        <ListItemSecondaryAction>
          <ListItem
            button={true}
            onClick={ev =>
              this.clickToUnsubscribeToChannel(ev, this.props.channelDetails.id)
            }
          >
            {/* TODO: make an ternary op to change button from Add to a subscribe button / icon */}
            <Eject />
          </ListItem>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

const mapStateToProps = state => ({
  channelData: state.channels,
});

const mapDispatchToProps = dispatch => {
  return {
    subscribeToChannel: channelId => dispatch(subscribeToChannel(channelId)),
    unsubscribeToChannel: channelId =>
      dispatch(unsubscribeToChannel(channelId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyChannelLineItem);
