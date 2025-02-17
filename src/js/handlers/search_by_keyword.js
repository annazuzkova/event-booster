import { getEvents } from '../api/get_events';
import { renderEvents } from '../render/render_events';
import { saveParams, loadParams } from '../helpers/storage';
import { debounce } from 'lodash';
import eventsTemplate from 'bundle-text:../../templates/events.hbs';
import { API_KEY } from '../app';

export const handleSearch = async event => {
  //код обробки
  const searchQuery = event.target.value.trim();
  const keyWords = searchQuery.split(' ').join('%20');
  const eventContainer = document.querySelector('[data-events]');
  const storageParams = loadParams();
  const data = await getEvents({
    ...storageParams,
    apiKey: API_KEY,
    keyword: keyWords,
  });
  saveParams({ ...storageParams, keyword: keyWords });

  renderEvents(data.events, eventContainer, eventsTemplate);
};
export const addSearchHandlers = async searchInput => {
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 500));
  }
};
