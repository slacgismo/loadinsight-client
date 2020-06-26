import {
  GET_PIPELINES_STARTED,
  GET_PIPELINES_COMPLETED,
  GET_PIPELINES_FAILED,
  GET_CUSTOM_PIPELINE_STARTED,
  GET_CUSTOM_PIPELINE_COMPLETED,
  GET_CUSTOM_PIPELINE_FAILED,
  ADD_PIPELINE,
  DELETE_PIPELINE,
} from 'actions';
import ApiClient from 'util/api-client';

export const getPipelinesStarted = () => ({
  type: GET_PIPELINES_STARTED,
});

export const getPipelinesCompleted = (payload) => ({
  type: GET_PIPELINES_COMPLETED,
  payload,
});

export const getPipelinesFailed = (error) => ({
  type: GET_PIPELINES_FAILED,
  payload: error,
});

export const getPipelines = () => (dispatch) => {
  dispatch(getPipelinesStarted());
  ApiClient.get('/api/pipelines.json')
    .then((res) => {
      dispatch(getPipelinesCompleted(res.data));
    })
    .catch((err) => {
      dispatch(getPipelinesFailed(err));
    });
};

export const getCustomPipelineStarted = () => ({
  type: GET_CUSTOM_PIPELINE_STARTED,
});

export const getCustomPipelineCompleted = (payload) => ({
  type: GET_CUSTOM_PIPELINE_COMPLETED,
  payload,
});

export const getCustomPipelineFailed = (error) => ({
  type: GET_CUSTOM_PIPELINE_FAILED,
  payload: error,
});

export const getCustomPipeline = () => (dispatch) => {
  dispatch(getCustomPipelineStarted());
  ApiClient.get('/api/pge-pipeline.json')
    .then((res) => {
      dispatch(getCustomPipelineCompleted(res.data));
    })
    .catch((err) => {
      dispatch(getCustomPipelineFailed(err));
    });
};

export const addPipeline = (payload) => ({
  type: ADD_PIPELINE,
  payload,
});

export const deletePipeline = (payload) => ({
  type: DELETE_PIPELINE,
  payload,
});
