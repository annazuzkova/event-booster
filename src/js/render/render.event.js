import Handlebars from 'handlebars';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
const wrapper = document.querySelector('.wrapper');
export const renderEvent = async (event, template) => {
  try {
    // Перевіряємо наявність шаблону
    if (!template) {
      throw new Error('Template not provided');
    }
    // Перевіряємо наявність подій
    if (!event || event.length === 0) {
      const instance = basicLightbox.create(
        '<p class="error-message__not-found">Oops... No event found</p>'
      );
      instance.show();
      return;
    }
    const templateEvent = Handlebars.compile(template); // Компілюємо шаблон Handlebars

    const html = templateEvent(event); // Генеруємо HTML з подій

    const instance = basicLightbox.create(html);
    instance.show();
    document.body.classList.add('no-scroll');

    const buttonClose = document.querySelector('.modal__close');

    const handleClose = function () {
      instance.close();
      document.body.classList.remove('no-scroll');
      buttonClose.removeEventListener('click', handleClose);
    };
    buttonClose.addEventListener('click', handleClose);

    document.body.addEventListener('click', event => {
      if (event.target.classList.contains('basicLightbox')) {
        document.body.classList.remove('no-scroll');
      }
    });
  } catch (error) {
    console.error('Error rendering events:', error);
  }
};
