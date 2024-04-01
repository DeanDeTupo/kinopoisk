import React from 'react';
import styles from './Film.module.css';

const Film = (item) => {
  let {
    rating,
    year,
    name,
    movieLength,
    shortDescription,
    poster,
    alternativeName,
    countries,
    genres,
    index,
    limit,
    page,
    listIndex,
    isSeries,
    ...rest
  } = item;

  const isProp = (prop) => {
    //проверяем есть ли данные
    return !!prop ? `${prop}` : '';
  };

  const join = (...args) => {
    const a = args.filter((item) => {
      return !!item;
    });
    return a;
  };

  return (
    <div className={styles.film}>
      {/* вот тут блять мы выводим номер из нашего топ-100 */}
      <span className={styles.numer}>{(page - 1) * limit + listIndex + 1}</span>
      <img
        className={styles.poster}
        src={poster.previewURL || poster.url}
      ></img>
      <div className={styles.desc}>
        <div className={styles.title}>
          <h3>{name}</h3>
          {isSeries && (
            <div className={styles.seriesTitle}>
              <h4>Cериал</h4>
            </div>
          )}
        </div>
        <div className={styles.mainInfo}>
          <p>
            {!!alternativeName && `${alternativeName}, `} {year}
            {!!movieLength && `, ${movieLength} мин`}
            {/* {isProp(movieLength)} */}
          </p>
        </div>
        <p className={styles.secondInfo}>
          {!!countries.length && countries[0].name} &#183;{' '}
          {!!genres[0].name && genres[0].name}
        </p>
      </div>

      <div className={styles.rating}>
        <h5>Рейтинг</h5>

        <p>
          КП<strong> {rating.kp.toFixed(2)}</strong>
        </p>
        {/* вот тут проверем есть ли другой рейтенх */}
        {!!rating.imdb && (
          <p>
            IMDB<strong> {rating.imdb.toFixed(2)}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Film;
