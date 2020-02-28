import { combineReducers } from 'redux';
// reducer
import { navReducer } from './nav/reducer/nav.reducer';
import { usersReducer } from './users/users';
import oneUserReducer from './oneUser/oneUser';
import authenticationReducer from './authentication/authentication';
import activeUserReducer from './activeUser/activeUser';

const rootReducer = combineReducers({
  nav: navReducer,
  users: usersReducer,
  authentication: authenticationReducer,
  activeUser: activeUserReducer,
  oneUser: oneUserReducer,
});

export default rootReducer;
