import fs from 'fs';
import axios from 'axios';

function seedDataBase() {
  axios.get('https://restcountries.com/v3.1/all').then((res) => {
    const existingData = JSON.parse(fs.readFileSync('db.json'));
    const existingCountries = existingData.countries;
    let length = existingCountries.length;

    const otherCountriesData = res.data;
    const mapNewData = otherCountriesData.map((country, index) => ({
      id: (length + index + 1).toString(),
      img: country.flags?.png || '',
      name: country.name?.common || '',
      population: country.population.toString(),
      capital: country.capital?.[0] || '',
      info: `some info about ${country.name?.common}`,
      votes: 0,
      isDeleted: false,
      nameKa: '',
      capitalKa: '',
      infoKa: `ინფორმაცია ${country.name?.common} შესახებ`,
    }));

    const updateCountriesWithOldAndNewData = {
      countries: [...existingCountries, ...mapNewData],
    };
    fs.writeFileSync(
      'db.json',
      JSON.stringify(updateCountriesWithOldAndNewData, null, 2)
    );
    console.log('Updated');
  });
}

seedDataBase();
