import axios from 'axios';
import history from '../history';
import { fetchUnreadMessagesV2, fetchUnreadMessages } from './messages';
//action types
const SET_CHANNELS = 'SET_CHANNELS';
const SET_ALL_CHANNELS = 'SET_ALL_CHANNELS';
const SUBSCRIBE_TO_CHANNEL = 'SUBSCRIBE_TO_CHANNEL';
const UNSUBSCRIBE_TO_CHANNEL = 'UNSUBSCRIBE_TO_CHANNEL';
const CREATE_CHANNEL = 'CREATE_CHANNEL';
const EDIT_CHANNEL = 'EDIT CHANNEL';

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

const createdChannel = newChannelInfo => {
  return {
    type: CREATE_CHANNEL,
    newChannelInfo,
  };
};

const editChannel = editedChannelInfo => {
  console.log('!!!!!!!!editedChannelInfo line 48', editedChannelInfo);
  return {
    type: EDIT_CHANNEL,
    editedChannelInfo,
  };
};

//thunks
export const fetchChannels = () => {
  // console.log('in fetchChannels thunk');
  return dispatch => {
    return axios
      .get('/api/channels')
      .then(channels => dispatch(setChannels(channels.data)))
      .catch(e => console.log('Error in thunk:', e));
  };
};

export const fetchAllChannels = () => {
  // console.log('in fetchAllChannels thunk');
  return dispatch => {
    return axios
      .get('/api/channels/all')
      .then(channels => dispatch(setAllChannels(channels.data)))
      .catch(e => console.log('Error in thunk:', e));
  };
};

// Leaving this here for now. Turns out the search refresh does not have to deal with refesh on click to subscribe. TBD
// export const subscribeToChannel = channelId => {
//   return dispatch => {
//     return (
//       axios
//         .post(`/api/channels/subscribe/${channelId}`)
//         // this is kinda hacky as it is refetching the channels for the user rather than adding it to the store. Only doing this now because the post to that api route will return a channelUser object rather than a channel object. Will fix later once we get everything working
//         // This is also currently causing the searched list to refresh on click of the button to subscribe
//         .then(() => dispatch(fetchChannels()))
//         .catch(e => console.log('Error in thunk at post:', e))
//     );
//   };
// };

// This is an actual thunk that will just chnage the state rather than fetching everything again.
export const subscribeToChannel = channelId => {
  return dispatch => {
    return axios
      .post(`/api/channels/subscribe/${channelId}`)
      .then(() => {
        axios.get(`/api/channels/${channelId}`).then(channelObj => {
          dispatch(subToChannel(channelObj.data));
          dispatch(fetchUnreadMessages());
        });
      })
      .catch(e => console.log('Error in thunk at post:', e));
  };
};
//not assigning new channel to myChannels for creator
export const createChannelThunk = newChannelInfo => {
  return async dispatch => {
    try {
      const theNewChannel = (await axios.post(`/api/channels`, newChannelInfo))
        .data;
      dispatch(createdChannel(theNewChannel));
    } catch (e) {
      console.log('error in thunk:', e);
    }
  };
};

// Leaving this here for now
// export const unsubscribeToChannel = channelId => {
//   return dispatch => {
//     return (
//       axios
//         .delete(`/api/channels/unsubscribe/${channelId}`)
//         // will need to post user and channel ids along with if mod or
//         .then(() => dispatch(fetchChannels()))
//         .catch(e => console.log('Error in thunk:', e))
//     );
//   };
// };

// This is a working thunk to actually modify state so it refreshes on its own.
export const unsubscribeToChannel = channelId => {
  return dispatch => {
    return axios
      .get(`/api/channels/${channelId}`)
      .then(channelObj => {
        axios.delete(`/api/channels/unsubscribe/${channelId}`);
        dispatch(unsubToChannel(channelObj.data));
        dispatch(fetchUnreadMessages());
      })
      .catch(e => console.log('Error in thunk:', e));
  };
};

export const editChannelThunk = channelEdits => {
  console.log('edits line 143 channels.js', channelEdits);
  return async dispatch => {
    try {
      const editedChannel = (
        await axios.put(`/api/channels/${channelEdits.id}`, channelEdits)
      ).data;
      console.log('edited channel info', editedChannel);
      dispatch(editChannel(editedChannel));
      history.push('/');
    } catch (e) {
      console.log('error in edit channel', e);
    }
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
          channel => channel.id !== action.channel.id
        ),
      };
    case CREATE_CHANNEL:
      return {
        allChannels: [...state.allChannels, action.newChannelInfo],
        myChannels: [...state.myChannels, action.newChannelInfo],
      };
    case EDIT_CHANNEL: {
      let updatedAllChannels = state.allChannels.map(channel => {
        console.log('action.editedChannelInfo.id', action.editedChannelInfo.id);
        if (channel.id === action.editedChannelInfo.id)
          return [...channel, action.editedChannelInfo];
        return channel;
      });
      let updatedMyChannels = state.myChannels.map(channel => {
        if (channel.id === action.editedChannelInfo.id) {
          console.log('action.editedChannelInfo', action.editedChannelInfo);
          return [...channel, action.editedChannelInfo];
        }

        return channel;
      });
      console.log('updatedAllChannels', updatedAllChannels);
      console.log('updatedMyChannels', updatedMyChannels);
      return {
        allChannels: updatedAllChannels,
        myChannels: updatedMyChannels,
      };
    }

    default:
      return state;
  }
};
