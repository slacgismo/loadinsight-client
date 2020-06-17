import {
  GET_DASHBOARDS_STARTED,
  GET_DASHBOARDS_COMPLETED,
  GET_DASHBOARDS_FAILED,
} from 'actions';

const DEFAULT_STATE = {
  dashboards: [],
  isLoadingDashboards: false,
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
    default:
      return state;
  }
};
