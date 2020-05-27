import React from 'react';
import Profile from './profile';
import Menu from './menu';
import styles from './index.module.css';

export default () => (
  <div className={styles.root}>
    <div className={styles.profile}>
      <Profile />
    </div>
    <Menu />
  </div>
);
