import banner from "../assets/banner.jpg";
import styles from "./banner.module.css";

const Banner = () => {
  return (
    <div>
      <div className={styles["banner-div"]}>
        <img className={styles.banner} src={banner} alt="" />
        <div className={styles.overlay}></div>
      </div>
      <div className={styles["banner-content"]}>
        <h1>
          <span className={styles["banner-span"]}>FIND</span> intresting
          informations about different countries and{" "}
          <span className={styles["banner-span"]}>CHOOSE</span> your favorite
        </h1>
        <button className={styles["btn-find"]}>FIND</button>
      </div>
    </div>
  );
};

export default Banner;
