import React, { useEffect, useState } from 'react';
import Film from './Film';
import data from '../data/test.json';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import styles from './Films.module.css';
import queryString from 'query-string';
import Root from './Page/Root';
import { options } from '../data/request';

const pageLimit = 20; // можно менять количество показываемых филемов
const DemoFilmData = data.docs; //список лучших фильмов

const getPartOfList = (list, _page, count) => {
  const page = !_page ? 1 : parseInt(_page);
  let start = (page - 1) * count;
  let end = start + count;
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

  const seriesState = query.isSeries;
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams('');
  const [page, setPage] = useState(1); //номер страницы
  // eslint-disable-next-line
  const [sortKey, setSortKey] = useState(''); //ключ сортировки
  const [isSeries, setIsSeries] = useState('');
  const [filmData, setFilmData] = useState('');

  useEffect(() => {
    const URL = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=100&year=2015-2024&rating.kp=8-10${
      query.isSeries ? '&isSeries=' + query.isSeries : ''
    }`;
    // seriesParam = (isSeries in )
    console.log(URL);
    (async () => {
      const response = await fetch(URL, options);
      const data = await response.json();
      setFilmData(data.docs);
    })();
  }, [seriesState]);

  useEffect(() => {
    const { page, sort, isSeries } = query;
    !page ? setPage(1) : setPage(page);
    // !sort ? setSortKey('') : setSortKey(sort);
    // !isSeries ? setIsSeries('') : setSortKey(isSeries);
  }, [query]);

  //меняем номер страницы
  function changePage(value) {
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
    const params = {};
    if (method) params.sort = method;
    setSearchParams(params);
  }

  function changeIncludeSeries(event) {
    event.preventDefault();
    const params = {};
    const seriesValue = event.target.value;
    console.log('пизда', seriesValue === null);

    if (query.sort) params.sort = query.sort;
    if (seriesValue) params.isSeries = seriesValue;
    setSearchParams(params);
    console.log(query);
  }

  //сортируем фильмы
  const filmsToShow = sortFilmsToShow(filmData, query.sort);
  // отберем нужные n фильмов из отсортированного массива для показа
  const filmsToRender = getPartOfList(filmsToShow, page, pageLimit); //берем столько фильмов, сколько нужно отразить на странице. не больше

  return (
    <div>
      <h2>Топ-100 лучших фильмов и сериалов 2015-2024</h2>
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
        <label htmlFor="series">Искать</label>
        <select
          name="sort"
          id="series"
          value={query.isSeries}
          onChange={(e) => changeIncludeSeries(e)}
        >
          <option value="">фильмы и сериалы</option>
          <option value="false">фильмы</option>
          <option value="true">сериалы</option>
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
