import {
    GET_PIPELINES_STARTED,
    GET_PIPELINES_COMPLETED,
    GET_PIPELINES_FAILED,
  } from 'actions';
  import ApiClient from 'util/api-client';
  
  export function getPipelinesStarted() {
    return {
      type: GET_PIPELINES_STARTED,
    };
  }
  
  export function getPipelinesCompleted(payload) {
    return {
      type: GET_PIPELINES_COMPLETED,
      payload,
    };
  }
  
  export function getPipelinesFailed(error) {
    return {
      type: GET_PIPELINES_FAILED,
      payload: error,
    };
  }
  
  export function getPipelines() {
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
  