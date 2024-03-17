import React from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';

import styles from './Slider.module.css';

const Slider = ({ content: footage }) => {
  //   console.log(footage);

  return (
    <div className={styles.slider}>
      <div className={styles.sliderContainer}>
        <RiArrowLeftLine className={`${styles.btn} ${styles.btnLeft}`} />
        <RiArrowLeftLine className={`${styles.btn} ${styles.btnRight}`} />
        <div className={styles.sliderLine}>
          {!!footage &&
            footage.docs
              .filter((item) => {
                return item.type === 'still';
              })
              .slice()
              .map((item) => {
                return <img src={item.url} className={styles.slider_img}></img>;
              })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
