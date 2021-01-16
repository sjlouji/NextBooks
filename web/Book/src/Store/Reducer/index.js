import { combineReducers } from 'redux';
import auth from './auth';
import account from './account';
import transcation from './transcation';

export default combineReducers({
  auth,
  account,
  transcation
});