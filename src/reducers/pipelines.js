import {
  GET_PIPELINES_STARTED,
  GET_PIPELINES_COMPLETED,
  GET_PIPELINES_FAILED,
  GET_CUSTOM_PIPELINE_STARTED,
  GET_CUSTOM_PIPELINE_COMPLETED,
  GET_CUSTOM_PIPELINE_FAILED,
  ADD_PIPELINE,
} from 'actions';
import { USER_KEY } from 'util/auth';

const DEFAULT_STATE = {
  pipelines: [],
  pipelineNewImport: {},
  isLoadingPipelines: false,
  isLoadingCustomPipeline: false,
  error: null,
};

export default (state = DEFAULT_STATE, action) => {
  if (action.error) return state;

  const localPipelines = [
    ...state.pipelines,
    {
      ...action.payload,
      last_updated: 'a few seconds ago',
    },
  ];

  switch (action.type) {
    case GET_PIPELINES_STARTED:
      return {
        ...state,
        isLoadingPipelines: true,
        error: null,
      };
    case GET_PIPELINES_COMPLETED:
      return {
        ...state,
        pipelines: action.payload,
        isLoadingPipelines: false,
        error: null,
      };
    case GET_PIPELINES_FAILED:
      return {
        ...state,
        isLoadingPipelines: false,
        error: action.payload,
      };
    case GET_CUSTOM_PIPELINE_STARTED:
      return {
        ...state,
        isLoadingCustomPipeline: true,
      };
    case GET_CUSTOM_PIPELINE_COMPLETED:
      return {
        ...state,
        isLoadingCustomPipeline: false,
        pipelineNewImport: action.payload,
      };
    case GET_CUSTOM_PIPELINE_FAILED:
      return {
        ...state,
        isLoadingCustomPipeline: false,
        error: action.payload,
      };
    case ADD_PIPELINE:
      window.localStorage.setItem(`${USER_KEY}Pipelines`, JSON.stringify(localPipelines));
      return {
        ...state,
        pipelines: localPipelines,
      };
    default:
      return state;
  }
};
