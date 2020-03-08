import React from 'react';
//React Redux
import { connect } from 'react-redux';
//icon
import Smiley from './smileyIcon';
//css
import './feed.css';
import '../../app.css';

const Feed = props => {
  const { unreadMessages, users, channels } = props;

  unreadMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="liner">
      <div className="contentCenter">
        <div className="feedBox_feed_subHeader">Channel Activity</div>
        {unreadMessages.map(msg => {
          const sendingUser = users.filter(user => user.id === msg.senderId);
          const channel = channels.filter(
            channel => channel.id === msg.channelId
          );
          return (
            <div className="feedBox_feed_item">
              <div className="feedBox_feed_item_image">
                <Smiley width={30} />
              </div>
              <div className="feedBox_feed_item_title">
                <a className="feedBox_feed_item_link">
                  {sendingUser[0].username} posted to {channel[0].channelTitle}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapState = ({ unreadMessages, users, channels }) => {
  return {
    unreadMessages,
    users,
    channels: channels.allChannels,
  };
};

export default connect(mapState)(Feed);
