import axios from 'axios';
import history from '../history';
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
  console.log('editedChannelInfo line 48', editedChannelInfo);
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
        axios
          .get(`/api/channels/${channelId}`)
          .then(channelObj => dispatch(subToChannel(channelObj.data)));
      })
      .catch(e => console.log('Error in thunk at post:', e));
  };
};

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
        return dispatch(unsubToChannel(channelObj.data));
      })
      .catch(e => console.log('Error in thunk:', e));
  };
};

export const editChannelThunk = channelEdits => {
  return async dispatch => {
    try {
      const editedChannel = (
        await axios.put(`/api/channels/${channelEdits.channelId}`, channelEdits)
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
      const myUpdated_Channels = state.myChannels.map(myChannel => {
        console.log('myChannel', myChannel);

        if (myChannel.id !== action.editedChannelInfo.id) {
          return myChannel;
        } else {
          return {
            ...myChannel,
            ...action.editedChannelInfo,
          };
        }
      });
      const allUpdated_Channels = state.allChannels.map(channel => {
        console.log('channel', channel);

        if (channel.id !== action.editedChannelInfo.id) {
          return channel;
        } else {
          return {
            ...channel,
            ...action.editedChannelInfo,
          };
        }
      });
      console.log('allUpdated_Channels', allUpdated_Channels);
      console.log('myUpdated_Channels', myUpdated_Channels);

      return {
        allChannels: [...state.allChannels, action.allUpdated_Channels],
        myChannels: [...state.myChannels, action.myUpdated_Channels],
      };
    }
    default:
      return state;
  }
};
