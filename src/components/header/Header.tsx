import React from 'react';
import logo from '@components/assets/logo.png';
import styles from '@components/header/header.module.css';
import { NavLink, useParams } from 'react-router-dom';

interface Props {
  currentLang: 'eng' | 'ka';
  handleLanguageChange: () => void;
}

export const Header: React.FC<Props> = ({
  currentLang,
  handleLanguageChange,
}) => {
  const { lang } = useParams();
  const nav: string[] = ['Home', 'About', 'Favorites', 'contact'];
  const navKa: string[] = [
    'მთავარი გვერდი',
    'ჩვენს შესახებ',
    'რჩეულები',
    'კონტაქტი',
  ];
  const navList = lang === 'ka' ? navKa : nav;

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="" />
        <h1>
          Country<span className={styles['header-span']}>MAN</span>ia
        </h1>
      </div>
      <div className={styles['nav-lists']}>
        {/* {navList.map((item) => (
          <NavLink
            key={item}
            to={`${item.toLowerCase()}`}
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            {item}
          </NavLink>
        ))} */}
        <NavLink
          to={`${nav[0].toLowerCase()}`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {navList[0]}
        </NavLink>
        <NavLink
          to={`${nav[1].toLowerCase()}`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {navList[1]}
        </NavLink>
        <NavLink
          to={`${nav[2].toLowerCase()}`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {navList[2]}
        </NavLink>
        <NavLink
          to={`${nav[3].toLowerCase()}`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {navList[3]}
        </NavLink>
      </div>
      <button className={styles['lang-btn']} onClick={handleLanguageChange}>{`${
        currentLang === 'eng' ? 'ქართული' : 'English'
      }`}</button>
    </div>
  );
};
