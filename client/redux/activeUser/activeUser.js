import axios from 'axios';
import { SIGN_IN, SIGN_OUT } from '../authentication/authentication';
import history from '../../history';
const EDIT_USER = 'EDIT_USER';

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

// thunks

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
  const activeUser = action.activeUser;
  const editedUser = action.editedUser;
  switch (action.type) {
    case SIGN_IN:
      return activeUser;
    case EDIT_USER:
      return editedUser;
    case SIGN_OUT:
      return initialState;
    default:
      return state;
  }
};

export default activeUserReducer;
