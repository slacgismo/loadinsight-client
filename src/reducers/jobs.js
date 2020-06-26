import {
  GET_JOBS_STARTED,
  GET_JOBS_COMPLETED,
  GET_JOBS_FAILED,
} from 'actions';

const DEFAULT_STATE = {
  jobs: [],
  isLoadingJobs: false,
  error: null,
};

export default (state = DEFAULT_STATE, action) => {
  if (action.error) return state;

  switch (action.type) {
    case GET_JOBS_STARTED:
      return {
        ...state,
        isLoadingJobs: true,
        error: null,
      };
    case GET_JOBS_COMPLETED: {
      return {
        ...state,
        jobs: action.payload,
        isLoadingJobs: false,
        error: null,
      };
    }
    case GET_JOBS_FAILED:
      return {
        ...state,
        isLoadingJobs: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
