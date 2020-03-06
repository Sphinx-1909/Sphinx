import axios from 'axios';
//action types
const SET_MESSAGES = 'SET_MESSAGES';

//action creators
const setMessages = messages => {
  console.log('in setMessages action creator')
  return {
    type: SET_MESSAGES,
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

export const markAsRead = msgId => {
  console.log('in markAsRead');
  return dispatch => {
    axios
      .post(`/api/messages/read/${msgId}`)
      .then(() => dispatch(fetchUnreadMessages()))
      .catch(e => console.log('error in markAsRead thunk: ', e));
  };
};


export const addMessage = (msg, media) => {
  return () => {
    axios.post('/api/messages', msg)
      .then(msg => {
        console.log('success posting new message to DB!', msg.data)
        // media is set to 'upload' for file posts
        if (media && media !== 'upload') {
          // media is either image (dataUri) or video (BlobUrl)
          console.log('msg: ', msg, 'media: ', media)
          axios.post('/api/aws', { Key: msg.data.id, Body: media })
            .then(res => console.log('success posting to AWS! ', res))
            .catch(e => console.log('error posting to AWS: ', e))
        } else {
          // AWS post req. has been made directly in Upload form, so no need to post to AWS here
          return;
        }
      })
      .catch(e => console.log('error in addMessage thunk: ', e))
  }
}

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
    default:
      return state;
  }
};
