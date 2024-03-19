import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageContent.module.css';
import { RiArrowLeftLine } from 'react-icons/ri';
import InfoRow from './InfoRow';
import Slider from './Slider';

const timeFormat = (length) => {
  let hour = String(parseInt(length / 60)).padStart(2, '0');
  let min = String(length % 60).padStart(2, '0');
  return `${length} мин / ${hour}:${min}`;
};
const personsFromProfession = (personList, profession) => {
  const persons = personList
    .filter((item) => item.profession === profession)
    .map((dir) => dir.name)
    .join(', ');
  if (!persons.length) return 'Нет';
  return persons;
};

const parseDate = (date) => {
  if (!date) return null;

  const stamp = new Date(date);
  const MONTH = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  return `${stamp.getDate()} ${MONTH[stamp.getMonth()]} ${stamp.getFullYear()}`;
};
// -------------НАЧАЛО КОМПОНЕНТА ТУТ-----------------
const PageContent = (content) => {
  console.log('DEMO', content);
  const {
    name,
    year,
    genres,
    poster,
    description,
    shortDescription,
    movieLength,
    countries,
    persons,
    premiere,
    ageRating,
    footage,
    videos,
    isSeries,
  } = content;

  console.log('внутри pfge content', footage);

  //список всех профессий
  const professions = persons.reduce((professions, item) => {
    if (!professions.includes(item.profession))
      professions.push(item.profession);
    return professions;
  }, []);
  console.log(professions);

  const genresProp = genres.map((_) => _.name).join(', ');
  const movieLengthProp = timeFormat(movieLength);
  const countriesProp = countries.map((item) => item.name).join(', ');
  const premiereProp = parseDate(premiere.world);
  const ageRatingProp = ageRating + '+';

  return (
    <>
      {console.log(content)}
      <Link to="..">
        <RiArrowLeftLine className={styles.back} />
      </Link>

      {/* ---------------тута начинается КОНТЕНТ */}
      <div className={styles.content}>
        {/* ____столбик ЛЕВЫЙ */}
        <div className={styles.column}>
          <img
            src={poster.previewUrl}
            alt="poster"
            style={{
              display: 'block',
              textAlign: 'center',
              width: '300px',
              // height: '400px',
              objectFit: 'contain',
            }}
          />
          {!!videos && !!videos.trailers.length && (
            <>
              <h3>Трейлер</h3>
              <iframe
                title="trailer"
                className={styles.trailer}
                src={videos.trailers[0].url}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                width="300"
              >
                <p>Не поддерживаем видео</p>
              </iframe>
            </>
          )}
        </div>
        {/* ---------------------------------------------------- */}
        <div className={styles.gap}></div>
        {/* _____столбик правый */}
        <div className={styles.column}>
          <h1>
            {name.toUpperCase()}({year})
          </h1>
          <p>{shortDescription}</p>

          <InfoRow title="Жанр:" content={genresProp} />
          <InfoRow title="Год производства" content={year} />
          <InfoRow title="Страна" content={countriesProp} />
          {!isSeries && (
            <InfoRow title="Длительность" content={movieLengthProp} />
          )}
          {/* премьеры может и не быть оказываетсо */}
          {!premiereProp ? (
            ''
          ) : (
            <InfoRow title="Премьера" content={premiereProp} />
          )}
          <InfoRow title="Возраст" content={ageRatingProp} style={styles.age} />

          {/* --------это мы парсим всех людей из фильма */}
          {professions.map((profession, index) => {
            const personList = personsFromProfession(persons, profession);
            return (
              <InfoRow
                key={index}
                title={profession + ':'}
                content={personList}
              />
            );
          })}
          <div className={styles}>
            <p>Описание: {description}</p>
          </div>
          {/* ниже кадры из фильма */}
          <Slider content={footage}></Slider>
        </div>
      </div>
    </>
  );
};

export default PageContent;
