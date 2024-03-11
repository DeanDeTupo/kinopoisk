import React, { useState } from 'react';
import Film from './Film';
import data from '../data/test.json';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './Films.module.css';
import Root from './Root';

const filmData = data.docs; //список лучших фильмов
const pageLimit = 10; // можно менять количество показываемых филемов

const getPartOfList = (list, page, count) => {
  let start = (page - 1) * count;
  let end = start + count;
  return list.slice(start, end);
};

const Films = () => {
  const [page, setPage] = useState(1); //номер страницы
  const [filmsToShow, setFilmsToShow] = useState(filmData); //записыгаем список фильмов в состояние после сортировки
  const [sortParam, setSortParam] = useSearchParams('');
  // отберем нужные n фильмов для показа
  const filmsToRender = getPartOfList(filmsToShow, page, pageLimit); //берем столько фильмов, сколько нужно отразить на странице. не больше
  //меняем номер страницы
  function changePage(value) {
    setPage(value);
  }
  // меняем метод сортировки списка фильмов
  function changeSortParam(event) {
    event.preventDefault();
    const method = event.target.value;
    if (!method) {
      //если по порядку
      setSortParam({});
      setPage(1);
      setFilmsToShow(filmData);
      return;
    }
    setSortParam({ sort: method });
    sortFilmsToShow(filmsToShow, method);
    setPage(1);
  }
  //сортируем фильмы
  function sortFilmsToShow(list, method) {
    const sortedFilms = [...list];
    const key = method === 'rating' ? method.kp : method;
    sortedFilms.sort((a, b) => (a[key] > b[key] ? -1 : 1));
    setFilmsToShow(sortedFilms);
  }

  // заведём параметры сортировки списка, которые будем пихать в url

  // console.log(filmsToRender);

  return (
    <div>
      <h2>Топ-100 лучших фильмов 2015-2024</h2>
      <form onChange={(e) => changeSortParam(e)}>
        <label>Сортировать </label>
        <select name="sort">
          <option value="">по порядку</option>
          {/* <option value="rating">по рейтингу</option> */}
          <option value="year">по дате выхода</option>
        </select>
      </form>
      {filmsToRender.map((item, index) => {
        // возвращаем хуеву гору ссылок
        console.log(item);
        return (
          <Link className={styles.movieItem} to={String(item.id)} key={item.id}>
            <Film {...item} page={page} limit={pageLimit} listIndex={index} />
          </Link>
        );
      })}
      <Root
        page={page}
        pageLimit={pageLimit}
        totalCount={filmsToShow.length}
        changePage={changePage}
      />
    </div>
  );
};

export default Films;
