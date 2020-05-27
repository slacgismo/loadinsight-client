import React from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const Menu = (props) => {
  const { history } = props;
  const navigate = (path) => (() => history.push(path));
  const location = useLocation();
  const path = location.pathname;

  const dashboardsStyle = path.includes('/dashboards') ? styles.selected : styles.unselected;
  const pipelinesStyle = path.includes('/pipelines') ? styles.selected : styles.unselected;
  const jobsStyle = path.includes('/jobs') ? styles.selected : styles.unselected;

  return (
    <div className={styles.root}>
      <div className={`${styles.menuItem} ${dashboardsStyle}`} role="button" tabIndex={0} onClick={navigate('/dashboards')} onKeyPress={navigate('/dashboards')}>Dashboards</div>
      <div className={`${styles.menuItem} ${pipelinesStyle}`} role="button" tabIndex={0} onClick={navigate('/pipelines')} onKeyPress={navigate('/pipelines')}>Pipelines</div>
      <div className={`${styles.menuItem} ${jobsStyle}`} role="button" tabIndex={0} onClick={navigate('/jobs')} onKeyPress={navigate('/jobs')}>Jobs</div>
      <div className={`${styles.menuItem}`}>Settings</div>
      <div className={`${styles.menuItem}`}>Help</div>
    </div>
  );
};

Menu.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(Menu);
