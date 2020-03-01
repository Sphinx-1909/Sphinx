import React from 'react';

import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';
import Add from '@material-ui/icons/Add';

const ChannelLineItem = props => (
  <ListItem divider={props.divider}>
    {/* <ListItemText primary={props.channelName} /> */}
    <Typography>{props.channelName}</Typography>
    <ListItemSecondaryAction>
      {/* need to add onbuttonclick */}
      <IconButton aria-label="Subscribe">
        <Add />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

export default ChannelLineItem;
