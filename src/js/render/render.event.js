import Handlebars from 'handlebars';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
export const renderEvent = async (event, template) => {
  try {
    // Перевіряємо наявність контейнера
    // if (!container) {
    //   throw new Error('Container element not found');
    // }
    // Перевіряємо наявність шаблону
    if (!template) {
      throw new Error('Template not provided');
    }
    // Перевіряємо наявність подій
    if (!event || event.length === 0) {
      container.insertAdjacentHTML(
        'beforebegin',
        '<p class="error-message__not-found">Oops... No events found</p>'
      );
      return;
    }
    const templateEvent = Handlebars.compile(template); // Компілюємо шаблон Handlebars

    const html = templateEvent(event); // Генеруємо HTML з подій

    const instance = basicLightbox.create(html);
    instance.show();
  } catch (error) {
    console.error('Error rendering events:', error);
    const instance =
      '<p class="error-message__wrong">Something went wrong.</p>';
    instance.show();
  }
};
