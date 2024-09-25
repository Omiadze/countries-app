import React from "react";
import styles from "./card-content.module.css";

type CardContentProps = {
  name: string;
  population: string;
  capital: string;
};

const CardContent: React.FC<CardContentProps> = ({
  name,
  population,
  capital,
}) => {
  return (
    <div className={styles["card-content"]}>
      <h3>Country: {name}</h3>
      <p>Population: {population}</p>
      <p>Capital: {capital}</p>
    </div>
  );
};

export default CardContent;
