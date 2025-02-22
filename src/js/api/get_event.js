import { formatEvent } from '../helpers/format_event';
export const getEvent = async (params = {}) => {
  const { id, apiKey } = params; //деструктуризація параметрів з присвоєнням дефолтних значень, якщо вони незаданні
  const queryParams = new URLSearchParams({
    id: id,
    apikey: apiKey,
  }); // Обов'язкові араметри запиту

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?${queryParams}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Помилка при запиті івенту: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return formatEvent(data); // Формуємо об'єкт з інформацією про пагінацію та списком івентів за допомогою функції formatEvents та повертаємо його
  } catch (error) {
    console.error('Помилка при отримані івенту', error);
    return {};
  }
};
