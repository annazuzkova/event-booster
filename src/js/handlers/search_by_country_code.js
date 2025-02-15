import { getEvents } from '../api/get_events.js';

import { renderEvents } from '../render/render_events.js';

import { saveParams, loadParams } from '../helpers/storage.js';

const select = document.querySelector('.form__select');
// import eventsTemplate from 'bundel-text:../../templates/events.hbs';

const API_KEY = 'A8TfknWuvAEesY78luj7BLu0h4tXEN6d';

export const habdleCountryChange = async event => {
  const params = loadParams();
  const countryCode = event.target.value;
  const data = await getEvents({ ...params, apiKey: API_KEY, countryCode });
};
export const addCountryHandler = searchInput => {
  if (searchInput) {
    searchInput.addEventListener('change', habdleCountryChange);
  }
};
