import React from 'react';
import { List, Paper } from '@material-ui/core';
import ChannelLineItem from './ChannelLineItem';

const ChannelsList = props => (
  // <Paper style={{ margin: 8 }}>
  <List style={{ overflow: 'auto', height: '600px' }}>
    {props.channels.map((channel, idx) => (
      <ChannelLineItem
        channelName={channel.channelTitle}
        key={`channel.${idx}`}
        divider={idx !== props.channels.length - 1}
        // onButtonClick={() => null} //need to do this later to subscribe
      />
    ))}
  </List>
  // </Paper>
);

export default ChannelsList;
