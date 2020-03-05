import React from 'react';
//React Redux
import { connect } from 'react-redux';
//icon
import Smiley from './smileyIcon';
//css
import './feed.css';

class Feed extends React.Component {
  render() {
    return (
      <div className="feedBox">
        <div className="feedBox_feed">
          <div className="feedBox_feed_subHeader">Channel Activity</div>

          <div className="feedBox_feed_item">
            <div className="feedBox_feed_item_image">
              <Smiley width={30} />
            </div>
            <div className="feedBox_feed_item_title">
              <a className="feedBox_feed_item_link">
                John554 posted to weird stuff
              </a>
            </div>
          </div>
          <div className="feedBox_feed_item">
            <div className="feedBox_feed_item_image">
              <Smiley width={30} />
            </div>
            <div className="feedBox_feed_item_title">
              <a className="feedBox_feed_item_link">
                Sallykewl started following weird stuff
              </a>
            </div>
          </div>
          <div className="feedBox_feed_item">
            <div className="feedBox_feed_item_image">
              <Smiley width={30} />
            </div>
            <div className="feedBox_feed_item_title">
              <a className="feedBox_feed_item_link">NYC tours added new post</a>
            </div>
          </div>
          <div className="feedBox_feed_subHeader">Stats</div>
          <div className="feedBox_feed_item">
            <div className="feedBox_feed_item_image">
              <Smiley width={30} />
            </div>
            <div className="feedBox_feed_item_title">
              <a className="feedBox_feed_item_link">
                Weird stuff most visited location 8th aveand 14th str
              </a>
            </div>
          </div>
          <div className="feedBox_feed_item">
            <div className="feedBox_feed_item_image">
              <Smiley width={30} />
            </div>
            <div className="feedBox_feed_item_title">
              <a className="feedBox_feed_item_link">
                NYC tour most liked location at 7th ave and 62nd str
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Feed);
