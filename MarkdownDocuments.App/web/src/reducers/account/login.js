import { combineReducers } from "redux";

export function error(state = null, action) {
  switch (action.type) {
    case 'ACCOUNT_LOGIN_ERROR':
      return action.error;

    default:
      return state;
  }
}

export function loading(state = false, action) {
  switch (action.type) {
    case 'ACCOUNT_LOGIN_LOADING':
      return action.loading;

    default:
      return state;
  }
}

export function loggedIn(state = null, action) {
  switch (action.type) {
    case 'ACCOUNT_LOGIN_SUCCESS':
      return action.loggedIn;

    default:
      return state;
  }
}

export default combineReducers({error, loading, loggedIn});