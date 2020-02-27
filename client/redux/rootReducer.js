import { combineReducers } from 'redux';
// reducer
import { navReducer } from './nav/reducer/nav.reducer';
import { userReducer } from './user/user';
import { channelsReducer } from './channels'

const rootReducer = combineReducers({
  nav: navReducer,
  user: userReducer,
  channels: channelsReducer,
});

export default rootReducer;
