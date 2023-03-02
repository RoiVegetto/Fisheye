/**
 * Ici on va prendre les éléments du DOM pour les modifier et ajouter les informations venant du fichier JSON
 * On vise le header de la page photographer
 * @param {*} data
 * @returns
 */

function displayPhotographerData(data) {
  const { name, city, country, tagline, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  const nameDiv = document.getElementById('name');
  nameDiv.textContent = name;

  const nameModal = document.getElementById('name-form');
  nameModal.innerHTML = 'Contactez-moi<br>' + name;

  const locationDiv = document.getElementById('location');
  locationDiv.textContent = `${city}, ${country}`;

  const taglineDiv = document.getElementById('tagline');
  taglineDiv.textContent = tagline;

  const imgDiv = document.getElementById('image');
  imgDiv.setAttribute('src', picture);
}

/**
 * Ici on va faire la même chose qu'au dessus avec de la création d'élément directement dans le JS
 * On vise la section des images des créateurs
 * @param {*} photographerId
 */

function displayMedias(data) {
  const section = document.getElementById('section');
  section.innerHTML = '';
  const medias = getPhotographerDetails(data);
  filteredMedias = medias.map((media) => {
    const mediaElement = mediaFactory(media).getMediaDOM();
    return {
      mediaElement,
      title: media.title,
      likes: media.likes,
      date: media.date,
    };
  });
  filteredMedias.sort((a, b) => b.likes - a.likes);

  const displayMediaItems = () => {
    section.innerHTML = '';
    filteredMedias.forEach((media, index) => {
      const mediaItem = `
          <div class="media">
            ${media.mediaElement}
            <div class="informations">
              <p class="p">${media.title}</p>
              <div id="media-likes">
              <button class="button-like" onclick="toggleLike(this)" data-index="${index}">
              <i>${media.likes}</i>
              <span class="heart-icon"><i class="fa fa-heart far"></i></span>
            </button>            
            </div>            
            </div>
          </div>
        `;
      section.innerHTML += mediaItem;
    });

    addMediaEventListeners(filteredMedias);
  };

  displayMediaItems();

  const sortSelect = document.getElementById('sort-select');
  sortSelect.addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    filteredMedias = sortMedias(filteredMedias, selectedOption);
    displayMediaItems();
  });
}

/**
 * Cette fonction gère le footer, le nombre de likes total de la page et le prix du photographe
 */

async function displayFooter(data) {
  const footer = document.getElementById('footer');

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const photographer = data.photographers.find((p) => p.id === parseInt(id));
  const price = photographer.price;

  const medias = await getPhotographerDetails(data);
  let totalLikes = 0;
  medias.forEach((media) => {
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
  footer.innerHTML = footerItem;
}

async function init() {
  const data = await getData();
  displayMedias(data);
  displayFooter(data);
}

init();
