export const getEvents = async params => {
  const searchParams = new URLSearchParams({}); // тут будуть параметри запиту

  const url =
    'https://app.ticketmaster.com/discovery/v2/events.json?apikey=A8TfknWuvAEesY78luj7BLu0h4tXEN6d';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Помилка при запиті івентів: ${response.status}`);
    }
    const data = await response.json();
    if (!data._embedded || !data._embedded.events) {
      return { page: data.page, events: [] };
    }
    const eventsList = data._embedded.events.map(event => {
      return {
        dates: event.dates,
        id: event.id,
        image: event.images
          .filter(image => !image.fallback)
          .sort((prev, next) => {
            next.width - prev.width;
          })[0],
        name: event.name,
      };
    });
    const events = {
      page: data.page,
      events: eventsList || [],
    };
    return events;
  } catch (error) {
    console.error('Помилка при отримані івентів', error);
  }
};
