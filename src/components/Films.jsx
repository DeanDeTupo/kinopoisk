import React, { useState } from 'react';
import Film from './Film';
import data from '../data/test.json';
import { Link, Outlet } from 'react-router-dom';
import styles from './Films.module.css';

const filmList = data.docs; //список лучших фильмов
const getPartOfList = (list, page, count) => {
  let start = (page - 1) * count;
  let end = start + count;
  return list.slice(start, end);
};

const Films = () => {
  const [page, setPage] = useState(1); //номер страницы
  // отберем нужные n фильмов для показа
  const filmCount = 20;
  const filmsToShow = getPartOfList(filmList, page, filmCount);

  console.log(filmsToShow);

  return (
    <div>
      <h2>Топ-100 лучших фильмов 2015-2024</h2>

      {filmsToShow.map((item, index) => {
        // возвращаем хуеву гору ссылок
        return (
          <Link className={styles.movieItem} to={String(item.id)} key={item.id}>
            <Film {...item} index={index} />
          </Link>
        );
      })}
    </div>
  );
};

export default Films;
