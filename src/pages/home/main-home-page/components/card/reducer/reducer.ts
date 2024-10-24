//defining types so typescript does not yell
interface Country {
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
}

type Action =
  | {
      type: "onvote";
      payload: {
        id: string;
        // removedItems: string[];
      };
    }
  | {
      type: "sort";
      payload: {
        // removedItems: string[];
        sortType: "increasing" | "decreasing";
      };
    }
  | {
      type: "add";
      payload: {
        countryObj: Omit<Country, "id" | "votes" | "isDeleted">;
      };
    }
  | {
      type: "delete";
      payload: {
        id: string;
      };
    }
  | {
      type: "undo";
      payload: { id: string };
    }
  | {
      type: "search";
      payload: { value: string };
    };

export const countriesReducer = (
  countriesInitialState: Country[],
  action: Action
): Country[] => {
  if (action.type === "onvote") {
    // console.log(!action.payload.removedItems.includes(action.payload.id));
    const updatedInitialState = countriesInitialState.map((country) =>
      !country.isDeleted && country.id === action.payload.id
        ? { ...country, votes: country.votes + 1 }
        : country
    );
    // console.log(updatedInitialState);
    return updatedInitialState;
  }
  if (action.type === "sort") {
    const nonDeletedCountries = countriesInitialState.filter(
      (country) => !country.isDeleted
    );
    const deletedCountries = countriesInitialState.filter(
      (country) => country.isDeleted
    );
    console.log(nonDeletedCountries);
    const sortedNonDeltetedCountries = [...nonDeletedCountries].sort((a, b) =>
      action.payload.sortType === "increasing"
        ? a.votes - b.votes
        : b.votes - a.votes
    );

    return [...sortedNonDeltetedCountries, ...deletedCountries];
  }
  if (action.type === "add") {
    const newCountry = {
      ...action.payload.countryObj,
      votes: 0,
      id: (countriesInitialState.length + 1).toString(),
      isDeleted: false,
    };
    console.log([...countriesInitialState, newCountry]);
    return [...countriesInitialState, newCountry];
  }
  if (action.type === "delete") {
    return countriesInitialState.map((country) =>
      country.id === action.payload.id
        ? { ...country, isDeleted: true }
        : country
    );
  }
  if (action.type === "undo") {
    return countriesInitialState.map((country) =>
      country.id === action.payload.id
        ? { ...country, isDeleted: false }
        : country
    );
  }
  if (action.type === "search") {
    console.log(action.payload.value);
    // this function is not finished yet
    const copyCountryState = [...countriesInitialState];
    console.log(copyCountryState);
    const updatedInitialState = copyCountryState.filter((country) =>
      country.name.toLowerCase().includes(action.payload.value)
    );
    return updatedInitialState;
  }

  return countriesInitialState;
};
