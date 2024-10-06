import React from "react";
import styles from "./details.module.css";

import { useLocation } from "react-router-dom";

const DetailsPage: React.FC = () => {
  const location = useLocation();
  const { country } = location.state;
  console.log(country);

  return (
    <div className={styles["details-container"]}>
      <div className={styles["details-content"]}>
        <h1>{country.name}</h1>
        <p>Population: {country.population}</p>
        <p>Capital: {country.capital}</p>
        <p>Details: {country.info}</p>
      </div>
      <img src={country.img} alt={country.name} />
    </div>
  );
};

export default DetailsPage;
