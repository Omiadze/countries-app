import React, { useContext, useReducer, useState } from "react";
import { CardContent } from "@/pages/home/main-home-page/components/card/content";
import { CardHeader } from "@/pages/home/main-home-page/components/card/header";
import { CardImg } from "@/pages/home/main-home-page/components/card/image";
import styles from "@/pages/home/main-home-page/components/card/card.module.css";
import { Link } from "react-router-dom";
import Inputs from "./country-input/inputs";
import { countriesReducer } from "./reducer/reducer";
import { countriesInitialState } from "./reducer/state";
import { LangContext } from "@/layout";

type Country = {
  id: string;
  img: string;
  name: string;
  population: string;
  capital: string;
  info: string;
  votes: number;
  isDeleted: boolean;
  nameKa: string;
  infoKa: string;
  capitalKa: string;
};

const Card: React.FC = () => {
  // usestates
  const { currentLang } = useContext(LangContext);
  const [textInput, setTextInput] = useState("");
  const [inputErrorMessage, setInputErrorMessage] = useState<string>("");
  const [addNewCountry, setAddNewCountry] = useState({
    img: "",
    name: "",
    population: "",
    capital: "",
    info: "",
    nameKa: "",
    capitalKa: "",
    infoKa: "",
  });
  // useReducer
  const [countries, dispatch] = useReducer(
    countriesReducer,
    countriesInitialState
  );

  // mutacias vuketebt Chvens country array-is, (handeling votes), am funcias vawvdit header components, imitom rom iq gvaqvs BTN, raze daCLICKis drosac viyenebt am funcias
  const handleVote = (id: string) => {
    dispatch({
      type: "onvote",
      payload: {
        id,
      },
    });
  };

  const sortCountriesByHearts = (sortType: "increasing" | "decreasing") => {
    dispatch({ type: "sort", payload: { sortType } });
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "name" && value.length > 10) {
      setInputErrorMessage("The name should not be longer than 10 letters");
    } else {
      setInputErrorMessage("");
      setAddNewCountry((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const countryObj: Omit<Country, "id" | "votes" | "isDeleted"> = {
      img: "",
      name: "",
      population: "",
      capital: "",
      info: "",
      nameKa: "",
      infoKa: "",
      capitalKa: "",
    };

    for (const [key, value] of formData) {
      // if key is image convert my image files to base64
      if (key === "img") {
        const file = value as File;
        const base64String = await convertToBase64(file);
        countryObj.img = base64String;
      } else {
        countryObj[key as keyof Omit<Country, "id" | "votes" | "isDeleted">] =
          value as string;
      }
    }

    console.log("Country Object:", countryObj);

    dispatch({ type: "add", payload: { countryObj } });

    // Reset
    setAddNewCountry({
      img: "",
      name: "",
      population: "",
      capital: "",
      info: "",
      nameKa: "",
      capitalKa: "",
      infoKa: "",
    });
  };
  //
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUndo = (id: string) => {
    dispatch({ type: "undo", payload: { id } });
  };

  const handleDelete = (id: string) => {
    const country = countries.find((country) => country.id === id);

    // If the country is already deleted, undo the delete
    if (country && country.isDeleted) {
      handleUndo(id);
    } else {
      dispatch({ type: "delete", payload: { id } });
    }
  };
  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTextInput(value);
    dispatch({ type: "search", payload: { value } });
  };

  return (
    <div>
      <div className={styles["sort-btn-div"]}>
        <button
          onClick={() => sortCountriesByHearts("increasing")}
          className={styles.sortBtn}
        >
          {currentLang === "eng"
            ? "Sort by HEART (Increasing)"
            : "დალაგება გულების მიხედვით (ზრდადობით)"}
        </button>
        <button
          onClick={() => sortCountriesByHearts("decreasing")}
          className={styles.sortBtn}
        >
          {currentLang === "eng"
            ? "Sort by HEART (Decreasing)"
            : "დალაგება გულების მიხედვით (კლებადობით)"}
        </button>
      </div>
      <div className={styles["search-div"]}>
        <form id="searchForm">
          <input type="text" value={textInput} onChange={onSearchChange} />
          <button type="submit">
            {currentLang === "eng" ? "Clear Search" : "ძიების გასუფთავება"}
          </button>
        </form>
      </div>
      <div className={styles["cards-container"]}>
        {countries
          .sort((a, b) =>
            a.isDeleted === b.isDeleted ? 0 : a.isDeleted ? 1 : -1
          )
          .map((item: Country) => (
            <div
              className={
                item.isDeleted ? styles["removed-card-div"] : styles["card-div"]
              }
              key={item.id}
            >
              <CardHeader
                votes={item.votes}
                onVote={() => handleVote(item.id)}
              />
              <Link to={`/ka/country/${item.id}`} state={{ country: item }}>
                <CardImg img={item.img} name={item.name} />
                <hr />
                <CardContent
                  name={currentLang === "eng" ? item.name : item.nameKa}
                  population={item.population}
                  capital={
                    currentLang === "eng" ? item.capital : item.capitalKa
                  }
                />
              </Link>

              <button
                className={styles["delete-btn"]}
                onClick={() => handleDelete(item.id)}
              >
                {currentLang === "eng"
                  ? `${item.isDeleted ? "undo" : "Delete"}`
                  : `${item.isDeleted ? "დაბრუნება" : "წაშლა"}`}
              </button>
            </div>
          ))}
      </div>
      <div>
        <Inputs
          handleOnSubmit={handleOnSubmit}
          handleOnChange={handleOnChange}
          inputErrorMessage={inputErrorMessage}
          name={addNewCountry.name}
          population={addNewCountry.population}
          capital={addNewCountry.capital}
          info={addNewCountry.info}
          nameKa={addNewCountry.nameKa}
          capitalKa={addNewCountry.capitalKa}
          infoKa={addNewCountry.infoKa}
        />
      </div>
    </div>
  );
};
export default Card;
