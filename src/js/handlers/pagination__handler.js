import { saveParams, loadParams } from '../helpers/storage';
import { getEvents } from '../api/get_events';
import { createButtons } from '../render/renderPagination';
import { renderEvents } from '../render/render_events';

export const paginationHandler = async (container, template) => {
  const storageParams = new URLSearchParams(loadParams());
  const { currentPage, perPage } = storageParams;
  container.innerHTML = '';
  container.insertAdjacentHTML(
    'beforeend',
    createButtons(currentPage, perPage)
  );

  container.addEventListener('click', async event => {
    if (event.target.tagName === 'BUTTON') {
      page = Number(event.target.dataset.page);
      storageParams.set('_page', page);
      saveParams(storageParams);

      const events = await getEvents(params);

      renderEvents(events, container, template);
    }
  });
};
