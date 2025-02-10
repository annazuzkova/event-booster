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
    return data;
  } catch (error) {}
};
