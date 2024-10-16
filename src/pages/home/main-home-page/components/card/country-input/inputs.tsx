// import React, { useState } from "react";
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
  return (
    <div className={styles["country-form-div"]}>
      <h1>Add Your Favorite Country</h1>
      <form id="addCountryForm" onSubmit={handleOnSubmit}>
        <label>
          Add image url :
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
          Enter country name:
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
          Enter population:
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
          Enter country info:
          <input
            type="text"
            value={info}
            onChange={handleOnChange}
            name="info"
          />
        </label>
        <br />
        <label>
          Enter capital name:
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
          ADD
        </button>
      </form>
    </div>
  );
};

export default Inputs;
