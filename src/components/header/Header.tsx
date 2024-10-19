import React, { useContext } from "react";
import logo from "@components/assets/logo.png";
import styles from "@components/header/header.module.css";
import { NavLink, useParams } from "react-router-dom";
import { LangContext } from "@/layout";

export const Header: React.FC = () => {
  const { currentLang } = useContext(LangContext);
  const { handleLanguageChange } = useContext(LangContext);
  const { lang } = useParams();
  console.log(lang);
  const nav: string[] = ["Home", "About", "Favorites", "contact"];
  const navKa: string[] = [
    "მთავარი გვერდი",
    "ჩვენს შესახებ",
    "რჩეულები",
    "კონტაქტი",
  ];
  const navList = currentLang === "ka" ? navKa : nav;
  console.log("context", currentLang);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="" />
        <h1>
          Country<span className={styles["header-span"]}>MAN</span>ia
        </h1>
      </div>
      <div className={styles["nav-lists"]}>
        {navList.map((item) => (
          <NavLink
            key={item}
            to={`${item.toLowerCase()}`}
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            {item}
          </NavLink>
        ))}
      </div>
      <button onClick={handleLanguageChange}>{`${
        currentLang === "ka" ? "kartuli" : "english"
      }`}</button>
    </div>
  );
};
