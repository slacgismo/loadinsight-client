import {
  GET_DASHBOARDS_STARTED,
  GET_DASHBOARDS_COMPLETED,
  GET_DASHBOARDS_FAILED,
  GET_PGE_LOAD_PROFILE_STARTED,
  GET_PGE_LOAD_PROFILE_COMPLETED,
  GET_PGE_LOAD_PROFILE_FAILED,
  ADD_CHART,
  REMOVE_CHART,
  ADD_DASHBOARD,
  DELETE_DASHBOARD,
  SET_CURRENT_DASHBOARD,
} from 'actions';
import {
  USER_KEY_DASHBOARDS,
  USER_KEY_CURRENT_DASHBOARD,
} from 'util/storage';

const DEFAULT_STATE = {
  dashboards: [],
  currentDashboard: 0,
  isLoadingDashboards: false,
  isLoadingLoadProfile: false,
  PGELoadProfile: {},
  error: null,
};

export default (state = DEFAULT_STATE, action) => {
  if (action.error) return state;

  switch (action.type) {
    case GET_DASHBOARDS_STARTED:
      return {
        ...state,
        isLoadingDashboards: true,
        error: null,
      };
    case GET_DASHBOARDS_COMPLETED: {
      let localDashboards = window.localStorage.getItem(USER_KEY_DASHBOARDS);

      try {
        localDashboards = localDashboards.length ? JSON.parse(localDashboards) : [];
      } catch (err) {
        localDashboards = action.payload;
      }

      window.localStorage.setItem(USER_KEY_DASHBOARDS, JSON.stringify(localDashboards));

      const localCurrentDashboard = window.localStorage.getItem(USER_KEY_CURRENT_DASHBOARD);
      const currentDashboard = parseInt(localCurrentDashboard, 10) || 0;

      return {
        ...state,
        dashboards: localDashboards,
        currentDashboard,
        isLoadingDashboards: false,
        error: null,
      };
    }
    case GET_DASHBOARDS_FAILED:
      return {
        ...state,
        isLoadingDashboards: false,
        error: action.payload,
      };
    case GET_PGE_LOAD_PROFILE_STARTED:
      return {
        ...state,
        isLoadingLoadProfile: true,
        error: null,
      };
    case GET_PGE_LOAD_PROFILE_COMPLETED: {
      const loadProfileByTariff = {};

      const xAxes = Object.keys(action.payload);
      const yAxes = Object.keys(action.payload[xAxes[0]]);

      Object.keys(action.payload).forEach((xAxis) => {
        yAxes.forEach((yAxis) => {
          const point = {
            x: xAxis,
            y: action.payload[xAxis][yAxis],
          };

          if (yAxis in loadProfileByTariff) {
            loadProfileByTariff[yAxis].push(point);
          } else {
            loadProfileByTariff[yAxis] = [point];
          }
        });
      });

      return {
        ...state,
        PGELoadProfile: loadProfileByTariff,
        isLoadingLoadProfile: true,
        error: null,
      };
    }
    case GET_PGE_LOAD_PROFILE_FAILED:
      return {
        ...state,
        isLoadingLoadProfile: false,
        error: action.payload,
      };
    case ADD_CHART: {
      const dashboards = [...state.dashboards];

      if (state.currentDashboard in dashboards) {
        dashboards[state.currentDashboard].charts.push(action.payload);
      }

      window.localStorage.setItem(USER_KEY_DASHBOARDS, JSON.stringify(dashboards));

      return {
        ...state,
        dashboards,
      };
    }
    case REMOVE_CHART: {
      const dashboards = [...state.dashboards];

      if (state.currentDashboard in dashboards) {
        dashboards[state.currentDashboard].charts.splice(action.payload, 1);
      }

      window.localStorage.setItem(USER_KEY_DASHBOARDS, JSON.stringify(dashboards));

      return {
        ...state,
        dashboards,
      };
    }
    case ADD_DASHBOARD: {
      const dashboards = [...state.dashboards, action.payload];

      window.localStorage.setItem(USER_KEY_DASHBOARDS, JSON.stringify(dashboards));

      const currentDashboard = state.dashboards.length;

      window.localStorage.setItem(USER_KEY_CURRENT_DASHBOARD, `${currentDashboard}`);

      return {
        ...state,
        dashboards: [
          ...state.dashboards,
          action.payload,
        ],
        currentDashboard,
      };
    }
    case DELETE_DASHBOARD: {
      const dashboards = [...state.dashboards];
      dashboards.splice(action.payload, 1);

      window.localStorage.setItem(USER_KEY_DASHBOARDS, JSON.stringify(dashboards));

      const currentDashboard = action.payload % (state.dashboards.length - 1);

      window.localStorage.setItem(USER_KEY_CURRENT_DASHBOARD, `${currentDashboard}`);

      return {
        ...state,
        dashboards,
        currentDashboard,
      };
    }
    case SET_CURRENT_DASHBOARD: {
      const currentDashboard = action.payload;

      window.localStorage.setItem(USER_KEY_CURRENT_DASHBOARD, `${currentDashboard}`);

      return {
        ...state,
        currentDashboard,
      };
    }
    default:
      return state;
  }
};
