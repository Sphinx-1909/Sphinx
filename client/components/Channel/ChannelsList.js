import React from 'react';
import { List, Paper } from '@material-ui/core';
import ChannelLineItem from './ChannelLineItem';

const ChannelsList = props => (
  // <Paper style={{ margin: 8 }}>
  <List style={{ overflow: 'auto', height: '600px' }}>
    {props.channels.map((channel, idx) => (
      <ChannelLineItem
        channelDetails={channel}
        checkList={props.checkList}
        key={`channel.${idx}`}
        divider={idx !== props.channels.length - 1}
      />
    ))}
  </List>
  // </Paper>
);

export default ChannelsList;
