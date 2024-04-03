import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { options } from '../../data/request';
import PageContent from './PageContent';
import demoData from '../../data/demo/testFilmData.json';
import footage from '../../data/demo/demoFootage.json';
import NotFound from '../NotFound';

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
        const response = await fetch(url, options); //тут выдаёт 403, если кончилась подписка
        if (!response.ok) {
          throw new Error(response.status);
        }
        const data = await response.json();
        setFilmData(data);
        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    })();
  }, [url]);

  // если поймали ошибку при запросе - 404
  // если кончились запросы - даём перейти в демо режим
  if (isDemo) {
    return (
      <>
        <h1>Демонстрационная версия</h1>
        <h4>Демо-контент:</h4>
        <hr></hr>
        <PageContent {...demoData} footage={footage} />
      </>
    );
  }
  if (error) {
    return <NotFound status={error.message} />;
  }
  // if (error || isDemo) {
  //   return (
  //     <div>
  //       {!!isDemo ? (
  //         <>
  //           <h1>Демонстрационная версия</h1>
  //           <h4>Демо-контент:</h4>
  //           <hr></hr>
  //         </>
  //       ) : (
  //         <>
  //           <h1>Контент заблокирован</h1>
  //           <h3>
  //             Достигнут предел суточных запросов, пожалуйста, {error.message}
  //           </h3>
  //           <h4>Демо-контент:</h4>
  //           <hr></hr>
  //         </>
  //       )}

  //       <PageContent {...demoData} footage={footage} />
  //     </div>
  //   );
  // }

  return <>{isLoading ? <h1>Загрузка</h1> : <PageContent {...filmData} />}</>;
};
export default SingleFilmPage;
