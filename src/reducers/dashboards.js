import {
  GET_DASHBOARDS_STARTED,
  GET_DASHBOARDS_COMPLETED,
  GET_DASHBOARDS_FAILED,
  GET_PGE_LOAD_PROFILE_STARTED,
  GET_PGE_LOAD_PROFILE_COMPLETED,
  GET_PGE_LOAD_PROFILE_FAILED,
  ADD_CHART,
  REMOVE_CHART,
} from 'actions';

const DEFAULT_STATE = {
  dashboards: [],
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
    case GET_DASHBOARDS_COMPLETED:
      return {
        ...state,
        dashboards: action.payload,
        isLoadingDashboards: false,
        error: null,
      };
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
      // add chart for only existing dashboard
      const currentDashboard = state.dashboards[0];
      currentDashboard.charts.push(action.payload);

      return {
        ...state,
        dashboards: [
          currentDashboard,
        ],
      };
    }
    case REMOVE_CHART: {
      // remove chart in only existing dashboard
      const currentDashboard = state.dashboards[0];
      currentDashboard.charts.splice(action.payload, 1);

      return {
        ...state,
        dashboards: [
          currentDashboard,
        ],
      };
    }
    default:
      return state;
  }
};
