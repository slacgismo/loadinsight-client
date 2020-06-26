import { combineReducers } from 'redux';
import user from './user';
import pipelines from './pipelines';
import repositories from './repositories';
import dashboards from './dashboards';
import jobs from './jobs';

export default combineReducers({
  user,
  pipelines,
  repositories,
  dashboards,
  jobs,
});
