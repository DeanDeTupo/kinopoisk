import React from 'react';
import styles from './PageContent.module.css';

const InfoRow = ({ title, content, style }) => {
  return (
    <div className={styles.row}>
      <div className={styles.leftColumn}>{title}</div>

      <div className={styles.rightColumn}>
        <div className={style}>{content}</div>
      </div>
    </div>
  );
};

export default InfoRow;
