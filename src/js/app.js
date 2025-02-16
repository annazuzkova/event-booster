import { getEvents } from './api/get_events';
import { getEvent } from './api/get_event';
import { renderEvents } from './render/render_events';
import { renderEvent } from './render/render.event';
import eventsTemplate from 'bundle-text:../templates/events.hbs';
import eventTemplate from 'bundle-text:../templates/modal-card.hbs';
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

const modalShow = async event => {
  if (event.target.classList.contains(event)) {
    const id = event.target.dataset.event_id;
    const data = await getEvent({
      id: id,
      apiKey: API_KEY,
    });
    renderEvent(data.event, eventTemplate);
  }
};

const eventsList = document.querySelector('.events__list');
eventsList.addEventListener('click', modalShow);
