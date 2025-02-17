import { getEvents } from './api/get_events';
import { renderEvents } from './render/render_events';
import eventsTemplate from 'bundle-text:../templates/events.hbs';
import { renderCountrie } from './render/render_country_option';
import { addCountryHandler } from './handlers/search_by_country_code';
const API_KEY = 'A8TfknWuvAEesY78luj7BLu0h4tXEN6d'; //замінити ключ на ключ тімліда
const select = document.querySelector('.form__select');

const eventContainer = document.querySelector('[data-events]');
renderCountrie();
const app = async () => {
  const data = await getEvents({
    currentPage: 0,
    perPage: 20,
    apiKey: API_KEY,
  });
  renderEvents(data.events, eventContainer, eventsTemplate);
};

app();
addCountryHandler(select);
