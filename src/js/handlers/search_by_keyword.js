import { getEvents } from '../api/get_events';
import { renderEvents } from '../render/render_events';
import { saveParams, loadParams } from '../helpers/storage';
import { renderButtons } from '../render/renderPagination';
import { showClearFilterBtn } from '../helpers/show_clear-filters';
import { debounce } from 'lodash';
import eventsTemplate from 'bundle-text:../../templates/events.hbs';

import { API_KEY } from '../config';

const paginationContainer = document.querySelector('[data-pagination]');
const eventContainer = document.querySelector('[data-events]');

export const handleSearch = async event => {
  const searchQuery = event.target.value.trim();
  const keyWords = searchQuery.split(' ').join('+');

  const storageParams = loadParams();

  const data = await getEvents({
    ...storageParams,
    apiKey: API_KEY,
    keyword: keyWords,
    currentPage: 0,
  });

  saveParams({ ...storageParams, keyword: keyWords });

  renderEvents(data.events, eventContainer, eventsTemplate);
  await renderButtons(
    data.page.number,
    data.page.totalPages,
    paginationContainer
  );
  showClearFilterBtn();
};
export const addSearchHandlers = searchInput => {
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 1000));
  }
};
