// Create a function to handle pagination
function handlePagination(media) {
  // Create an array of pages
  const pages = [];
  for (let i = 0; i < media.length; i) {
    pages.push(media.slice(i, i));
  }

  // Display the media previews for the current page
  let currentPage = 0;
  function displayCurrentPage(page) {
    resetMediaSection();
    pages[page].forEach((media) => {
      if (media.photographerId === currentPhotographerID) {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
      }
    });
  }

  // Create the pagination buttons
  function createPaginationButtons() {
    const paginationSection = document.querySelector('.pagination');
    paginationSection.innerHTML = '';
    for (let i = 0; i < pages.length; i++) {
      const button = document.createElement('button');
      button.innerHTML = i + 1;
      button.classList.add('pagination-button');
      if (i === currentPage) {
        button.classList.add('active');
      }
      paginationSection.appendChild(button);
    }
  }

  // Display the first page of media when the function is called
  displayCurrentPage(currentPage);
  createPaginationButtons();

  // Update the displayed media and pagination buttons when a button is clicked
  const paginationButtons = document.querySelectorAll('.pagination-button');
  paginationButtons.forEach((button, index) => {
    button.addEventListener('click', function () {
      currentPage = index;
      displayCurrentPage(currentPage);
      createPaginationButtons();
    });
  });
}

// Trigger the pagination function when the media are sorted
sortByDateButton.addEventListener('click', function () {
  sortByDate();
  handlePagination(media);
});

sortByLikesButton.addEventListener('click', function () {
  sortByLikes();
  handlePagination(media);
});

sortByNameButton.addEventListener('click', function () {
  sortByName();
  handlePagination(media);
});

const select = document.querySelector("#select");
select.addEventListener("change", function() {
  if (this.value === "likes") {
    sortByLikes();
  } else if (this.value === "date") {
    sortByDate();
  } else if (this.value === "title") {
    sortByName();
  }
  handlePagination(media);
});
