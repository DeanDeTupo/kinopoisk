import React, { useEffect, useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import styles from '../Page/Slider.module.css';

const DemoSlider = ({ id, content: footage }) => {
  //   console.log(footage);
  // const [slide, setSlide] = useState(0);

  //   const [movieImages, setMovieImages] = useState(null);
  const [step, setStep] = useState(0);
  //   console.log('!!!!!!!!', id);

  const content = footage.docs; //это массив с ссылками на ВСе картинки к фильму

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
    console.log(nextStep);
    setStep(nextStep);
  };
  const nextSlide = () => {
    let stepValue = step;
    let nextStep = stepValue === imgList.length - 1 ? 0 : ++stepValue;
    console.log(nextStep);
    setStep(nextStep);
  };

  console.log('****', prev, step, next, '***');
  console.log('****', renderList, '***');

  return (
    <>
      <h2>Кадры из фильма</h2>
      <div className={styles.slider}>
        <div className={styles.sliderContainer}>
          <div style={style}>
            {!!renderList &&
              renderList.map((item) => {
                return (
                  <img
                    src={item}
                    className={styles.slider_img}
                    alt="Кадр из фильма"
                  ></img>
                );
              })}
          </div>
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
    </>
  );
};

export default DemoSlider;
