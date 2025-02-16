export const saveParams = params => {
  localStorage.setItem('eventsParams', JSON.stringify(params));
};

export const loadParams = () => {
  const params = localStorage.getItem('eventParams');
  if (!params) {
    return {
      currentPage: 0,
      perPage: 20,
    };
  }

  try {
    return JSON.parse(params);
  } catch (error) {
    console.log('Error parsing params', error);
    return {
      currentPage: 0,
      perPage: 20,
    };
  }
};
