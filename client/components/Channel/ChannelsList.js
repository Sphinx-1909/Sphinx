import React from 'react';
import { List, Paper } from '@material-ui/core';
import ChannelLineItem from './ChannelLineItem';
import history from '../../history';
import './ChannelList.css';

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
    <div className="ChannelList_buttons">
      <button
        onClick={() => history.push('/')}
        className="ChannelList_buttons_links"
      >
        Back To Map
      </button>
    </div>
  </List>
  // </Paper>
);

export default ChannelsList;
