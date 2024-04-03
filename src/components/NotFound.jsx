import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const statusCodes = {
  400: {
    name: 'Bad Request',
    text: 'Ошибка в запросе',
  },
  403: {
    name: 'Bad Request',
    text: 'Отказано в доступе, кончились запросы',
  },
  404: {
    name: 'Not Found',
    text: 'Запрашиваемая страница не найдена',
  },
  'Failed to fetch': {
    name: 'Unauthorised',
    text: 'Не указан токен',
  },
};

const NotFound = ({ status }) => {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.main}>
        {!!status ? (
          <h1>
            {status}: {statusCodes.name}
          </h1>
        ) : (
          <h1>404 NotFound...</h1>
        )}
        {!!status ? <h3>{statusCodes[status].text}</h3> : ''}

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
          <Link to="/demo" className={styles.link}>
            Демонстрационная версия
          </Link>
          <Link to="/recommend" className={styles.link}>
            Фильм дня
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
