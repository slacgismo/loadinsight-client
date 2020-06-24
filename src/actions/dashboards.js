import {
  GET_DASHBOARDS_COMPLETED,
  GET_DASHBOARDS_FAILED,
  GET_DASHBOARDS_STARTED,
  GET_PGE_LOAD_PROFILE_STARTED,
  GET_PGE_LOAD_PROFILE_COMPLETED,
  GET_PGE_LOAD_PROFILE_FAILED,
  ADD_CHART,
  REMOVE_CHART,
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
  ApiClient.get('/api/dashboards.json')
    .then((res) => {
      dispatch(getDashboardsCompleted(res.data));
    })
    .catch((err) => {
      dispatch(getDashboardsFailed(err));
    });
};

export const getPGELoadProfileStarted = () => ({
  type: GET_PGE_LOAD_PROFILE_STARTED,
});

export const getPGELoadProfileCompleted = (payload) => ({
  type: GET_PGE_LOAD_PROFILE_COMPLETED,
  payload,
});

export const getPGELoadProfileFailed = (error) => ({
  type: GET_PGE_LOAD_PROFILE_FAILED,
  payload: error,
});

export const getPGELoadProfile = () => (dispatch) => {
  dispatch(getPGELoadProfileStarted());
  ApiClient.get('/api/pge-load-profile.json')
    .then((res) => {
      dispatch(getPGELoadProfileCompleted(res.data));
    })
    .catch((err) => {
      dispatch(getPGELoadProfileFailed(err));
    });
};

export const addChart = (name, datasets) => ({
  type: ADD_CHART,
  payload: {
    name,
    maxY: {
      1: 'auto',
      7: 'auto',
      31: 'auto',
    },
    yUnit: 'kWh',
    datasets,
  },
});

export const removeChart = (payload) => ({
  type: REMOVE_CHART,
  payload,
});
