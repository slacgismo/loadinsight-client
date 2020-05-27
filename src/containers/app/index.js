import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './navigation';
import styles from './index.module.css';

const App = (props) => {
  const { children } = props;
  return (
    <div className={styles.root}>
      <div className={styles.leftPane}>
        <Navigation />
      </div>
      <div className={styles.rightPane}>
        {children}
      </div>
    </div>
  );
};

App.propTypes = { children: PropTypes.node.isRequired };

export default App;
