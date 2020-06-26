import {
  GET_REPOSITORIES_STARTED,
  GET_REPOSITORIES_COMPLETED,
  GET_REPOSITORIES_FAILED,
} from 'actions';

const DEFAULT_STATE = {
  repositories: [],
  isLoadingRepositories: false,
  error: null,
};

export default (state = DEFAULT_STATE, action) => {
  if (action.error) return state;

  switch (action.type) {
    case GET_REPOSITORIES_STARTED:
      return {
        ...DEFAULT_STATE,
        isLoadingRepositories: true,
      };
    case GET_REPOSITORIES_COMPLETED:
      return {
        ...DEFAULT_STATE,
        repositories: action.payload,
      };
    case GET_REPOSITORIES_FAILED:
      return {
        ...DEFAULT_STATE,
        error: action.payload,
      };
    default:
      return state;
  }
};
