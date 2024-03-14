import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { options } from '../../data/request';
import PageContent from './PageContent';
import demoData from '../../data/demo/testFilmData.json';
import footage from '../../data/demo/demoFootage.json';

// eslint-disable-next-line
const SingleFilmPage = ({ isDemo, film }) => {
  const { filmId } = useParams(); //вернёт просто айдишник фильма
  // console.log(options);
  const url = 'https://api.kinopoisk.dev/v1.4/movie/' + filmId;
  // console.log(url);

  // делаем запрос к API кенопоеска, для получения данных

  const [filmData, setFilmData] = useState(null);
  const [error, setError] = useState(!!film ? film : '');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setError('');
      try {
        // throw new Error('купи подписку, заебал!');
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
  }, [url]);
  console.log(filmData);
  console.log('______________');
  console.log(error, 'error');
  console.log(filmData, 'data');
  console.log(demoData, 'DEMO');
  console.log(isLoading, 'isLoading');

  // если поймали ошибку при запросе
  if (error || isDemo) {
    return (
      <>
        {!!isDemo ? (
          <>
            <h1>Демонстрационная версия</h1>
            <h4>Демо-контент:</h4>
          </>
        ) : (
          <>
            <h1>Контент заблокирован</h1>
            <h3>
              Достигнут предел суточных запросов, пожалуйста, {error.message}
            </h3>
            <h4>Демо-контент:</h4>
          </>
        )}

        <hr></hr>
        <PageContent {...demoData} footage={footage} />
      </>
    );
  }

  return <>{isLoading ? <h1>Загрузка</h1> : <PageContent {...filmData} />}</>;
};
export default SingleFilmPage;
