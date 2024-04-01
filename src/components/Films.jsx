import React, { useEffect, useState } from 'react';
import Film from './Film';
import data from '../data/test.json';
import {
  Link,
  useLocation,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import NotFound from './NotFound';
import styles from './Films.module.css';
import queryString from 'query-string';
import Root from './Page/Root';
import ContactForm from './ContactForm';
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
  const navigate = useNavigate();
  const query = queryString.parse(location.search); //parsim search

  const { isSeries: seriesState, ...queryParams } = query;
  console.log('в адресной строке', query);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams('');
  const [page, setPage] = useState(1); //номер страницы
  // eslint-disable-next-line
  const [sortKey, setSortKey] = useState(''); //ключ сортировки
  const [isSeries, setIsSeries] = useState('');
  const [filmData, setFilmData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    const URL = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=100&id=%211043713${
      query.isSeries ? '&isSeries=' + query.isSeries : ''
    }&year=2015-2020&rating.kp=8-10`;
    // seriesParam = (isSeries in )
    console.log(URL);
    console.log('ДОСТУП к БД');
    (async () => {
      try {
        const response = await fetch(URL, options);
        console.log('STATUS', response.ok);
        const data = await response.json();
        if (!response.ok) setError(data.message);
        setFilmData(data);
        setIsLoading(false);
        console.log('ЧЕ ПРИШЛО', data);
      } catch (e) {
        console.log('ПОЙМАНА ОШИБКА', e.message);
        setError(e);
        setIsLoading(false);
      }
    })();
  }, [seriesState]);

  useEffect(() => {
    const { page, sort } = queryParams;
    !page ? setPage(1) : setPage(page);
    !sort ? setSortKey('') : setSortKey(sort);
    !isSeries ? setIsSeries('') : setSortKey(isSeries);
    console.log('ЗАШЛО useEffect');
  }, [queryParams]);

  //меняем номер страницы
  function changePage(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    console.log(query);
    const value = event.target.innerText;
    const params = {};

    if (query.sort) params.sort = query.sort;
    if (query.isSeries) params.isSeries = query.isSeries;
    if (value > 0) params.page = value;

    setSearchParams(params);
  }

  // изменить - сортировка до отрисовки
  // меняем метод сортировки списка фильмов
  function changeSortParam(event) {
    event.preventDefault();
    const method = event.target.value;
    const params = {};
    if (method) params.sort = method;

    if (query.isSeries) params.isSeries = query.isSeries;
    setSearchParams(params);
  }

  function changeIncludeSeries(event) {
    event.preventDefault();
    const params = {};
    const seriesValue = event.target.value;

    if (query.sort) params.sort = query.sort;
    if (seriesValue) params.isSeries = seriesValue;
    setSearchParams(params);
    setIsLoading(true);
    console.log(query);
  }

  console.log('ПОКАЗЫВАЮ', filmData);
  if (isLoading) {
    return <h1>Загружаю данные...</h1>;
  }
  if (error) {
    console.log('РЕНДЕР ОШИБКИ');
    return (
      <>
        <div>Ошибка {error?.message}</div>
        <p style={{ fontSize: '10rem' }}>&#128584;</p>
        <div>Не удалось отобразить контент</div>
        <Link></Link>
      </>
    );
  }

  //сортируем фильмы
  const filmsToShow = sortFilmsToShow(filmData.docs, sortKey);
  // отберем нужные n фильмов из отсортированного массива для показа
  const filmsToRender = getPartOfList(filmsToShow, page, pageLimit); //берем столько фильмов, сколько нужно отразить на странице. не больше

  // if (!filmsToRender.length) {
  //   //ниче не найдено
  //   return <NotFound />;
  // }
  return (
    <div>
      <h2>Топ-100 лучших фильмов и сериалов 2015-2020</h2>
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

      {!!filmsToRender.length ? (
        filmsToRender.map((item, index) => {
          // возвращаем хуеву гору ссылок
          return (
            <Link
              className={styles.movieItem}
              to={String(item.id)}
              key={item.id}
            >
              <Film {...item} page={page} limit={pageLimit} listIndex={index} />
            </Link>
          );
        })
      ) : (
        <NotFound />
      )}

      <Root
        page={page}
        pageLimit={pageLimit}
        totalCount={filmsToShow.length}
        changePage={changePage}
      />
      <ContactForm />
    </div>
  );
};

export default Films;
