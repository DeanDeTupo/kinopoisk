import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from '../components/Menu';
import Footer from '../components/Footer';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <Menu />
        <main className={styles.contentWrapper}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
