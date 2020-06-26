import {
  GET_JOBS_COMPLETED,
  GET_JOBS_FAILED,
  GET_JOBS_STARTED,
} from 'actions';
import ApiClient from 'util/api-client';

export const getJobsStarted = () => ({
  type: GET_JOBS_STARTED,
});

export const getJobsCompleted = (payload) => ({
  type: GET_JOBS_COMPLETED,
  payload,
});

export const getJobsFailed = (error) => ({
  type: GET_JOBS_FAILED,
  payload: error,
});

export const getJobs = () => (dispatch) => {
  dispatch(getJobsStarted());
  ApiClient.get('/api/jobs.json')
    .then((res) => {
      dispatch(getJobsCompleted(res.data));
    })
    .catch((err) => {
      dispatch(getJobsFailed(err));
    });
};
