import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PageContent.module.css';
import { RiArrowLeftLine } from 'react-icons/ri';
import InfoRow from './InfoRow';

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

const PageContent = (content) => {
  const {
    name,
    year,
    genres,
    logo,
    poster,
    description,
    shortDescription,
    movieLength,
    countries,
    persons,
    ...filmData
  } = content;

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
  const directorProp = personsFromProfession(persons, 'director');
  const actorProp = personsFromProfession(persons, 'actor');

  return (
    <>
      {console.log(content)}
      <Link to="..">
        <RiArrowLeftLine className={styles.back} />
      </Link>
      <h1>{filmData.name}</h1>

      <img
        src={logo.url}
        alt=""
        style={{ objectFit: 'contain', width: '100%', height: '200px' }}
      />
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
              height: '300px',
            }}
          />
        </div>
        {/* ---------------------------------------------------- */}
        <div className={styles.gap}></div>
        {/* _____столбик правый */}
        <div className={styles.column}>
          <h1>
            {name.toUpperCase()}({year})
          </h1>
          <h3>{shortDescription}</h3>

          <InfoRow title="Жанр:" content={genresProp} style={styles.row} />
          <InfoRow title="Год производства" content={year} style={styles.row} />
          <InfoRow title="Страна" content={countriesProp} style={styles.row} />
          <InfoRow title="Время" content={movieLengthProp} style={styles.row} />
          {/* <InfoRow title="Режиссер" content={directorProp} style={styles.row} />
          <InfoRow title="Актёры" content={actorProp} style={styles.row} /> */}
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
          <div className={styles.row}>
            <p>Описание: {description}</p>
          </div>
        </div>
      </div>

      <div className={styles.description}></div>
    </>
  );
};

export default PageContent;
