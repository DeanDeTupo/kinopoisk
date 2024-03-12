import React from 'react';
import styles from './PageContent.module.css';

const InfoRow = ({ title, content, style }) => {
  return (
    <div className={styles.row}>
      <p className={styles.leftColumn}>{title}</p>
      <em>
        <p className={styles.rightColumn}>{content}</p>
      </em>
    </div>
  );
};

export default InfoRow;
