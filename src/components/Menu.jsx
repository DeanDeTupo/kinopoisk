import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.module.css';

const Menu = () => {
  return (
    <nav className={styles.nav}>
      <Link to=".">Home</Link>{' '}
      {/* точка тут для перемещения к корневому элементу*/}
      <Link to="films">Фильмы</Link>
    </nav>
  );
};

export default Menu;
