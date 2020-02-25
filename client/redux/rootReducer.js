import { combineReducers } from 'redux';
// reducer
import { navReducer } from './nav/reducer/nav.reducer';

const rootReducer = combineReducers({
  nav: navReducer,
});

export default rootReducer;
