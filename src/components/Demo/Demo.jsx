import React, { useEffect, useState } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import styles from './Demo.module.css';

const DemoSlider = ({ content: footage }) => {
  const [step, setStep] = useState(0);

  const imgList = footage;

  const renderList = [];

  //   const style = {
  //     display: 'flex',
  //     transition: 'all 1000ms ease',
  //     boxSizing: 'border-box',
  //     // transform: `translateX(-${step * 600}px)`,
  //   };
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
  console.log('****', !!renderList, '***');

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
{
  /* <div className={styles.slider}>
  <div className={styles.sliderContainer}>
    <div>
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
</div> */
}

export default DemoSlider;
