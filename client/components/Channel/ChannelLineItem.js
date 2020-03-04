import React, { Component } from 'react';
import { connect } from 'react-redux';
import { subscribeToChannel } from '../../redux/channels';

import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Button,
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';

class ChannelLineItem extends Component {
  constructor(props) {
    super(props);
  }
  clickToSubscribeToChannel = (ev, channelId) => {
    ev.preventDefault();
    console.log('WHAT IS THE CHANNELID', channelId);
    this.props.subscribeToChannel(channelId);
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
              this.clickToSubscribeToChannel(ev, this.props.channelDetails.id)
            }
          >
            {/* TODO: make an ternary op to change button from Add to a subscribe button / icon */}
            <Add />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelLineItem);
