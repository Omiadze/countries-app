import React, { useState } from "react";
import styles from "./inputs.module.css";

type Country = {
  id: string;
  img: string;
  name: string;
  population: string;
  capital: string;
  info: string;
  votes: number;
};

type InputsProps = {
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
};
const Inputs: React.FC<InputsProps> = ({ setCountries }) => {
  const [addedCountry, setAddedCountry] = useState({
    id: "",
    img: "",
    name: "",
    population: "",
    capital: "",
    info: "",
    votes: 0,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setAddedCountry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCountries((prevCountries) => [
      ...prevCountries,
      { ...addedCountry, id: (prevCountries.length + 1).toString() },
    ]);
  };

  return (
    <div className={styles["country-form-div"]}>
      <form id="addCountryForm" onSubmit={handleOnSubmit}>
        <label>
          Add image url :
          <input type="text" name="img" onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Enter country name:
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Enter population:
          <input
            type="text"
            name="population"
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Enter country info:
          <input type="text" name="info" onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Enter capital name:
          <input
            type="text"
            name="capital"
            onChange={handleInputChange}
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
