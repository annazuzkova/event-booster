export const formatEvents = data => {
  if (!data._embedded || !data._embedded.events) {
    return [];
  }
  const formatedEvent = data._embedded.events.map(event => {
    return {
      dates: event.dates,
      id: event.id,
      poster:
        event.images
          .filter(image => !image.fallback && image.width < 960)
          .sort((prev, next) => next.width - prev.width)[0] || {}, // обираємо найбільше зображення, ширина якого не перевищує 960px
      name: event.name,
      place: event._embedded?.venues[0].name,
    };
  });
  return {
    events: formatedEvent,
  };
};
