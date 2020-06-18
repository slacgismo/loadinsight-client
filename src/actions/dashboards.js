import {
  GET_DASHBOARDS_COMPLETED,
  GET_DASHBOARDS_FAILED,
  GET_DASHBOARDS_STARTED,
} from 'actions';
import ApiClient from 'util/api-client';

export const getDashboardsStarted = () => ({
  type: GET_DASHBOARDS_STARTED,
});

export const getDashboardsCompleted = (payload) => ({
  type: GET_DASHBOARDS_COMPLETED,
  payload,
});

export const getDashboardsFailed = (error) => ({
  type: GET_DASHBOARDS_FAILED,
  payload: error,
});

export const getDashboards = () => (dispatch) => {
  dispatch(getDashboardsStarted());
  ApiClient.get('/api/holy-cross-load-profile.json')
    .then((res) => {
      dispatch(getDashboardsCompleted(res.data));
    })
    .catch((err) => {
      dispatch(getDashboardsFailed(err));
    });
};
