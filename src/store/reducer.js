import { combineReducers } from 'redux';
import statusReducer from './status';
import burgersReducer from './burgers';

export default combineReducers({
  status: statusReducer,
  burgers: burgersReducer,
});
