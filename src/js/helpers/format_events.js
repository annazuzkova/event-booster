import defaultPoster from '../../images/main/poster.jpg';
export const formatEvents = data => {
  //Перевіряємо чи у відповіді є події
  if (!data._embedded || !data._embedded.events) {
    return { page: data.page, events: [] };
  }
  //Формуємо потрбні дані для головної сторінки
  const formatedEvents = data._embedded.events.map(event => {
    return {
      dates: event.dates,
      id: event.id,
      poster: event.images
        .filter(image => !image.fallback && image.width < 960)
        .sort((prev, next) => next.width - prev.width)[0] || {
        url: defaultPoster,
      }, // обираємо найбільше зображення, ширина якого не перевищує 960px а
      name: event.name,
      place: event._embedded?.venues[0].name,
    };
  });

  return {
    page: data.page,
    events: formatedEvents,
  };
};
