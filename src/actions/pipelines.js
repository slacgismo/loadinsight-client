import {
  GET_PIPELINES_STARTED,
  GET_PIPELINES_COMPLETED,
  GET_PIPELINES_FAILED,
} from 'actions';
import ApiClient from 'util/api-client';

export const getPipelinesStarted = () => {
  return {
    type: GET_PIPELINES_STARTED,
  };
}

export const getPipelinesCompleted = (payload) => {
  return {
    type: GET_PIPELINES_COMPLETED,
    payload,
  };
}

export const getPipelinesFailed = (error) => {
  return {
    type: GET_PIPELINES_FAILED,
    payload: error,
  };
}

export const getPipelines = () => {
  return (dispatch) => {
    dispatch(getPipelinesStarted());
    ApiClient.get('/api/pipelines.json')
      .then((res) => {
        dispatch(getPipelinesCompleted(res.data));
      })
      .catch((err) => {
        dispatch(getPipelinesFailed(err));
      });
  };
}
