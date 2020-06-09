import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { logoutUser as logoutUserAction } from 'actions/user';
import PropTypes from 'prop-types';
import { ROUTE_LOGIN } from 'config/routes';
import styles from './index.module.css';

const OrgDropdown = (props) => { // TODO: remove if not in use
  const { history, logoutUser } = props;
  const onSignOut = () => {
    logoutUser();
    history.push(ROUTE_LOGIN);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>Organizations</div>
      <div className={styles.organizations}>
        <div className={styles.organization}>
          <div className={`${styles.photo} ${styles.hce}`} />
          <div className={styles.name}>Holy Cross Energy</div>
        </div>
        <div className={styles.organization}>
          <div className={`${styles.photo} ${styles.pge}`} />
          <div className={styles.name}>Pacific Gas &amp; Electric</div>
        </div>
        <div className={styles.organization}>
          <div className={`${styles.photo} ${styles.svce}`} />
          <div className={styles.name}>Silicon Valley Clean Energy</div>
        </div>
      </div>
      <div className={styles.border} />
      <div className={styles.signout} role="button" tabIndex={0} onClick={onSignOut} onKeyPress={onSignOut}>Sign Out</div>
    </div>
  );
};

OrgDropdown.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapDispatch = (dispatch) => bindActionCreators({
  logoutUser: logoutUserAction,
}, dispatch);

export default withRouter(connect(undefined, mapDispatch)(OrgDropdown));
