import { formatEvents } from '../helpers/format_events';
export const getEvents = async (params = {}) => {
  const {
    currentPage = 0,
    perPage = 20,
    apiKey,
    keyword,
    countryCode,
  } = params; //деструктуризація параметрів з присвоєнням дефолтних значень, якщо вони незаданні

  const queryParams = new URLSearchParams({
    size: perPage, //кількість івентів на сторінці
    page: currentPage, //поточна сторінка
    apikey: apiKey,
  }); // Обов'язкові араметри запиту

  //Необов'язкові параметри
  if (keyword) {
    queryParams.set('keyword', keyword);
  }
  if (countryCode) {
    queryParams.set('countryCode', countryCode);
  }

  const url = `https://app.ticketmaster.com/discovery/v2/events.json?${queryParams}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Помилка при запиті івентів: ${response.status}`);
    }

    const data = await response.json();

    return formatEvents(data); // Формуємо об'єкт з інформацією про пагінацію та списком івентів за допомогою функції formatEvents та повертаємо його
  } catch (error) {
    console.error('Помилка при отримані івентів', error);
    return {};
  }
};
