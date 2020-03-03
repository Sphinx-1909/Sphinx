import axios from 'axios';
//action types
const SET_CHANNELS = 'SET_CHANNELS';
const SET_ALL_CHANNELS = 'SET_ALL_CHANNELS';
const SUBSCRIBE_TO_CHANNEL = 'SUBSCRIBE_TO_CHANNEL';
const UNSUBSCRIBE_TO_CHANNEL = 'UNSUBSCRIBE_TO_CHANNEL';

//action creators
const setChannels = channels => {
  return {
    type: SET_CHANNELS,
    channels,
  };
};

const setAllChannels = channels => {
  return {
    type: SET_ALL_CHANNELS,
    channels,
  };
};

const subToChannel = channel => {
  return {
    type: SUBSCRIBE_TO_CHANNEL,
    channel,
  };
};

const unsubToChannel = channel => {
  return {
    type: UNSUBSCRIBE_TO_CHANNEL,
    channel,
  };
};

//thunks
export const fetchChannels = () => {
  return dispatch => {
    return axios
      .get('/api/channels')
      .then(channels => dispatch(setChannels(channels.data)))
      .catch(e => console.log('Error in thunk:', e));
  };
};

export const fetchAllChannels = () => {
  return dispatch => {
    return axios
      .get('/api/channels/all')
      .then(channels => dispatch(setAllChannels(channels.data)))
      .catch(e => console.log('Error in thunk:', e));
  };
};

export const subscribeToChannel = channelId => {
  return dispatch => {
    return (
      axios
        .post(`/api/channels/subscribe/${channelId}`)
        // this is kinda hacky as it is refetching the channels for the user rather than adding it to the store. Only doing this now because the post to that api route will return a channelUser object rather than a channel object. Will fix later once we get everything working
        // This is also currently causing the searched list to refresh on click of the button to subscribe
        .then(() => dispatch(fetchChannels()))
        .catch(e => console.log('Error in thunk at post:', e))
    );
  };
};

export const unsubscribeToChannel = channelId => {
  return dispatch => {
    return (
      axios
        .delete(`/api/channels/unsubscribe/${channelId}`)
        // will need to post user and channel ids along with if mod or
        .then(() => dispatch(fetchChannels()))
        .catch(e => console.log('Error in thunk:', e))
    );
  };
};

const initialState = { myChannels: [], allChannels: [] };

export const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      return { ...state, myChannels: action.channels };
    case SET_ALL_CHANNELS:
      return { ...state, allChannels: action.channels };
    case SUBSCRIBE_TO_CHANNEL:
      return { ...state, myChannels: [...state.myChannels, action.channel] };
    case UNSUBSCRIBE_TO_CHANNEL:
      return {
        ...state,
        myChannels: state.myChannels.filter(
          channel => channel.id !== action.channel.channelId
        ),
      };
    default:
      return state;
  }
};
