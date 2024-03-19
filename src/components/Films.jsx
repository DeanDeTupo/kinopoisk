import React, { useEffect, useState } from 'react';
import Film from './Film';
import data from '../data/test.json';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styles from './Films.module.css';
import queryString from 'query-string';
import Root from './Page/Root';

const OPTIONS = new Map([
  ['', '-'],
  ['rating', 'по рейтингу'],
  ['year', 'по дате выхода'],
]);
const pageLimit = 20; // можно менять количество показываемых филемов
const filmData = data.docs; //список лучших фильмов

const getPartOfList = (list, _page, count) => {
  const page = !_page ? 1 : parseInt(_page);
  console.log('страница БЛЯТЬ ', page);
  let start = (page - 1) * count;
  let end = start + count;
  console.log('отобразить на странице', list.slice(start, end));
  return list.slice(start, end);
};

function sortFilmsToShow(list, method) {
  const sortedFilms = [...list];
  if (!method) return sortedFilms;
  const key = method;
  if (key === 'rating') {
    sortedFilms.sort((a, b) => b[key].kp - a[key].kp);
  } else {
    sortedFilms.sort((a, b) => (a[key] > b[key] ? -1 : 1));
  }
  return sortedFilms;
}

const Films = () => {
  const location = useLocation(); //get href
  const query = queryString.parse(location.search); //parsim search

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams('');
  const [page, setPage] = useState(1); //номер страницы
  const [sortKey, setSortKey] = useState(''); //ключ сортировки

  //отслеживаем изменение URL, бля, а почему это работает? я же сильнее сломать хотел...
  useEffect(() => {
    !query.page ? setPage(1) : setPage(query.page);
    // setPage(query.page);
    !query.page ? setSortKey('') : setSortKey(query.sort);

    // setSearchParams({ page: page, sort: sortKey });
  }, [query]);

  //меняем номер страницы
  function changePage(value) {
    setPage(value);
    // setSearchParams({ ...query, page: value });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const params = {};
    if (value > 1) params.page = value;
    if (query.sort) params.sort = query.sort;
    setSearchParams(params);
  }

  // изменить - сортировка до отрисовки
  // меняем метод сортировки списка фильмов
  function changeSortParam(event) {
    event.preventDefault();
    const method = event.target.value;
    setSortKey(method);
    setPage(1);
    const params = {};

    if (method) params.sort = method;

    setSearchParams(params);
  }

  //сортируем фильмы
  const filmsToShow = sortFilmsToShow(filmData, query.sort);
  // отберем нужные n фильмов из отсортированного массива для показа
  const filmsToRender = getPartOfList(filmsToShow, page, pageLimit); //берем столько фильмов, сколько нужно отразить на странице. не больше

  return (
    <div>
      <h2>Топ-100 лучших фильмов 2015-2024</h2>
      <form>
        <label>Сортировать </label>

        <select
          name="sort"
          value={query.sort}
          onChange={(e) => changeSortParam(e)}
        >
          <option value="">по порядку</option>
          <option value="rating">по рейтингу</option>
          <option value="year">по дате выхода</option>
        </select>
      </form>
      <Root
        page={page}
        pageLimit={pageLimit}
        totalCount={filmsToShow.length}
        changePage={changePage}
      />
      {filmsToRender.map((item, index) => {
        // возвращаем хуеву гору ссылок
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
