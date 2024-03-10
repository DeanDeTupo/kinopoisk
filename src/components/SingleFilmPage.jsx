import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { options } from '../data/request';
const SingleFilmPage = () => {
  const { filmId } = useParams(); //вернёт просто айдишник фильма
  console.log(options);
  const url = 'https://api.kinopoisk.dev/v1.4/movie/' + filmId;
  console.log(url);

  // делаем запрос к API кенопоика, для получения данных
  const [filmData, setFilmData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setFilmData(data);
        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    })();
  }, []);
  // console.log(filmData);

  // если поймали ошибку при запросе
  if (error) {
    return (
      <>
        <h1>failed</h1>
        <h3>Error: {error}</h3>
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <h1>Загрузка</h1>
      ) : (
        <>
          <small>фильм загружен</small>
          <h1>{filmData.name}</h1>
          <p>{filmData.year}</p>
          <img
            src={filmData.logo.url}
            alt=""
            style={{ objectFit: 'contain', width: '50%', height: '200px' }}
          />
          <p>{filmData.description}</p>
        </>
      )}
    </>
  );
};

export default SingleFilmPage;
