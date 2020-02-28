import axios from 'axios';
//action types
const SET_MESSAGES = 'SET_MESSAGES';

//action creators
const setMessages = messages => {
  return {
    type: SET_MESSAGES,
    messages,
  };
};

//thunks
export const fetchUnreadMessages = () => {
  return async dispatch => {
    // first get subscriptions
    try {
      const subscriptions = (await axios.get('/api/channels')).data
      const readMessages = (await axios.get('/api/messages/read')).data
      const readMessageIds = [];
      readMessages.forEach(msg => readMessageIds.push(msg.id))
      const unreadMessages = [];
      subscriptions.forEach(subscription => {
        subscription.messages.forEach(message => {
          // if message.id is not found in readMessages, push message into unreadMessages arr
          if (!readMessageIds.includes(message.id)) {
            unreadMessages.push(message)
          }
        })
      })
      return dispatch(setMessages(unreadMessages))
    } catch {
      console.log('error in fetchUnreadMessages thunk')
    }
  };
};

export const markAsRead = (msgId) => {
  return () => {
    axios.post(`/api/messages/read/${msgId}`)
      .then(() => fetchUnreadMessages())
      .catch(e => console.log('error in markAsRead thunk: ', e))
  }
}

const initialState = []

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return action.messages;
    default:
      return state;
  }
};