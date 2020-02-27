import axios from 'axios';
//action types
const SET_CHANNELS = 'SET_CHANNELS';

//action creators
const setChannels = channels => {
  return {
    type: SET_CHANNELS,
    channels,
  };
};

//thunks
export const fetchChannels = () => {
  return dispatch => {
    return axios.get('/api/channels')
      .then(channels => dispatch(setChannels(channels.data)))
      .catch(e => console.log('Error in thunk:', e));
  };
};

const initialState = []

export const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHANNELS:
      return action.channels;
    default:
      return state;
  }
};
