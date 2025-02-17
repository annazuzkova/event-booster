import { getEvents } from '../api/get_events.js';

import { renderEvents } from '../render/render_events.js';

import { saveParams, loadParams } from '../helpers/storage.js';
const eventContainer = document.querySelector('[data-events]');

const select = document.querySelector('.form__select');
import eventsTemplate from 'bundle-text:../../templates/events.hbs';

const API_KEY = 'A8TfknWuvAEesY78luj7BLu0h4tXEN6d';

export const habdleCountryChange = async event => {
  const countryCode = event.target.value;
  const params = loadParams();
  try {
    if (countryCode) {
      const data = await getEvents({ ...params, apiKey: API_KEY, countryCode });
      saveParams({ ...params, countryCode });
      renderEvents(data.events, eventContainer, eventsTemplate);
    }
  } catch (error) {
    console.error('Error finding events:', error);
    container.innerHTML =
      '<p class="error-message__wrong">Something went wrong.</p>';
  }
};
export const addCountryHandler = searchSelect => {
  if (searchSelect) {
    searchSelect.addEventListener('change', habdleCountryChange);
  }
};
