import axios from 'axios';
import { SIGN_IN, SIGN_OUT } from '../authentication/authentication';
import history from '../../history';
const EDIT_USER = 'EDIT_USER';
export const SIGN_UP = 'SIGN_UP';

// inital state
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  userName: '',
};

// action creators
const editActiveUser = editedUser => {
  console.log('editedUser in action creator', editedUser);
  return {
    type: EDIT_USER,
    editedUser,
  };
};

export const signUp = createdUser => {
  return {
    type: SIGN_UP,
    createdUser,
  };
};

// thunks

export const createUserAndLogIn = newUserData => {
  console.log('newUserData inside ActiveUser', newUserData);
  return async dispatch => {
    try {
      const createdUser = (await axios.post(`/api/signup`, newUserData)).data;

      console.log('create user thunk response data: ', createdUser);
      dispatch(signUp(createdUser));
    } catch (e) {
      console.log('Error in thunk:', e);
    }
  };
};

export const modifyUser = edits => {
  console.log('edits inside ActiveUser', edits);
  return async (dispatch, getState) => {
    try {
      const user = getState().activeUser;
      console.log(' const user = getState().activeUser', user);

      const editedUser = (await axios.put(`/api/users/${user.id}`, edits)).data;
      console.log('edited user to post', editedUser);
      dispatch(editActiveUser(editedUser));
      // redirect to wherevs
      history.push('/user');
    } catch (e) {
      console.log('error in edit user', e);
    }
  };
};

const activeUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.activeUser;
    case EDIT_USER:
      return action.editedUser;
    case SIGN_OUT:
      return initialState;
    case SIGN_UP:
      return action.createdUser;
    default:
      return state;
  }
};

export default activeUserReducer;
