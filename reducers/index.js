import { combineReducers } from 'redux';
import User from './user';
import Error from './error';
import Success from './success';
import Loading from './loading';
import Appointment from './appointment';

export default combineReducers({
  User,
  Error,
  Success,
  Loading,
  Appointment,
});
