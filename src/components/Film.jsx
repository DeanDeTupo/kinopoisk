import React from 'react';
import styles from './Film.module.css';

const Film = (item) => {
  let {
    rating,
    year,
    name,
    movieLength,
    shortDescription,
    index,
    poster,
    alternativeName,
    countries,
    genres,
    ...rest
  } = item;

  const isProp = (prop) => {
    //проверяем есть ли данные
    return !!prop ? `${prop}` : '';
  };

  return (
    <div className={styles.film}>
      <span className={styles.numer}>{index + 1}</span>
      <img className={styles.poster} src={poster.url}></img>
      <div className={styles.desc}>
        <h3>{name}</h3>
        <div className={styles.mainInfo}>
          <p>
            {!!alternativeName && `${alternativeName}, `} {year}
            {!!movieLength && `, ${movieLength} мин`}
            {/* {isProp(movieLength)} */}
          </p>
        </div>
        <p className={styles.secondInfo}>
          {countries[0].name} &#183; {genres[0].name}
        </p>
      </div>
      <div className={styles.rating}>
        <h5>Рейтинг</h5>

        <p>
          КП<strong> {rating.kp.toFixed(2)}</strong>
        </p>
        {/* вот тут проверем есть ли другой рейтенх */}
        {rating.imdb ? (
          <p>
            IMDB<strong> {rating.imdb.toFixed(2)}</strong>
          </p>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Film;
