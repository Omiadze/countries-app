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

export const getCountries = async (): Promise<
  GetCountriesResponse | undefined
> => {
  try {
    const result = await httpClient.get<GetCountriesResponse>('/countries');
    return result.data;
  } catch (error) {
    console.log('Error:', error);
  }
};

export const getSortedCountries = async (
  name: string,
  type: string
): Promise<GetCountriesResponse | undefined> => {
  try {
    const result = await httpClient.get<GetCountriesResponse>(
      `/countries?_sort=${name}&_order=${type}`
    );
    return result.data;
  } catch (error) {
    console.log('Error:', error);
    return undefined;
  }
};
export const getCountryWithId = async (
  id: string
): Promise<Country | undefined> => {
  try {
    const result = await httpClient.get<Country>(`/countries/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
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
    console.log('Error:', error);
  }
};
