import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.main}>
        <h1>404 NotFound...</h1>
        <h3>Запрашиваемая страница не найдена</h3>
        <div className={styles.emo}>
          <p>&#128584;</p>
          <p>&#128581;&#8205;&#9794;&#65039;</p>
        </div>
        <div className={styles.nav}>
          <Link to="/" className={styles.link}>
            Главная страница
          </Link>
          <Link to="/films" className={styles.link}>
            Найти фильмы
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
