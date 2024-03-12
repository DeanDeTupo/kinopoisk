import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { options } from '../../data/request';
import demoData from '../../data/testFilmData.json';
import PageContent from './PageContent';

const SingleFilmPage = () => {
  const { filmId } = useParams(); //вернёт просто айдишник фильма
  // console.log(options);
  const url = 'https://api.kinopoisk.dev/v1.4/movie/' + filmId;
  // console.log(url);

  // делаем запрос к API кенопоеска, для получения данных
  const [filmData, setFilmData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setError('');
      try {
        const response = await fetch(url, options); //тут выдаёт 403, если кончилась подписка
        if (!response.ok) {
          console.log(response.ok);
          throw new Error('купи подписку, заебал!');
        }
        const data = await response.json();
        setFilmData(data);
        setIsLoading(false);
        console.log('************');
      } catch (e) {
        setError(e);
        console.log(e.message);
      }
    })();
  }, []);
  console.log(filmData);
  console.log('______________');
  console.log(error, 'error');
  console.log(filmData, 'data');
  console.log(isLoading, 'isLoading');

  // если поймали ошибку при запросе
  if (error) {
    return (
      <>
        <h1>Контент заблокирован</h1>
        <h3>Достигнут предел суточных запросов, пожалуйста, {error.message}</h3>
        <h4>Демо-контент:</h4>
        <hr></hr>
        <PageContent {...demoData} />
      </>
    );
  }

  return (
    <>{isLoading ? <h1>Загрузка</h1> : <PageContent content={filmData} />}</>
  );
};
export default SingleFilmPage;
