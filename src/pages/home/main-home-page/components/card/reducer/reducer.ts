//defining types so typescript does not yell
interface Country {
  id: string;
  img: string;
  name: string;
  population: string;
  capital: string;
  info: string;
  votes: number;
}

type Action =
  | {
      type: "onvote";
      payload: {
        id: string;
        removedItems: string[];
      };
    }
  | {
      type: "sort";
      payload: {
        removedItems: string[];
        sortType: "increasing" | "decreasing";
      };
    }
  | {
      type: "add";
      payload: {
        countryObj: Omit<Country, "id" | "votes">;
        removedItems: string[];
      };
    }
  | {
      type: "delete";
      payload: {
        id: string;
      };
    };

export const countriesReducer = (
  countriesInitialState: Country[],
  action: Action
): Country[] => {
  if (action.type === "onvote") {
    console.log(!action.payload.removedItems.includes(action.payload.id));
    const updatedInitialState = countriesInitialState.map((country) =>
      !action.payload.removedItems.includes(action.payload.id) &&
      country.id === action.payload.id
        ? { ...country, votes: country.votes + 1 }
        : country
    );
    return updatedInitialState;
  }
  if (action.type === "sort") {
    const nonDeletedCountries = countriesInitialState.filter(
      (country) => !action.payload.removedItems.includes(country.id)
    );
    const sortedNonDeltetedCountries = [...nonDeletedCountries].sort((a, b) =>
      action.payload.sortType === "increasing"
        ? a.votes - b.votes
        : b.votes - a.votes
    );
    const deletedCountries = countriesInitialState.filter((country) =>
      action.payload.removedItems.includes(country.id)
    );
    return [...sortedNonDeltetedCountries, ...deletedCountries];
  }
  if (action.type === "add") {
    const nonDeletedCountries = countriesInitialState.filter(
      (country) => !action.payload.removedItems.includes(country.id)
    );
    const updateCountryArray = [
      ...nonDeletedCountries,
      {
        ...action.payload.countryObj,
        votes: 0,
        id: (countriesInitialState.length + 1).toString(),
      },
    ];
    const deletedCountries = countriesInitialState.filter((country) =>
      action.payload.removedItems.includes(country.id)
    );
    return [...updateCountryArray, ...deletedCountries];
  }
  if (action.type === "delete") {
    const clickedItem = countriesInitialState.find(
      (item) => item.id === action.payload.id
    );
    const newState = countriesInitialState.filter(
      (item) => item.id !== action.payload.id
    );
    return clickedItem ? [...newState, clickedItem] : newState;
  }
  return countriesInitialState;
};
