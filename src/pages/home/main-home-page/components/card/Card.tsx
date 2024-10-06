import React from "react";
import { CardContent } from "@/pages/home/main-home-page/components/card/content";
import { CardHeader } from "@/pages/home/main-home-page/components/card/header";
import { CardImg } from "@/pages/home/main-home-page/components/card/image";
import styles from "@/pages/home/main-home-page/components/card/card.module.css";
import { Link } from "react-router-dom";

type Country = {
  id: string;
  img: string;
  name: string;
  population: string;
  capital: string;
  info: string;
};

const Card: React.FC = () => {
  const countries: Array<Country> = [
    {
      id: "1",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Flag_of_Georgia.svg/800px-Flag_of_Georgia.svg.png",
      name: "Georgia",
      population: "3.736 million",
      capital: "Tbilisi",
      info: "Georgia is a small and beautiful country with diverse nature and a generally mild climate, set in an advantageous geographical location. To the north are the Greater Caucasus Range and its glaciers, and to the south is the Lesser Caucasus Range.",
    },
    {
      id: "2",
      img: "https://cdn.britannica.com/33/4833-050-F6E415FE/Flag-United-States-of-America.jpg",
      name: "United States",
      population: "333.3 million",
      capital: "Washington, D.C.",
      info: "United States, country in North America, a federal republic of 50 states. Besides the 48 conterminous states that occupy the middle latitudes of the continent, the United States includes the state of Alaska, at the northwestern extreme of North America, and the island state of Hawaii, in the mid-Pacific Ocean. The conterminous states are bounded on the north by Canada, on the east by the Atlantic Ocean, on the south by the Gulf of Mexico and Mexico, and on the west by the Pacific Ocean. The United States is the fourth largest country in the world in area (after Russia, Canada, and China). The national capital is Washington, which is coextensive with the District of Columbia, the federal capital region created in 1790.",
    },
    {
      id: "3",
      img: "https://upload.wikimedia.org/wikipedia/en/0/03/Flag_of_Italy.svg",
      name: "Italia",
      population: "58.94 million",
      capital: "Rome",
      info: "Italy is a boot-shaped peninsula that juts out of southern Europe into the Adriatic Sea, Tyrrhenian Sea, Mediterranean Sea, and other waters. Its location has played an important role in its history.",
    },
    {
      id: "4",
      img: "https://cdn.britannica.com/25/4825-050-977D8C5E/Flag-United-Kingdom.jpg",
      name: "United Kingdom",
      population: "66.97 million",
      capital: "London",
      info: "The UK was an active member of the EU after its accession in 1973, although it chose to remain outside the Economic and Monetary Union. However, motivated in part by frustration at a remote bureaucracy in Brussels and massive migration into the country, UK citizens in 2016 voted by 52 to 48 percent to leave the EU. On 31 January 2020, the UK became the only country to depart the EU -- a move known as 'Brexit' -- after prolonged negotiations on EU-UK economic and security relationships.",
    },
    {
      id: "5",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Morocco.svg/800px-Flag_of_Morocco.svg.png",
      name: "Maroco",
      population: "37.46 million",
      capital: "Rabat",
      info: "In 788, about a century after the Arab conquest of North Africa, a series of Muslim dynasties began to rule in Morocco. In the 16th century, the Sa'adi monarchy, particularly under Ahmad al-MANSUR (1578-1603), repelled foreign invaders and inaugurated a golden age. The Alaouite Dynasty, to which the current Moroccan royal family belongs, dates from the 17th century. In 1860, Spain occupied northern Morocco and ushered in a half-century of trade rivalry among European powers that saw Morocco's sovereignty steadily erode; in 1912, the French imposed a protectorate over the country. A protracted independence struggle with France ended successfully in 1956. The internationalized city of Tangier and most Spanish possessions were turned over to the new country that same year. Sultan MOHAMMED V, the current monarch's grandfather, organized the new state as a constitutional monarchy and in 1957 assumed the title of king.",
    },
    {
      id: "6",
      img: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/800px-Flag_of_Germany.svg.png",
      name: "Germany",
      population: "83.8 million",
      capital: "Berlin",
      info: "As Europe's largest economy and second most-populous nation (after Russia), Germany is a key member of the continent's economic, political, and defense organizations. European power struggles immersed Germany in two devastating world wars in the first half of the 20th century and left the country occupied by the victorious Allied powers of the US, UK, France, and the Soviet Union in 1945. With the advent of the Cold War, two German states were formed in 1949: the western Federal Republic of Germany (FRG) and the eastern German Democratic Republic (GDR). The democratic FRG embedded itself in key western economic and security organizations, including the EC (now the EU) and NATO, while the communist GDR was on the front line of the Soviet-led Warsaw Pact. The decline of the Soviet Union and the end of the Cold War allowed German reunification to occur in 1990. Since then, Germany has expended considerable funds to bring eastern productivity and wages up to western standards. In January 1999, Germany and 10 other EU countries introduced a common European exchange currency, the euro.",
    },
  ];
  return (
    <div className={styles["cards-container"]}>
      {countries.map((item: Country) => (
        <div className={styles["card-div"]} key={item.id}>
          <CardHeader />
          <Link to={`/country/${item.id}`} state={{ country: item }}>
            <CardImg img={item.img} name={item.name} />
            <hr />
            <CardContent
              name={item.name}
              population={item.population}
              capital={item.capital}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
export default Card;
