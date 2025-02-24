import { getEvents } from './api/get_events';
import { getEvent } from './api/get_event';
import { renderEvents } from './render/render_events';

import { renderEvent } from './render/render.event';



import { addPaginationHanlder } from './handlers/pagination__handler';
import { renderButtons } from './render/renderPagination';
import { renderCountrie } from './render/render_country_option';
import { addCountryHandler } from './handlers/search_by_country_code';
import { addSearchHandlers } from './handlers/search_by_keyword';
import { addClearHandlers } from './handlers/clear_filters';
import { showClearFilterBtn } from './helpers/show_clear-filters';
import { loadParams } from './helpers/storage';
import eventsTemplate from 'bundle-text:../templates/events.hbs';
import eventsTemplate from 'bundle-text:../templates/events.hbs';
import eventTemplate from 'bundle-text:../templates/modal-card.hbs';

import { API_KEY } from './config';

const selectCountry = document.querySelector('[data-select_country]');
const eventContainer = document.querySelector('[data-events]');
const paginationContainer = document.querySelector('[data-pagination]');
const eventSearch = document.querySelector('[data-search]');

const app = async () => {
  renderCountrie();
  showClearFilterBtn();

  const params = loadParams();

  if (params.keyword && eventSearch) {
    eventSearch.value = params.keyword.split('+').join(' ');
  }

  if (params.countryCode && selectCountry) {
    selectCountry.value = params.countryCode;
  }

  const data = await getEvents({
    ...params,
    apiKey: API_KEY,
  });

  renderEvents(data.events, eventContainer, eventsTemplate);

  await renderButtons(
    data.page.number,
    data.page.totalPages,
    paginationContainer
  );

  addSearchHandlers(eventSearch);
  addCountryHandler(selectCountry);
  addPaginationHanlder(paginationContainer);
  addClearHandlers();
};

app();

const eventsList = document.querySelector('.events__list');
const buttonClose = document.querySelector('.modal__close');
eventsList.addEventListener('click', async event => {
  const eventElement = event.target.closest('.event');

  if (eventElement.classList.contains('event')) {
    const id = eventElement.dataset.event_id;

    const data = await getEvent({
      id: id,
      apiKey: API_KEY,
    });

    renderEvent(data.event, eventTemplate);
  }
});
