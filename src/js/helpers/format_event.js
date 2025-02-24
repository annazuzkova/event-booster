import defaultPoster from '../../images/main/poster.jpg';
export const formatEvent = data => {
  if (!data._embedded || !data._embedded.events) {
    return [];
  }
  const formatedEvent = data._embedded.events.map(event => {
    const images = event.images || [];
    const venues = event._embedded?.venues || [{}];
    const priceRanges = event.priceRanges || [{}];

    return {
      dates: event.dates || {},
      poster: images
        .filter(image => !image.fallback && image.width < 1200)
        .sort((prev, next) => next.width - prev.width)[0] || {
        url: defaultPoster,
      }, // обираємо найбільше зображення, ширина якого не перевищує 960px
      logo: images
        .filter(image => !image.fallback && image.width < 640)
        .sort((prev, next) => next.width - prev.width)[0] || {
        url: defaultPoster,
      },
      name: event.name || 'No name available',
      place: venues[0].name || 'No place available',
      city: venues[0].city || 'No city available',
      country: venues[0].country || 'No country available',
      time: event.dates || {},
      info: event.info || 'No information available',
      pricesStandarMin: priceRanges[0].min || 'N/A',
      pricesStandarMax: priceRanges[0].max || 'N/A',
      currency: priceRanges[0].currency || 'N/A',
      url: event.url || '#',
    };
  });

  return {
    event: formatedEvent[0],
  };
};
