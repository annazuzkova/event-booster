import { getEvents } from './api/get_events';
import { renderEvents } from './render/render_events';
import { addPaginationHanlder } from './handlers/pagination__handler';
import { renderButtons } from './render/renderPagination';
import eventsTemplate from 'bundle-text:../templates/events.hbs';

import { API_KEY } from './config'; //замінити ключ на ключ тімліда

import { renderCountrie } from './render/render_country_option';
import { addCountryHandler } from './handlers/search_by_country_code';
import { addSearchHandlers } from './handlers/search_by_keyword';



const selectCountry = document.querySelector('[data-select_couuntry]');
const eventContainer = document.querySelector('[data-events]');
const paginationContainer = document.querySelector('[data-pagination]');

const eventSearch = document.querySelector('[data-search]');


const app = async () => {
  renderCountrie();
  const data = await getEvents({
    currentPage: 0,
    perPage: 20,
    apiKey: API_KEY,
  });

  renderEvents(data.events, eventContainer, eventsTemplate);
  await renderButtons(data.page.number, data.page.totalPages, paginationContainer);

  await addSearchHandlers(eventSearch);
  addCountryHandler(selectCountry);
  addPaginationHanlder(paginationContainer);
};

app();

