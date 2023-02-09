/**
 * Ici on va prendre les éléments du DOM pour les modifier et ajouter les informations venant du fichier JSON
 * On vise le header de la page photographer
 * @param {*} data
 * @returns
 */

function displayFactory(data) {
  const { name, city, country, tagline, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  function displayPhotographer() {
    const nameDiv = document.getElementById('name');
    nameDiv.textContent = name;
    // name-form vise le nom dans la modal
    const nameModal = document.getElementById('name-form');
    nameModal.innerHTML = 'Contactez-moi<br>' + name;

    const locationDiv = document.getElementById('location');
    locationDiv.textContent = `${city}, ${country}`;

    const taglineDiv = document.getElementById('tagline');
    taglineDiv.textContent = tagline;
    // lightbox-p vise la tagline de la lightbox
    const taglineLightbox = document.getElementById('lightbox-p');
    taglineLightbox.textContent = tagline;

    const imgDiv = document.getElementById('image');
    imgDiv.setAttribute('src', picture);
  }

  return {
    name,
    city,
    country,
    tagline,
    picture,
    displayPhotographer,
  };
}

/**
 * Ici on va faire la même chose qu'au dessus avec de la création d'élément directement dans le JS
 * On vise la section des images des créateurs
 * @param {*} photographerId
 */
let filteredMedias;
/*  const sortSelect = document.getElementById('sort-select');
  sortSelect.addEventListener('change', function () {
    switch (sortSelect.value) {
      case 'likes':
        return filteredMedias.sort((a, b) => b.likes - a.likes);
      case 'date':
        return filteredMedias.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      case 'title':
        return filteredMedias.sort((a, b) => a.title.localeCompare(b.title));
    }
  });*/
  let mediaElement;

  function imgVideo() {
    filteredMedias.forEach((media, index) => {
      if (media.image !== undefined) {
        mediaElement = `<img class="img-video" src="./assets/images/${media.image}" alt="${media.title}">`;
      } else if (media.video !== undefined) {
        mediaElement = `<video class="img-video" src="./assets/videos/${media.video}" alt="${media.title}"></video>`;
      }
    });
  }
  
  let mediaElements = [];
  function imgVideo() {
    filteredMedias.forEach((media, index) => {
      let mediaElement;
      if (media.image !== undefined) {
        mediaElement = `<img class="img-video" src="./assets/images/${media.image}" alt="${media.title}">`;
      } else if (media.video !== undefined) {
        mediaElement = `<video class="img-video" src="./assets/videos/${media.video}" alt="${media.title}"></video>`;
      }
      mediaElements.push(mediaElement);
    });
  }
  
  async function displayMedias(photographerId) {
    const section = document.getElementById('section');
    section.innerHTML = '';
    const medias = await getMedias();
    filteredMedias = medias.filter(
      (media) => media.photographerId === parseInt(photographerId)
    );
  
    imgVideo();
    mediaElements.forEach((mediaElement, index) => {
      const media = filteredMedias[index];
      const mediaItem = `
        <div class="media">
          ${mediaElement}
          <div class="informations">
            <p class="p">${media.title}</p>
            <div id="media-likes">
              <button class="button-like" onclick="toggleLike(this)" data-index="${index}">
                <i>${media.likes}</i>
              </button>
              <i class="fa-solid fa-heart"></i>
            </div>
          </div>
        </div>
      `;
      section.innerHTML += mediaItem;
    });
    console.log(filteredMedias);
  }
  
  displayMedias();
  
  

/*async function sortMedias(sortCriteria) {
  const medias = await getMedias();
  let sortedMedias = [...filteredMedias];
  filteredMedias = medias.slice();
  switch (sortCriteria) {
    case 'likes':
      sortedMedias.sort((a, b) => b.likes - a.likes);
      break;
    case 'date':
      sortedMedias.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA < dateB) return -1;
        if (dateA > dateB) return 1;
        return 0;
      });
      break;
    case 'title':
      sortedMedias.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0;
      });
      break;
    default:
      break;
  }

}


const selector = document.querySelector('select');
selector.addEventListener('change', () => {
  const selectedOption = selector.value;
  sortMedias(selectedOption);
});*/

/**
 * Cette fonction crée les éléments du footer avec le prix du photographe et le nombre total de like qu'il possède
 */

async function displayFooter() {
  const footer = document.getElementById('footer');
  const photographers = await getPhotographers();
  const medias = await getMedias();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const photographer = photographers.find((p) => p.id === parseInt(id));
  const price = photographer.price;

  let totalLikes = 0;

  const filteredMedias = medias.filter(
    (media) => media.photographerId === parseInt(id)
  );

  filteredMedias.forEach((media) => {
    totalLikes += media.likes;
  });

  const footerItem = `
    <div class="footer-likes">
      <div class="total">${totalLikes}</div>
      <i id="black" class="fa-solid fa-heart"></i>
    </div>
    <div class="footer-price">
      <div class="prix">${price}€ / jour</div>
    </div>
  `;
  footer.innerHTML += footerItem;
}

displayFooter();
