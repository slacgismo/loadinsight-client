import {
  GET_PIPELINES_STARTED,
  GET_PIPELINES_COMPLETED,
  GET_PIPELINES_FAILED,
  GET_CUSTOM_PIPELINE_STARTED,
  GET_CUSTOM_PIPELINE_COMPLETED,
  GET_CUSTOM_PIPELINE_FAILED,
  ADD_PIPELINE,
} from 'actions';

const DEFAULT_STATE = {
  pipelines: [],
  pipelineNewImport: {},
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
    case GET_CUSTOM_PIPELINE_STARTED:
      return {
        ...DEFAULT_STATE,
        isLoadingCustomPipeline: true,
      };
    case GET_CUSTOM_PIPELINE_COMPLETED:
      return {
        ...DEFAULT_STATE,
        pipelineNewImport: action.payload,
      };
    case GET_CUSTOM_PIPELINE_FAILED:
      return {
        ...DEFAULT_STATE,
        error: action.payload,
      };
    case ADD_PIPELINE:
      return {
        ...DEFAULT_STATE,
        pipelines: [
          ...DEFAULT_STATE.pipelines,
          action.payload,
        ],
      };
    default:
      return state;
  }
};
