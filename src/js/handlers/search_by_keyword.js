import { getEvents } from '../api/get_events';
import { renderEvents } from '../render/render_events';
import { saveParams, loadParams } from '../helpers/storage';
import { debounce } from 'lodash';
import eventsTemplate from 'bundle-text:../../templates/events.hbs';

export const handleSearch = async event => {
  //код обробки
};
export const addSearchHandlers = searchInput => {
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearch, 1500));
  }
};
