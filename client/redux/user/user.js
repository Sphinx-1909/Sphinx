import axios from 'axios';
//action types
const SET_USER = 'SET_ALLUSER';
const ADD_USER = 'ADD_USER';

//action creators
const setUser = user => {
  return {
    type: SET_USER,
    user,
  };
};
const addUser = user => {
  return {
    type: ADD_USER,
    user,
  };
};

//thunks
export const fetchUser = () => {
  return dispatch => {
    return axios
      .get('/me')
      .then(response => dispatch(setUser(response.data)))
      .catch(e => console.log('Error in thunk:', e));
  };
};

export const createUser = user => {
  return dispatch => {
    return axios
      .post('/api/user', user)
      .then(response => {
        console.log('create user thunk response data: ', response.data);
        dispatch(addUser(response.data));
      })
      .catch(e => console.log('Error in thunk:', e));
  };
};

export const updateUser = (userId, user) => {
  return dispatch => {
    return axios
      .put(`/api/user/${userId}`, user)
      .then(response => {
        console.log(response);
        return axios
          .get('/api/user/')
          .then(response => dispatch(fetchUser(response.data)));
      })
      .catch(e => console.log('Error in thunk:', e.message));
  };
};

const initialState = [];

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.users;
    case ADD_USER:
      return [...state, action.user];

    default:
      return state;
  }
};

export default userReducer;
