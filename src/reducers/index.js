import { combineReducers } from 'redux';
import user from './user';
import pipelines from './pipelines';
import repositories from './repositories';
import dashboards from './dashboards';

export default combineReducers({
  user,
  pipelines,
  repositories,
  dashboards,
});
