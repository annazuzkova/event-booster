import Handlebars from 'handlebars';
export const renderEvents = async (events, container, template) => {
  try {
    // Перевіряємо наявність контейнера
    if (!container) {
      throw new Error('Container element not found');
    }
    // Перевіряємо наявність шаблону
    if (!template) {
      throw new Error('Template not provided');
    }
    const errorMessage = container.previousElementSibling;
    // Перевіряємо наявність подій
    if (errorMessage) {
      errorMessage.remove();
    }
    if (!events || events.length === 0) {
      if (!errorMessage) {
        container.insertAdjacentHTML(
          'beforebegin',
          '<p class="error-message__not-found">Oops... No events found</p>'
        );
        container.innerHTML = '';
        return;
      }
    }

    const templateEvents = Handlebars.compile(template); // Компілюємо шаблон Handlebars

    const html = templateEvents(events); // Генеруємо HTML з подій

    container.innerHTML = html;
  } catch (error) {
    console.error('Error rendering events:', error);
    container.innerHTML =
      '<p class="error-message__wrong">Something went wrong.</p>';
  }
};
