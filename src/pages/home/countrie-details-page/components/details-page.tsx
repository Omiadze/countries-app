import React, { useEffect, useState } from 'react';
import styles from './details.module.css';

import { useParams } from 'react-router-dom';
import axios from 'axios';
type Countries = {
  img: string;
  name: string;
  population: string;
  capital: string;
  info: string;
};
const DetailsPage: React.FC = () => {
  const [country, setCountry] = useState<Countries | null>(null);
  const { id } = useParams();
  console.log(id);
  // const location = useLocation();
  // const { country } = location.state;
  useEffect(() => {
    axios.get(`http://localhost:3000/countries/${id}`).then((res) => {
      console.log(res.data);
      setCountry(res.data);
    });
  }, [id]);
  if (!country) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles['details-container']}>
      <div className={styles['details-content']}>
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
