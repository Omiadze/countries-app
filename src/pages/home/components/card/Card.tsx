import React from "react";
import { CardContent } from "@/pages/home/components/card/content";
import { CardHeader } from "@/pages/home/components/card/header";
import { CardImg } from "@/pages/home/components/card/image";
import styles from "@/pages/home/components/card/card.module.css";

type Country = {
  img: string;
  name: string;
  population: string;
  capital: string;
};

const Card: React.FC = () => {
  const countries: Array<Country> = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/800px-Flag_of_Georgia.svg.png",
      name: "Georgia",
      population: "3.736 million",
      capital: "Tbilisi",
    },
  ];
  return (
    <div className={styles["cards-container"]}>
      {countries.map((item: Country) => (
        <div className={styles["card-div"]} key={item.name}>
          <CardHeader />
          <CardImg img={item.img} name={item.name} />
          <hr />
          <CardContent
            name={item.name}
            population={item.population}
            capital={item.capital}
          />
        </div>
      ))}
    </div>
  );
};
export default Card;
