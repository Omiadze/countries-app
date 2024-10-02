import React from "react";
import styles from "./footer.module.css";

const Footer: React.FC = () => {
  const footerArr = [
    {
      h1: "Follow Us",
      fb: "Facebook",
      ig: "Instagram",
      ln: "Linkedin",
    },
  ];
  return (
    <div className={styles["footer-container"]}>
      <div>
        <h5>@Developed by Teo</h5>
      </div>
      {footerArr.map((item, index) => (
        <div className={styles["follow-us"]} key={index}>
          <h1>{item.h1}</h1>
          <a href="">{item.fb}</a>
          <a href="">{item.ig}</a>
          <a href="">{item.ln}</a>
        </div>
      ))}
    </div>
  );
};

export default Footer;
