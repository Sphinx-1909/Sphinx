import { combineReducers } from 'redux';
// reducer
import { navReducer } from './nav/reducer/nav.reducer';
import { userReducer } from './user/user';
import { authenticationReducer } from './authentication/authentication';

const rootReducer = combineReducers({
  nav: navReducer,
  user: userReducer,
  authenticaion: authenticationReducer,
});

export default rootReducer;
