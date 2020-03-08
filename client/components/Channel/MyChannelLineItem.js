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
  Collapse,
  ListSubheader,
} from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';

class MyChannelLineItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  clickToOpen = () => {
    this.setState({ open: !this.state.open });
  };

  clickToUnsubscribeToChannel = (ev, channelId) => {
    ev.preventDefault();
    console.log('WHAT IS THE CHANNELID ON UNSUB', channelId);
    this.props.unsubscribeToChannel(channelId);
  };

  render() {
    return (
      <>
        <ListItem
          button={true}
          onClick={() => {
            this.props.filterFunction();
            this.props.fetchFilteredMessage();
          }}
          divider={this.props.divider}
        >
          {/* <ListItemText primary={this.props.channelDetails.channelTitle} /> */}
          <Typography>{this.props.channelDetails.channelTitle}</Typography>
          <ListItemSecondaryAction>
            <ListItem button={true} onClick={() => this.clickToOpen()}>
              {this.state.open === true ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component={'div'}>
            <ListSubheader>Channel Description</ListSubheader>
            <ListItem>
              <ListItemText
                primary={this.props.channelDetails.channelDescription}
              />
            </ListItem>
            <ListItem
              button={true}
              style={{ backgroundColor: 'tomato' }}
              onClick={ev =>
                this.clickToUnsubscribeToChannel(
                  ev,
                  this.props.channelDetails.id
                )
              }
            >
              <ListItemText primary={'Leave Channel'} />
              <ExitToApp />
            </ListItem>
          </List>
        </Collapse>
      </>
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
