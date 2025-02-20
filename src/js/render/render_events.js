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
    // Перевіряємо наявність подій
    if (!events || events.length === 0) {
      container.innerHTML =
        '<p class="error-message__not-found">Oops... No events found</p>';

      return;
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
