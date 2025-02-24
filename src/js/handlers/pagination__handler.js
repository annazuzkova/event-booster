import { saveParams, loadParams } from '../helpers/storage';
import { getEvents } from '../api/get_events';
import { renderButtons } from '../render/renderPagination';
import { renderEvents } from '../render/render_events';
import eventsTemplate from 'bundle-text:../../templates/events.hbs';
import { API_KEY } from '../config';

export const paginationHandler = async event => {
  if (event.target.tagName === 'BUTTON') {
    const eventContainer = document.querySelector('[data-events]');
    const paginationContainer = document.querySelector('[data-pagination]');

    const storageParams = loadParams();

    const currentPage = event.target.dataset.page;
    const data = await getEvents({
      ...storageParams,
      apiKey: API_KEY,
      currentPage,
    });
    saveParams({ ...storageParams, currentPage });

    renderEvents(data.events, eventContainer, eventsTemplate);
    renderButtons(data.page.number, data.page.totalPages, paginationContainer);
  }
};

export const addPaginationHanlder = container => {
  container.addEventListener('click', paginationHandler);
};
