import { saveParams } from '../helpers/storage';

const selectCountry = document.querySelector('[data-select_country]');
const searchInput = document.querySelector('[data-search]');
const clearButton = document.querySelector('[data-clear]');

export const clearFilters = () => {
  // Очищаємо значення інпуту пошуку
  if (searchInput) {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
  }
  if (selectCountry) {
    selectCountry.value = 'placeholder';
  }

  // Скидаємо збережені параметри
  saveParams({});

  // Додаємо клас для приховування кнопки очищення
  clearButton.classList.add('filter-clear--hide');

  setTimeout(() => {
    clearButton.classList.remove('filter-clear--show');
    clearButton.classList.remove('filter-clear--hide');
  }, 150);
};
export const addClearHandlers = () => {
  if (clearButton) {
    clearButton.addEventListener('click', clearFilters);
  }
};
