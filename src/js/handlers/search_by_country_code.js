import { getEvents } from '../api/get_events.js';
import { renderEvents } from '../render/render_events.js';
import { saveParams, loadParams } from '../helpers/storage.js';
import { renderButtons } from '../render/renderPagination.js';
import { showClearFilterBtn } from '../helpers/show_clear-filters.js';
import eventsTemplate from 'bundle-text:../../templates/events.hbs';
import { API_KEY } from '../config.js';

const eventContainer = document.querySelector('[data-events]');
const paginationContainer = document.querySelector('[data-pagination]');

export const habdleCountryChange = async event => {
  const countryCode = event.target.value;
  const params = loadParams();
  try {
    if (countryCode) {
      const data = await getEvents({
        ...params,
        apiKey: API_KEY,
        countryCode,
        currentPage: 0,
      });

      saveParams({ ...params, countryCode });

      renderEvents(data.events, eventContainer, eventsTemplate);
      await renderButtons(
        data.page.number,
        data.page.totalPages,
        paginationContainer
      );
    }
    showClearFilterBtn();
  } catch (error) {
    console.error('Error finding events:', error);
  }
};
export const addCountryHandler = searchSelect => {
  if (searchSelect) {
    searchSelect.addEventListener('change', habdleCountryChange);
  }
};
