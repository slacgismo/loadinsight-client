import React from 'react';
import styles from './index.module.css';

export default () => {
    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.title}>
                    Pipelines
                </div>
                <div className={styles.addPipelineButton}>
                    +Add Pipeline
                </div>
            </div>
        </div>
    )
}