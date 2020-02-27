import axios from 'axios';

const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const LOG_IN_ERROR = 'LOG_IN_ERROR';

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
  console.log('login datapasse', logInData);

  return async (dispatch, getState) => {
    await axios
      .post('/login', logInfo)
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
  return dispatch => {
    axios

      .get('/signout')
      .then(() => {
        dispatch(signOut());
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
  const isLoggedIn = action.isLoggedIn;
  const logInError = action.logInError;
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        isLoggedIn,
      };
    }
    case SIGN_OUT: {
      return {
        ...state,
        isLoggedIn,
      };
    }
    case LOG_IN_ERROR: {
      return {
        ...state,
        logInError,
      };
    }
    default:
      return state;
  }
};

export default authenticationReducer;
