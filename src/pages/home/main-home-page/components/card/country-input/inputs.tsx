// import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./inputs.module.css";

type MyFormProps = {
  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputErrorMessage: string;
  img: string;
  name: string;
  population: string;
  capital: string;
  info: string;
};
const Inputs: React.FC<MyFormProps> = ({
  handleOnSubmit,
  handleOnChange,
  inputErrorMessage,
  img,
  name,
  population,
  capital,
  info,
}) => {
  const { lang } = useParams();
  return (
    <div className={styles["country-form-div"]}>
      <h1>
        {lang === "eng" ? "Add Your Favorite Country" : "შენი ფავორიტი ქვეყანა"}
      </h1>
      <form id="addCountryForm" onSubmit={handleOnSubmit}>
        <label>
          {lang === "eng" ? "Add image url :" : "დაამატე სურათის URL"}
          <input
            type="text"
            value={img}
            name="img"
            onChange={handleOnChange}
            required
          />
        </label>
        <br />
        <label>
          {lang === "eng" ? "Enter country name:" : "ჩაწერე ქვეყნის სახელი"}
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
          {lang === "eng" ? "Enter population:" : "ჩაწერე მოსახლეობა"}
          <input
            type="text"
            value={population}
            name="population"
            onChange={handleOnChange}
            required
          />
        </label>
        <br />
        <label>
          {lang === "eng" ? "Enter country info:" : "ჩაწერე ქვეყნის ინფორმაცია"}
          <input
            type="text"
            value={info}
            onChange={handleOnChange}
            name="info"
          />
        </label>
        <br />
        <label>
          {lang === "eng" ? "Enter capital name:" : "ჩაწერე ქვეყნის დედაქალაქი"}
          <input
            type="text"
            value={capital}
            name="capital"
            onChange={handleOnChange}
            required
          />
        </label>
        <br />
        <button className={styles["submit-btn"]} type="submit" value="Submit">
          {lang === "eng" ? "ADD" : "დაამატე"}
        </button>
      </form>
    </div>
  );
};

export default Inputs;
