import { combineReducers } from 'redux';
// reducer
import { navReducer } from './nav/reducer/nav.reducer';
import { channelsReducer } from './channels'
import { messagesReducer } from './messages'
import oneUserReducer from './oneUser/oneUser';
import authenticationReducer from './authentication/authentication';
import activeUserReducer from './activeUser/activeUser';
import { usersReducer } from './users/users';

const rootReducer = combineReducers({
  nav: navReducer,
  authentication: authenticationReducer,
  activeUser: activeUserReducer,
  oneUser: oneUserReducer,
  channels: channelsReducer,
  unreadMessages: messagesReducer,
  users: usersReducer,
});

export default rootReducer;
