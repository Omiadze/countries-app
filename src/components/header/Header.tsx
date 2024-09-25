import logo from "../assets/logo.png";
import styles from "./header.module.css";

const Header: React.FC = () => {
  const nav = ["Home", "Favorites", "contact"];
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
          <a>{item}</a>
        ))}
      </div>
    </div>
  );
};

export default Header;
