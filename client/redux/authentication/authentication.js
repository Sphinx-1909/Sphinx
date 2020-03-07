import axios from 'axios';
import { fetchAllChannels, fetchChannels } from '../channels';
import { fetchUnreadMessages } from '../messages';
import history from '../../history';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const SIGN_UP = 'SIGN_UP';

export const signIn = data => {
  return {
    type: SIGN_IN,
    isLoggedIn: true,
    activeUser: data,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
    isLoggedIn: false,
  };
};
export const setLogInError = () => {
  return {
    type: LOG_IN_ERROR,
    logInError: true,
  };
};

export const removeLogInError = () => {
  return {
    type: LOG_IN_ERROR,
    logInError: false,
  };
};

export const logInAttempt = logInData => {
  //console.log('login datapassed in', logInData);

  return async dispatch => {
    try {
      const res = await axios.post('/login', logInData);

      dispatch(signIn(res.data));
      dispatch(fetchChannels(res.id));
      dispatch(fetchAllChannels());
      dispatch(fetchUnreadMessages());
      history.push('/');

    } catch (e) {
      console.log('error in logInAttempt thunK: ', e);
      dispatch(setLogInError());
    }
    // axios
    //   .post('/login', logInData)
    //   .then(res => {
    //     dispatch(signIn(res.data))
    //       .then(() => {
    //         dispatch(fetchChannels());
    //         dispatch(fetchAllChannels());
    //         dispatch(fetchUnreadMessages())
    //       })
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     dispatch(setLogInError());
    //     return dispatch(signOut());
    //   });
  };
};
export const logOutAttempt = () => {
  console.log('the logout thunk is firing!!!!!!!!!!!');
  return dispatch => {
    axios

      .get('/signout')
      .then(() => {
        return dispatch(signOut());
      })

      .catch(e => {
        console.error(e);
        // return dispatch(signOut());
      });
  };
};
export const initialLogInAttempt = () => {
  return dispatch => {
    return axios
      .get('/me')
      .then(res => {
        const user = res.data;
        dispatch(signIn(user));
        dispatch(fetchChannels(user.id));
        dispatch(fetchAllChannels());
        dispatch(fetchUnreadMessages());
      })
      .catch(e => {
        console.error(e);
        // return dispatch(signOut());
      });
  };
};

const initialState = {
  isLoggedIn: false,
  logInError: false,
};

const authenticationReducer = (state = initialState, action) => {
  //const isLoggedIn = action.isLoggedIn;
  // const logInError = action.logInError;
  // console.log('reducer state/action', state, action);
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    }
    case LOG_IN_ERROR: {
      return {
        ...state,
        logInError: action.logInError,
      };
    }
    default:
      return state;
  }
};

export default authenticationReducer;
