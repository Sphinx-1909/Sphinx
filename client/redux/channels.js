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

const subscribeToChannel = channel => {
  return {
    type: SUBSCRIBE_TO_CHANNEL,
    channel,
  };
};

const unsubscribeToChannel = channel => {
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
      return { ...state, myChannels: [...state.myChannels, action.channel] };
    default:
      return state;
  }
};
