import React from 'react';
import styles from './index.module.css';

export default (props) => {
    const { name, lastUpdated } = props;
    return (
        <div className={styles.root}>
            <div className={styles.name}>{name}</div>
            <div className={styles.lastUpdated}>Last updated {lastUpdated}</div>
            <div className={styles.button}>Succeeded</div>
        </div>
    )
};