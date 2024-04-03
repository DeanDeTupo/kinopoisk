import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.css';

const Menu = () => {
  return (
    <nav className={styles.nav}>
      <NavLink
        to="."
        className={({ isActive }) => (isActive ? styles.active111 : '')}
      >
        Главная
      </NavLink>{' '}
      {/* точка тут для перемещения к корневому элементу*/}
      <NavLink
        to="films"
        className={({ isActive }) => (isActive ? styles.active111 : '')}
      >
        Фильмы
      </NavLink>
      <NavLink
        to="demo"
        className={({ isActive }) => (isActive ? styles.active111 : '')}
      >
        Демо
      </NavLink>
      <NavLink
        to="recommend"
        className={({ isActive }) => (isActive ? styles.active111 : '')}
      >
        Фильм дня
      </NavLink>
    </nav>
  );
};

export default Menu;
