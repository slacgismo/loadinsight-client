import React from 'react';

import SettingsDropdown from './SettingsDropdown';
import styles from './index.module.css';

const Profile = () => (
  <div className={styles.root}>
    <div className={styles.clickable}>
      <div className={styles.photoBorder}>
        <div className={styles.photo} />
      </div>
      <div className={styles.nameAndOrg}>
        <div className={styles.name}>David Chassin</div>
        <div className={styles.organization}>SLAC</div>
      </div>
      <SettingsDropdown />
    </div>
  </div>
);

export default Profile;
