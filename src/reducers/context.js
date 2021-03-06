import {
  GET_CONTEXT_FAILED,
  GET_CONTEXT_SUCCEEDED,
  GET_CURRENT_USER_FAILED,
  GET_CURRENT_USER_SUCCEEDED,
} from '../types';
import {
  DEFAULT_API_HOST,
  DEFAULT_LANG,
  DEFAULT_MODE,
} from '../config/settings';
import { showErrorToast } from '../utils/toasts';
import { DEFAULT_VIEW } from '../config/views';

const INITIAL_STATE = {
  apiHost: DEFAULT_API_HOST,
  // the properties below come from the context via the query string
  lang: DEFAULT_LANG,
  mode: DEFAULT_MODE,
  view: DEFAULT_VIEW,
  appInstanceId: null,
  spaceId: null,
  subSpaceId: null,
  userId: null,
  offline: false,
  standalone: false,
  dev: false,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_CONTEXT_SUCCEEDED:
      return {
        ...state,
        ...payload,
      };

    case GET_CURRENT_USER_SUCCEEDED:
      return {
        ...state,
        user: payload,
      };

    case GET_CURRENT_USER_FAILED:
    case GET_CONTEXT_FAILED:
      // show error to user
      showErrorToast(payload);
      return state;

    default:
      return state;
  }
};
