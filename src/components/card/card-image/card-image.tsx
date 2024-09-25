import React from "react";
import styles from "./card-image.module.css";
type CardImgProps = {
  img: string;
  name: string;
};

const CardImg: React.FC<CardImgProps> = ({ img, name }) => {
  return <img className={styles["card-div-img"]} src={img} alt={name} />;
};

export default CardImg;
