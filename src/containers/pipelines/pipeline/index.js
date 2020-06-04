import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const Pipeline = (props) => {
  const { name, lastUpdated } = props;
  return (
    <div className={styles.root}>
      <div className={styles.name}>{name}</div>
      <div className={styles.lastUpdated}>
        Last updated
        {lastUpdated}
      </div>
      <div className={styles.button}>Succeeded</div>
    </div>
  );
};

Pipeline.propTypes = {
  name: PropTypes.string.isRequired,
  lastUpdated: PropTypes.string.isRequired,
};

export default Pipeline;
