import {
  GET_REPOSITORIES_STARTED,
  GET_REPOSITORIES_COMPLETED,
  GET_REPOSITORIES_FAILED,
} from 'actions';
import ApiClient from 'util/api-client';

export const getRepositoriesStarted = () => ({
  type: GET_REPOSITORIES_STARTED,
});

export const getRepositoriesCompleted = (payload) => ({
  type: GET_REPOSITORIES_COMPLETED,
  payload,
});

export const getRepositoriesFailed = (error) => ({
  type: GET_REPOSITORIES_FAILED,
  payload: error,
});

export const getRepositories = () => (dispatch) => {
  dispatch(getRepositoriesStarted());
  ApiClient.get('/api/repositories.json')
    .then((res) => {
      dispatch(getRepositoriesCompleted(res.data));
    })
    .catch((err) => {
      dispatch(getRepositoriesFailed(err));
    });
};
