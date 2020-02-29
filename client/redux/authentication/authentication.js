import axios from 'axios';

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';

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
    await axios
      .post('/login', logInData)
      .then(res => {
        return dispatch(signIn(res.data));
      })
      .catch(e => {
        console.log(e);
        dispatch(setLogInError());
        return dispatch(signOut());
      });
  };
};
export const logOutAttempt = () => {
  console.log('logging out');
  return dispatch => {
    axios

      .get('/signout')
      .then(() => {
        return dispatch(signOut());
      })

      .catch(e => {
        console.error(e);
        return dispatch(signOut());
      });
  };
};
export const initialLogInAttempt = () => {
  console.log('!!!initial');
  return dispatch => {
    return axios
      .get('/me')
      .then(res => {
        const user = res.data;
        //console.log('!!!!!user', user);
        return dispatch(signIn(user));
      })
      .catch(e => {
        console.error(e);
        return dispatch(signOut());
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
