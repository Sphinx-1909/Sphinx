import axios from 'axios';
//action types
const SET_MESSAGES = 'SET_MESSAGES';
const SET_FILTERED_MESSAGES = 'SET_FILTERED_MESSAGES';

//action creators
const setMessages = messages => {
  // console.log('in setMessages action creator');
  return {
    type: SET_MESSAGES,
    messages,
  };
};

const setFilteredMessages = messages => {
  // console.log('in setMessages action creator');
  return {
    type: SET_FILTERED_MESSAGES,
    messages,
  };
};

//thunks
export const fetchUnreadMessages = () => {
  // console.log('in fetchUnreadMessages thunk')
  return async dispatch => {
    try {
      const subscriptions = (await axios.get('/api/channels')).data;
      const readMessages = (await axios.get('/api/messages/read')).data;
      const readMessageIds = [];
      readMessages.forEach(msg => readMessageIds.push(msg.id));
      const unreadMessages = [];
      subscriptions.forEach(subscription => {
        subscription.messages.forEach(message => {
          // if message.id is not found in readMessages, push message into unreadMessages arr
          if (!readMessageIds.includes(message.id)) {
            unreadMessages.push(message);
          }
        });
      });
      return dispatch(setMessages(unreadMessages));
    } catch (e) {
      console.log('error in fetchUnreadMessages thunk: ', e);
    }
  };
};

// This thunk will grab an array of channels objects that includes messages array (which can be empty if there is no unread messages)
// This is currently not in use and not sure if anyone wants to use it, but I wrote this b/c I created a new route in channels that pull all unread messages in /api/channels/withunreadmessages. Only use case for this would be if the someone needs channel data (ie. channel name, desc, etc.) and unread messages. Otherwise the original thunk will do the job in grabbing all the unread messages.
export const fetchUnreadMessagesV2 = () => {
  return dispatch => {
    axios
      .get('/api/channels/withunreadmessages/')
      .then(unreadMessages => dispatch(setMessages(unreadMessages.data)))
      .catch(e => console.log('error in fetchUnreadmessagesV2 thunk: ', e));
  };
};

// need to DRY this up
export const filteredMessages = arrOfChannelIds => {
  return async dispatch => {
    const subscriptions = (await axios.get('/api/channels')).data;
    const readMessages = (await axios.get('/api/messages/read')).data;
    const readMessageIds = [];
    readMessages.forEach(msg => readMessageIds.push(msg.id));
    const unreadMessages = [];
    subscriptions.forEach(subscription => {
      subscription.messages.forEach(message => {
        // if message.id is not found in readMessages, push message into unreadMessages arr
        if (!readMessageIds.includes(message.id)) {
          unreadMessages.push(message);
        }
      });
    });
    const filMessages = unreadMessages.filter(
      message => arrOfChannelIds.includes(message.channelId) === true
    );
    dispatch(setFilteredMessages(filMessages));
  };
};

export const upVoteMessage = msgId => {
  return dispatch => {
    axios
      .put(`/api/messages/upvote/${msgId}`)
      .then(() => {
        dispatch(fetchUnreadMessages());
      })
      .catch(e => console.log('error in upVote thunk: ', e));
  };
};

export const downVoteMessage = msgId => {
  return dispatch => {
    axios
      .put(`/api/messages/downvote/${msgId}`)
      .then(() => {
        dispatch(fetchUnreadMessages());
      })
      .catch(e => console.log('error in upVote thunk: ', e));
  };
};

export const markAsRead = msgId => {
  return dispatch => {
    axios
      .post(`/api/messages/readmessage/${msgId}`)
      .then(() => {
        dispatch(fetchUnreadMessages());
      })
      .catch(e => console.log('error in markAsRead thunk: ', e));
  };
};

export const addMessage = (message, media) => {
  // console.log('media in addMessage thunk line 94: ', media)
  return () => {
    return axios
      .post('/api/messages', message)
      .then(msg => {
        msg = msg.data
        // console.log('success posting new message to DB line 100!', msg);
        // media is set to 'upload' for file posts
        if (media && media !== 'upload') {
          // media is either image (dataUri) or video (BlobUrl)
          // console.log(' line 104 msg: ', msg, 'media: ', media);
          if (msg.fileType === 'image' || msg.fileType === 'video') {
            axios
              .post(`/api/aws/${msg.fileType}`, { Key: msg.id, Body: media })
              .then(data => {
                console.log('success posting to AWS! ', data)
                // return data;
              })
              .catch(e => console.log('error posting to AWS: ', e));
          } else {
            // AWS post req. has been made directly in Upload form, so no need to post to AWS here
            return;
          }
        }
      })
      .catch(e => console.log('error in addMessage thunk: ', e));
  };
};

// export const getMediaMessage = (Key) => {
//   // return () => {
//   axios.get(`/api/aws/${Key}`)
//     .then(media => {
//       console.log('media.data: ', media.data)
//       return media.data;
//     })
//     .catch(e => console.log('error in getMediaMessage thunk: ', e))
//   // }
// }

const initialState = [];

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages;
    case SET_FILTERED_MESSAGES:
      return action.messages;
    default:
      return state;
  }
};
