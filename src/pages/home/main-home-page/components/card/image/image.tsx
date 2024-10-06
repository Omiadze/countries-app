import React from "react";
import styles from "@/pages/home/main-home-page/components/card/image/image.module.css";
type CardImgProps = {
  img: string;
  name: string;
};

export const CardImg: React.FC<CardImgProps> = ({ img, name }) => {
  return <img className={styles["card-div-img"]} src={img} alt={name} />;
};
