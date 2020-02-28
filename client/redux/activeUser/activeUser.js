import axios from 'axios';
import { SIGN_IN, SIGN_OUT } from '../authentication/authentication';

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
  return {
    type: EDIT_USER,
    editedUser,
  };
};

// thunks

export const modifyUser = edits => {
  return async (dispatch, getState) => {
    const user = getState().activeUser;
    let editedUser = {};
    if (getState().authentication.isLoggedIn) {
      editedUser = (await axios.put(`/users/${user.id}`, edits)).data;
    } else {
      editedUser = {
        ...user,
        ...edits,
      };
      console.log('edited guest user in Modify User thunk:', editedUser);
    }

    return dispatch(editActiveUser(editedUser));
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
