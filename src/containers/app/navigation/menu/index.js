import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  ROUTE_DASHBOARDS,
  ROUTE_PIPELINES,
  ROUTE_JOBS,
} from 'config/routes';
import styles from './index.module.css';

const Menu = (props) => {
  const { history } = props;
  const navigate = (path) => (() => history.push(path));
  const location = useLocation();
  const path = location.pathname;

  const dashboardsStyle = path.includes(ROUTE_DASHBOARDS) ? styles.selected : styles.unselected;
  const pipelinesStyle = path.includes(ROUTE_PIPELINES) ? styles.selected : styles.unselected;
  const jobsStyle = path.includes(ROUTE_JOBS) ? styles.selected : styles.unselected;

  return (
    <div className={styles.root}>
      <div className={`${styles.menuItem} ${dashboardsStyle}`} role="button" tabIndex={0} onClick={navigate(ROUTE_DASHBOARDS)} onKeyPress={navigate(ROUTE_DASHBOARDS)}>Dashboards</div>
      <div className={`${styles.menuItem} ${pipelinesStyle}`} role="button" tabIndex={0} onClick={navigate(ROUTE_PIPELINES)} onKeyPress={navigate(ROUTE_PIPELINES)}>Pipelines</div>
      <div className={`${styles.menuItem} ${jobsStyle}`} role="button" tabIndex={0} onClick={navigate(ROUTE_JOBS)} onKeyPress={navigate(ROUTE_JOBS)}>Jobs</div>
    </div>
  );
};

Menu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Menu);
