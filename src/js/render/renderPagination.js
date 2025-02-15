export const renderButtons = async (currentPage, maxPage, container) => {
  let markup = ``;
  let totalPages = maxPage;

  if (maxPage > 49) {
    totalPages = 50;
  }

  const pagesCalc = totalPages - currentPage;
  console.log(pagesCalc);

  if (currentPage > 2) {
    markup += `<li class="pagination__item"><button class="pagination__button active" data-page="${
      currentPage - 2
    }">${currentPage - 1}</button></li>`;
  }

  if (currentPage > 1) {
    markup += `<li class="pagination__item"><button class="pagination__button active" data-page="${
      currentPage - 1
    }">${currentPage}</button></li>`;
  }

  markup += `<li class="pagination__item"><button class="pagination__button"  data-page="${currentPage}">${
    currentPage + 1
  }</button></li>`;

  if (pagesCalc > 1) {
    markup += `<li class="pagination__item"><button class="pagination__button active" data-page="${
      currentPage + 1
    }">${currentPage + 2}</button></li>`;
  }

  if (pagesCalc > 2) {
    markup += `<li class="pagination__item"><button class="pagination__button active" data-page="${
      currentPage + 2
    }">${currentPage + 3}</button></li>`;
  }

  markup += `<li class="pagination__item"><button class="pagination__button active" data-page="${totalPages}">${totalPages}</button></li>`;

  container.innerHTML = markup;
};
