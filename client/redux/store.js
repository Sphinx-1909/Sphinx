import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
//import Root Reducer
import rootReducer from './rootReducer';

let middleWare = [thunk, createLogger({ collapsed: true })];

const Store = createStore(rootReducer, applyMiddleware(...middleWare));

export default Store;
