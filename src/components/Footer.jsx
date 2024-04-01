import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const date = new Date();
  return (
    <div className={styles.wrapper}>
      <footer></footer>
      <div className={styles.year}>1488 - {date.getFullYear()}</div>
    </div>
  );
};

export default Footer;
