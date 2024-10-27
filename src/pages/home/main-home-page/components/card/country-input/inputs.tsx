// import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import styles from './inputs.module.css';
import { useState } from 'react';
// import { useState } from "react";

type MyFormProps = {
  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputErrorMessage: string;
  name: string;
  population: string;
  capital: string;
  info: string;
  nameKa: string;
  capitalKa: string;
  infoKa: string;
};
const Inputs: React.FC<MyFormProps> = ({
  handleOnSubmit,
  handleOnChange,
  inputErrorMessage,
  name,
  population,
  capital,
  info,
  nameKa,
  capitalKa,
  infoKa,
}) => {
  const { lang } = useParams();
  const [langTab, setLangTab] = useState(lang);
  // functions for Georgian and english Input fields...
  const handleKaBtn = () => {
    setLangTab('ka');
  };
  const handleEngBtn = () => {
    setLangTab('eng');
  };

  return (
    <div className={styles['country-form-div']}>
      <h1>
        {lang === 'eng' ? 'Add Your Favorite Country' : 'შენი ფავორიტი ქვეყანა'}
      </h1>
      <div className={styles.langTabBtns}>
        <button className={styles.langTabBtn} onClick={handleKaBtn}>
          {lang === 'eng' ? 'Georgian' : 'ქართული'}
        </button>
        <button className={styles.langTabBtn} onClick={handleEngBtn}>
          {' '}
          {lang === 'eng' ? 'English' : 'ინგლისური'}
        </button>
      </div>
      <form id="addCountryForm" onSubmit={handleOnSubmit}>
        <label>
          {langTab === 'eng'
            ? 'Add image (JPG, JPEG or PNG):'
            : 'დაამატე სურათი (JPG, JPEG ან PNG)'}
          <input
            type="file"
            name="img"
            accept=".jpg, .jpeg, .png"
            onChange={handleOnChange}
            required
          />
        </label>
        <br />

        {/* english inputs */}
        <div className={langTab === 'eng' ? styles.visible : styles.invisible}>
          <label>
            "Enter country name:"
            <input
              type="text"
              value={name}
              name="name"
              onChange={handleOnChange}
              required
            />
          </label>
          <p>{inputErrorMessage}</p>
          <br />
          <label>
            "Enter country info:"
            <input
              type="text"
              value={info}
              onChange={handleOnChange}
              name="info"
            />
          </label>
          <br />
          <label>
            "Enter capital name:"
            <input
              type="text"
              value={capital}
              name="capital"
              onChange={handleOnChange}
              required
            />
          </label>
          <br />
        </div>

        {/* Georgian Inputs */}
        <div className={langTab === 'ka' ? styles.visible : styles.invisible}>
          <label>
            "ჩაწერე ქვეყნის სახელი"
            <input
              type="text"
              value={nameKa}
              name="nameKa"
              onChange={handleOnChange}
              required
            />
          </label>
          <p>{inputErrorMessage}</p>
          <br />
          <label>
            "ჩაწერე ქვეყნის ინფორმაცია"
            <input
              type="text"
              value={infoKa}
              onChange={handleOnChange}
              name="infoKa"
            />
          </label>
          <br />
          <label>
            "ჩაწერე ქვეყნის დედაქალაქი"
            <input
              type="text"
              value={capitalKa}
              name="capitalKa"
              onChange={handleOnChange}
              required
            />
          </label>
          <br />
        </div>

        <label>
          {langTab === 'eng' ? 'Enter population:' : 'ჩაწერე მოსახლეობა'}
          <input
            type="text"
            value={population}
            name="population"
            onChange={handleOnChange}
            required
          />
        </label>
        <br />
        <button className={styles['submit-btn']} type="submit" value="Submit">
          {lang === 'eng' ? 'ADD' : 'დაამატე'}
        </button>
      </form>
    </div>
  );
};

export default Inputs;
