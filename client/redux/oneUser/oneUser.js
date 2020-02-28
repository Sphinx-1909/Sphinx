import axios from 'axios';
// action types
const GET_ONE_USER = 'GET_ONE_USER';

// action creators
const getOneUser = user => {
  return {
    type: GET_ONE_USER,
    user,
  };
};

//thunks
export const fetchOnelUser = id => {
  return dispatch => {
    return axios
      .get(`/api/users/${id}`)
      .then(response => dispatch(getOneUser(response.data)))
      .catch(e => console.log('Error in thunk:', e.message));
  };
};

const initialState = {};

const oneUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ONE_USER:
      return action.user;
    default:
      return state;
  }
};

export default oneUserReducer;
