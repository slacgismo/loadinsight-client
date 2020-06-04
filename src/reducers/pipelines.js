import {
  GET_PIPELINES_STARTED,
  GET_PIPELINES_COMPLETED,
  GET_PIPELINES_FAILED,
} from 'actions';

const DEFAULT_STATE = {
  pipelines: [],
  isLoadingPipelines: false,
  error: null,
};

export default (state = DEFAULT_STATE, action) => {
  if (action.error) return state;

  switch (action.type) {
    case GET_PIPELINES_STARTED:
      return {
        ...DEFAULT_STATE,
        isLoadingPipelines: true,
      };
    case GET_PIPELINES_COMPLETED:
      return {
        ...DEFAULT_STATE,
        pipelines: action.payload,
      };
    case GET_PIPELINES_FAILED:
      return {
        ...DEFAULT_STATE,
        error: action.payload,
      };
    default:
      return state;
  }
};
