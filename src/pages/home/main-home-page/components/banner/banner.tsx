import React from "react";
import banner from "@components/assets/banner.jpg";
import styles from "@/pages/home/main-home-page/components/banner/banner.module.css";
import { useParams } from "react-router-dom";

const Banner: React.FC = () => {
  const { lang } = useParams();
  return (
    <div>
      <div className={styles["banner-div"]}>
        <img className={styles.banner} src={banner} alt="banner" />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles["banner-content"]}>
        <h1>
          {lang === "eng" ? (
            <>
              <span className={styles["banner-span"]}>FIND</span> interesting
              information about different countries and{" "}
              <span className={styles["banner-span"]}>CHOOSE</span> your
              favorite
            </>
          ) : (
            <>
              <span className={styles["banner-span"]}>მოიძიე</span> ინფორმაცია
              სხვადასხვა ქვეყნების შესახებ და{" "}
              <span className={styles["banner-span"]}>აირჩიე</span> შენი
              ფავორიტი
            </>
          )}
        </h1>
        <button className={styles["btn-find"]}>
          {lang === "eng" ? "FIND" : "მოიძიე"}
        </button>
      </div>
    </div>
  );
};

export default Banner;
