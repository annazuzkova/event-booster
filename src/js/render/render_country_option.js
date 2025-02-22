import Handlebars from 'handlebars';

import countriesTeemplate from 'bundle-text:../../templates/countries.hbs';

import countries from '../helpers/countries.js';
const select = document.querySelector('.form__select');
export const renderCountrie = () => {
  const temaplateCountries = Handlebars.compile(countriesTeemplate);
  const html = temaplateCountries(countries);
  select.innerHTML = html;
};
