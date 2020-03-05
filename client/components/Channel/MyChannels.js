import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyChannelLineItem from './MyChannelLineItem';
import { List } from '@material-ui/core';

class MyChannelSubscriptions extends Component {
  componentDidMount() {
    this.setState({
      filtered: this.props.channelData.allChannels,
    });
  }

  render() {
    return (
      <div>
        <List style={{ overflow: 'auto', height: '600px' }}>
          {this.props.channelData.myChannels.map((channel, idx) => (
            <MyChannelLineItem
              channelDetails={channel}
              key={`channel.${idx}`}
              divider={idx !== this.props.channelData.myChannels.length - 1}
            />
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  channelData: state.channels,
});

export default connect(mapStateToProps, null)(MyChannelSubscriptions);
