import {
  LOGIN_USER_STARTED,
  LOGIN_USER_COMPLETED,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
} from 'actions';
import user from 'mock-data/user-profile';
import { isDevelopment } from 'config';

export function loginUserStarted() {
  return {
    type: LOGIN_USER_STARTED,
    payload: user,
  };
}

export function loginUserCompleted(payload) {
  return {
    type: LOGIN_USER_COMPLETED,
    payload,
  };
}

export function loginUserFailed(error) {
  return {
    type: LOGIN_USER_FAILED,
    payload: error,
  };
}

export function loginUser(email, password) {
  return (dispatch) => {
    dispatch(loginUserStarted());
    if (isDevelopment() || (email === user.email && password === user.password)) {
      dispatch(loginUserCompleted(user));
    } else {
      const err = Error('Incorrect email and password');
      dispatch(loginUserFailed(err));
    }
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
