import moment from 'moment';
import SortedMap from 'sortedmap';
import { parse } from '@fast-csv/parse';

import {
  GET_DASHBOARDS_COMPLETED,
  GET_DASHBOARDS_FAILED,
  GET_DASHBOARDS_STARTED,
  SET_PGE_LOAD_PROFILE,
  GET_PGE_LOAD_PROFILE_STARTED,
  GET_PGE_LOAD_PROFILE_COMPLETED,
  GET_PGE_LOAD_PROFILE_FAILED,
  ADD_CHART,
  REMOVE_CHART,
  ADD_DASHBOARD,
  DELETE_DASHBOARD,
  SET_CURRENT_DASHBOARD,
  SET_DATE_TIME_FILTER_VALUE,
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

export const setPGELoadProfile = (dateStringKey, payload) => ({
  type: SET_PGE_LOAD_PROFILE,
  payload,
  dateStringKey,
});

export const getPGELoadProfileStarted = () => ({
  type: GET_PGE_LOAD_PROFILE_STARTED,
});

export const getPGELoadProfileCompleted = (payload, addChartModalVisible) => ({
  type: GET_PGE_LOAD_PROFILE_COMPLETED,
  payload,
  addChartModalVisible,
});

export const getPGELoadProfileFailed = (error, dateStringKey) => ({
  type: GET_PGE_LOAD_PROFILE_FAILED,
  payload: error,
  dateStringKey,
});

export const getPGELoadProfile = (
  startDate, endDate, addChartModalVisible,
) => (dispatch) => {
  const loadProfile = new Map();

  const PGELoadProfileStream = parse({ headers: true })
    .on('error', (err) => {
      dispatch(getPGELoadProfileFailed(err));
    })
    .on('data', (row) => {
      const data = { ...row };
      const date = data[''];
      if (date) {
        delete data[''];
        loadProfile.set(date, data);
      }
    })
    .on('end', () => {
      dispatch(getPGELoadProfileCompleted(loadProfile, addChartModalVisible));
    });

  const start = moment(startDate);
  const stop = moment(endDate);

  const loadProfileCsvs = new SortedMap([], (a, b) => a - b);

  let waitingOnAPI = false;

  for (let date = stop; date.isSameOrAfter(start); date.subtract(1, 'days')) {
    const dateStringKey = `PGE${date.format('YYYYMMDD')}`;

    const localLoadProfile = window.localStorage.getItem(dateStringKey);

    if (localLoadProfile !== null && !localLoadProfile.match(/</)) {
      loadProfileCsvs.set(date.toDate(), localLoadProfile);
    } else if (date.year() >= 2020) { // PGE data in public folder is 2020 onward
      dispatch(getPGELoadProfileStarted());
      waitingOnAPI = true;
      ApiClient.get(`/api/pge/${date.format('YYYYMMDD')}.csv`)
        .then((res) => {
          dispatch(setPGELoadProfile(dateStringKey, res.data));
        })
        .catch((err) => {
          dispatch(getPGELoadProfileFailed(err, dateStringKey));
        });
    }
  }

  if (loadProfileCsvs.size) {
    loadProfileCsvs.forEach((data) => {
      PGELoadProfileStream.write(data);
    });

    if (!waitingOnAPI) {
      PGELoadProfileStream.end();
    }
  }
};

export const addChart = (name, yAxis = [], xAxis = '') => ({
  type: ADD_CHART,
  payload: {
    name,
    xAxis,
    yAxis,
  },
});

export const removeChart = (payload) => ({
  type: REMOVE_CHART,
  payload,
});

export const addDashboard = (dashboardName) => ({
  type: ADD_DASHBOARD,
  payload: {
    name: dashboardName,
    charts: [],
  },
});

export const deleteDashboard = (payload) => ({
  type: DELETE_DASHBOARD,
  payload,
});

export const setCurrentDashboard = (payload) => ({
  type: SET_CURRENT_DASHBOARD,
  payload,
});

export const setDateTimeFilterValue = (payload) => ({
  type: SET_DATE_TIME_FILTER_VALUE,
  payload,
});
