import { getEvents } from './api/get_events';
import { renderEvents } from './render/render_events';
import eventsTemplate from 'bundle-text:../templates/events.hbs';
const API_KEY = 'A8TfknWuvAEesY78luj7BLu0h4tXEN6d'; //замінити ключ на ключ тімліда

const eventContainer = document.querySelector('[data-events]');

const app = async () => {
  const data = await getEvents({
    currentPage: 0,
    perPage: 20,
    apiKey: API_KEY,
  });
  renderEvents(data.events, eventContainer, eventsTemplate);
};

app();
