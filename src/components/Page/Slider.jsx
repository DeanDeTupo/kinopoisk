import React, { useEffect, useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import styles from '../Demo/Demo.module.css';
import { options } from '../../data/request';

const Slider = ({ id, content: footage }) => {
  //   console.log(footage);
  // const [slide, setSlide] = useState(0);

  const [movieImages, setMovieImages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!footage) {
    }
    (async () => {
      const URL = `https://api.kinopoisk.dev/v1.4/image?page=1&limit=100&movieId=${id}`;
      const request = await fetch(URL, options);
      const data = await request.json();
      setMovieImages(data);
      setIsLoading(false);
    })();
  }, []);
  // _______________________________________________________________
  // создадим массив с ссылками на картинки

  if (isLoading) {
    return <h2>Загружаю</h2>;
  }
  const content = movieImages.docs; //это массив с ссылками на ВСе картинки к фильму
  const imgList = content
    .filter((item) => {
      return item.type === 'still';
    })
    .map((item) => {
      return item.previewUrl || item.url;
    });

  const renderList = [];
  let offset = 0;

  const style = {
    display: 'flex',
    transition: 'all 1000ms ease',
    // transform: `translateX(-${step * 600}px)`,
  };
  // индексы предыдущего и следущего элемента
  let prev = step - 1 < 0 ? imgList.length - 1 : step - 1;
  let next = step + 1 === imgList.length ? 0 : step + 1;
  renderList.push(imgList[prev]);
  renderList.push(imgList[step]);
  renderList.push(imgList[next]);
  // const [slides, setSlides] = useState(renderList);

  const prevSlide = () => {
    let stepValue = step;
    let nextStep = stepValue === 0 ? imgList.length - 1 : --stepValue;
    setStep(nextStep);
  };
  const nextSlide = () => {
    let stepValue = step;
    let nextStep = stepValue === imgList.length - 1 ? 0 : ++stepValue;
    setStep(nextStep);
  };

  if (!isLoading && imgList.length === 0) return;
  return (
    <div style={{ position: 'relative' }}>
      <h2>Кадры из фильма</h2>
      <div className={styles.container}>
        {!!renderList &&
          renderList.map((item) => {
            return (
              <div className={styles.imgContainer}>
                <img src={item} alt="кадор" className={styles.img} />
              </div>
            );
          })}
      </div>
      <RiArrowLeftLine
        className={`${styles.btn} ${styles.btnRight}`}
        onClick={nextSlide}
      />
      <RiArrowLeftLine
        className={`${styles.btn} ${styles.btnLeft}`}
        onClick={prevSlide}
      />
    </div>
  );
};

export default Slider;
