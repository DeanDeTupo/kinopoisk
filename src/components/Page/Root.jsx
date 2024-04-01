import React from 'react';
import styles from './Root.module.css';

const Root = ({ page, pageLimit, totalCount, changePage }) => {
  const pageCount = Math.ceil(totalCount / pageLimit);
  //   console.log(pageCount);
  const roots = [];
  for (let i = 0; i < pageCount; i++) {
    roots[i] = i + 1;
  }
  // console.log(roots);
  return (
    <div className={styles.rootLine}>
      {roots.map((item) => {
        return (
          <button
            key={item}
            type="button"
            className={+page === item ? styles.activeRoot : styles.root}
            onClick={(event) => changePage(event)}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default Root;
