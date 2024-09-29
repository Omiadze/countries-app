import React from "react";
import logo from "@/components/assets/logo.png";
import styles from "@components/header/header.module.css";

export const Header: React.FC = () => {
  const nav: string[] = ["Home", "Favorites", "contact"];
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="" />
        <h1>
          Country<span className={styles["header-span"]}>MAN</span>ia
        </h1>
      </div>
      <div className={styles["nav-lists"]}>
        {nav.map((item) => (
          <a key={item}>{item}</a>
        ))}
      </div>
    </div>
  );
};
