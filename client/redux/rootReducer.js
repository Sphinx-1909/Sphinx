import { combineReducers } from 'redux';
// reducer
import { navReducer } from './nav/reducer/nav.reducer';
import { userReducer } from './user/user';

const rootReducer = combineReducers({
  nav: navReducer,
  user: userReducer,
});

export default rootReducer;
