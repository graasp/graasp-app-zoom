import { flag, getApiContext, isErrorResponse, postMessage } from './common';
import {
  FLAG_GETTING_USERS,
  GET_USERS,
  GET_USERS_FAILED,
  GET_USERS_SUCCEEDED, GET_CURRENT_USER_SUCCEEDED, GET_CURRENT_USER_FAILED, GET_CURRENT_USER, FLAG_GETTING_CURRENT_USER,
} from '../types';
import {
  DEFAULT_GET_REQUEST,
  SPACES_ENDPOINT,
  USERS_ENDPOINT,
} from '../config/api';

const flagGettingUsers = flag(FLAG_GETTING_USERS);
const flagGettingCurrentUser = flag(FLAG_GETTING_CURRENT_USER);

const getUsers = async () => async (dispatch, getState) => {
  dispatch(flagGettingUsers(true));
  try {
    const { spaceId, apiHost, offline, standalone } = getApiContext(getState);

    // if standalone, you cannot connect to api
    if (standalone) {
      return false;
    }

    // if offline send message to parent requesting resources
    if (offline) {
      return postMessage({
        type: GET_USERS,
      });
    }

    const url = `//${apiHost + SPACES_ENDPOINT}/${spaceId + USERS_ENDPOINT}`;

    const response = await fetch(url, DEFAULT_GET_REQUEST);

    // throws if it is an error
    await isErrorResponse(response);

    const users = response.json();
    return dispatch({
      type: GET_USERS_SUCCEEDED,
      payload: users,
    });
  } catch (err) {
    return dispatch({
      type: GET_USERS_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagGettingUsers(false));
  }
};

const getCurrentUser = async () => async (dispatch, getState) => {
  dispatch(flagGettingCurrentUser(true));
  try {
    const { offline, standalone, apiHost } = getApiContext(getState);

    // if standalone, you cannot connect to api
    if (standalone) {
      return false;
    }

    // if offline send message to parent requesting resources
    if (offline) {
      return postMessage({
        type: GET_CURRENT_USER,
      });
    }

    const url = `//${apiHost + USERS_ENDPOINT}/current`;

    const response = await fetch(url, DEFAULT_GET_REQUEST);

    // throws if it is an error
    await isErrorResponse(response);

    const user = response.json();
    return dispatch({
      type: GET_CURRENT_USER_SUCCEEDED,
      payload: user,
    });
  } catch (err) {
    return dispatch({
      type: GET_CURRENT_USER_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagGettingCurrentUser(false));
  }
};

export {
  getCurrentUser,
  getUsers,
};
