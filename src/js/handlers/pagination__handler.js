import { saveParams, loadParams } from '../helpers/storage';
import { getEvents } from '../api/get_events';
import { renderButtons } from '../render/renderPagination';
import { renderEvents } from '../render/render_events';
const API_KEY = 'A8TfknWuvAEesY78luj7BLu0h4tXEN6d';

export const paginationHandler = async event => {
  if (event.target.tagName === 'BUTTON') {
    container.innerHTML = '';

    const storageParams = loadParams();

    const currentPage = event.target.dataset.page;
    const data = await getEvents({
      ...storageParams,
      apiKey: API_KEY,
      currentPage,
    });

    console.log(data);

    page = Number(event.target.dataset.page);
    storageParams.set('_page', page);
    saveParams(storageParams);

    const params = new URLSearchParams(storageParams);
    const events = await getEvents(params);

    renderEvents(events, container, template);
  }
};

export const addPaginationHanlder = container => {
  container.addEventListener('click', paginationHandler);
};
