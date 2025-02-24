export const formatEvent = data => {
  if (!data._embedded || !data._embedded.events) {
    return [];
  }
  const formatedEvent = data._embedded.events.map(event => {
    return {
      dates: event.dates,
      poster:
        event.images
          .filter(image => !image.fallback)
          .sort((prev, next) => next.width - prev.width)[0] || {}, // обираємо найбільше зображення, ширина якого не перевищує 960px
      logo:
        event.images
          .filter(image => !image.fallback && image.width < 640)
          .sort((prev, next) => next.width - prev.width)[0] || {},
      name: event.name,
      place: event._embedded?.venues[0].name,
      city: event._embedded?.venues[0].city,
      country: event._embedded?.venues[0].country,
      time: event.dates,
      info: event.info,
      pricesStandarMin: event.priceRanges[0].min,
      pricesStandarMax: event.priceRanges[0].max,
      currency: event.priceRanges[0].currency,
      url: event.url,
    };
  });

  return {
    event: formatedEvent[0],
  };
};
