import { loadParams } from './storage';
const clearButton = document.querySelector('[data-clear]');
export const showClearFilterBtn = () => {
  const { keyword, countryCode } = loadParams();

  if (keyword || countryCode) {
    clearButton.classList.add('filter-clear--show');
  }
};
