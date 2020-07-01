import moment from 'moment';
import SortedMap from 'sortedmap';
import { parse } from '@fast-csv/parse';

import {
  GET_DASHBOARDS_COMPLETED,
  GET_DASHBOARDS_FAILED,
  GET_DASHBOARDS_STARTED,
  GET_PGE_LOAD_PROFILE_STARTED,
  GET_PGE_LOAD_PROFILE_COMPLETED,
  GET_PGE_LOAD_PROFILE_FAILED,
  ADD_CHART,
  REMOVE_CHART,
  ADD_DASHBOARD,
  DELETE_DASHBOARD,
  SET_CURRENT_DASHBOARD,
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

export const getPGELoadProfile = (startDate, endDate) => (dispatch) => {
  dispatch(getPGELoadProfileStarted());

  const loadProfile = new SortedMap([], (a, b) => moment(b) - moment(a));

  const PGELoadProfileStream = parse({ headers: true })
    .on('error', (error) => {
      dispatch(getPGELoadProfileFailed(error));
    })
    .on('data', (row) => {
      const date = row[''];
      if (date) {
        row.shift();
        window.localStorage.setItem(`PGE${date}`, JSON.stringify(row));
        loadProfile.set(new Date(date), row);
      }
    })
    .on('end', () => {
      dispatch(getPGELoadProfileCompleted(loadProfile));
    });

  const start = moment(startDate);
  const stop = moment(endDate).subtract(1, 'days');
  const stopFormatted = stop.format('YYYYMMDD');

  for (let date = start; date.isSameOrBefore(stop); date.add(1, 'days')) {
    const localLoadProfile = window.localStorage.getItem(`PGE${date}`);

    if (localLoadProfile) {
      try {
        loadProfile[date] = JSON.parse(localLoadProfile);
        if (date.match(stopFormatted)) {
          dispatch(getPGELoadProfileCompleted(loadProfile));
        }
      } catch (err) {
        dispatch(getPGELoadProfileFailed(err));
      }
    } else {
      ApiClient.get(`/api/pge/${date.format('YYYYMMDD')}.csv`)
        .then((res) => {
          PGELoadProfileStream.write(res.data);
          if (res.config.url.match(stopFormatted)) {
            PGELoadProfileStream.end();
          }
        })
        .catch((err) => {
          dispatch(getPGELoadProfileFailed(err));
        });
    }
  }
};

export const addChart = (name, yAxis = [], xAxis = '') => ({
  type: ADD_CHART,
  payload: {
    name,
    maxY: {
      1: 'auto',
      7: 'auto',
      31: 'auto',
    },
    yUnit: 'kWh',
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
