import { httpClient } from '..';
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

type GetCountriesResponse = Country[];
type AddCountryResponse = Country;
type UpdateCountryResponse = Country;
type DeleteCountryResponse = Country;

// export const getCountries = async (): Promise<
//   GetCountriesResponse | undefined
// > => {
//   try {
//     const result = await httpClient.get<GetCountriesResponse>('/countries');
//     return result.data;
//   } catch (error) {
//     console.log('Error:', error);
//     throw new Error('Failed to fetch countries');
//   }
// };

// function getNextPageNumber(relType: string, pagination: string) {
//   const regex = new RegExp(`<[^>]*[?&]_page=(\\d+)[^>]*>; rel="${relType}"`);
//   const match = pagination.match(regex);
//   return match ? parseInt(match[1], 10) : null;
// }

// export const getCountries = async ({
//   page,
//   limit,
// }: {
//   page: number;
//   limit: number;
// }) => {
//   try {
//     const res = await httpClient.get<GetCountriesResponse>(
//       `/countries?_page=${page}&_limit=${limit}`
//     );
//     return {
//       rows: res.data,
//       nextOffset: res.data.length === limit ? page + 1 : null,
//     };
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const getSortedCountries = async (
//   name: string,
//   type: string
// ): Promise<GetCountriesResponse | undefined> => {
//   try {
//     const result = await httpClient.get<GetCountriesResponse>(
//       `/countries?_sort=${name}&_order=${type}`
//     );
//     return result.data;
//   } catch (error) {
//     console.error('Error fetching sorted countries:', error);

//     throw new Error('Failed to fetch sorted countries');
//   }
// };

export const getCountries = async ({
  page,
  limit,
  sortName = 'votes', // Default sorting field
  sortType = 'asc', // Default sorting order
}: {
  page: number;
  limit: number;
  sortName?: string;
  sortType?: string;
}) => {
  try {
    const queryString = `/countries?_page=${page}&_limit=${limit}&_sort=${sortName}&_order=${sortType}`;

    const res = await httpClient.get<GetCountriesResponse>(queryString);

    return {
      rows: res.data,
      nextOffset: res.data.length === limit ? page + 1 : null,
    };
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};

export const getCountryWithId = async (
  id: string
): Promise<Country | undefined> => {
  try {
    const result = await httpClient.get<Country>(`/countries/${id}`);
    return result.data;
  } catch (error) {
    console.error(`Error fetching country with id ${id}:`, error);
    throw new Error(`Failed to fetch country with id ${id}`);
  }
};
export const addCountry = async (
  countryData: Omit<Country, 'id' | 'isDeleted'>
): Promise<AddCountryResponse | undefined> => {
  try {
    const result = await httpClient.post<AddCountryResponse>(
      '/countries',
      countryData
    );
    return result.data;
  } catch (error) {
    console.error('Error adding country:', error);
    throw new Error('Failed to add country');
  }
};

export const updateCountry = async ({
  id,
  payload,
}: {
  id: string | null;
  payload: Partial<Omit<Country, 'id'>>;
}): Promise<UpdateCountryResponse | undefined> => {
  try {
    const result = await httpClient.patch<UpdateCountryResponse>(
      `/countries/${id}`,
      payload
    );
    return result.data;
  } catch (error) {
    console.error(`Error updating country with id ${id}:`, error);
    throw new Error(`Failed to update country with id ${id}`);
  }
};

export const deleteCountry = async (
  id: string
): Promise<DeleteCountryResponse | undefined> => {
  try {
    const result = await httpClient.delete<DeleteCountryResponse>(
      `/countries/${id}`
    );
    console.log('delete', result.data);
    return result.data;
  } catch (error) {
    console.error(`Error deleting country with id ${id}:`, error);
    throw new Error(`Failed to delete country with id ${id}`);
  }
};
