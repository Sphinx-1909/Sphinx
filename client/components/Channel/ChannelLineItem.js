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
import CheckCircle from '@material-ui/icons/CheckCircle';

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
    // console.log(this.props.checkList);
    return (
      <ListItem
        divider={this.props.divider}
        className="searchBox_search_subHeader_item"
      >
        <ListItemText primary={this.props.channelDetails.channelTitle} />
        {/* <Typography>{this.props.channelDetails.channelTitle}</Typography> */}
        <ListItemSecondaryAction>
          {!this.props.checkList.includes(this.props.channelDetails.id) ? (
            <ListItem
              button={true}
              onClick={ev =>
                this.clickToSubscribeToChannel(ev, this.props.channelDetails.id)
              }
            >
              <Add />
            </ListItem>
          ) : (
            <ListItem>
              <CheckCircle />
            </ListItem>
          )}
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
