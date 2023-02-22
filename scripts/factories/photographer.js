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

async function displayMedias() {
  const section = document.getElementById('section');
  section.innerHTML = '';
  const medias = await getPhotographerDetails();

  filteredMedias = medias.reduce((acc, media) => {
    const mediaElement = createMediaElement(media);
    if (mediaElement) {
      acc.push({
        mediaElement: mediaElement,
        title: media.title,
        likes: media.likes,
        date: media.date,
      });
    }
    return acc;
  }, []);

  // tri des médias par défaut par likes
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
  };

  // Ajout d'un écouteur d'événement pour trier les médias
  const sortSelect = document.getElementById('sort-select');
  sortSelect.addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === 'likes') {
      filteredMedias.sort((a, b) => b.likes - a.likes);
    } else if (selectedOption === 'date') {
      filteredMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selectedOption === 'title') {
      filteredMedias.sort((a, b) => a.title.localeCompare(b.title));
    }
    displayMediaItems();
  });
  displayMediaItems();
  return filteredMedias;
}

/**
 * Cette fonction gère le footer, le nombre de likes total de la page et le prix du photographe
 */

async function displayFooter() {
  const footer = document.getElementById('footer');
  const photographers = await getPhotographers();
  const medias = await getMedias();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const photographer = photographers.find((p) => p.id === parseInt(id));
  const price = photographer.price;

  const filteredMedias = medias.filter(
    (media) => media.photographerId === parseInt(id)
  );

  let totalLikes = 0;
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
  footer.innerHTML = footerItem;
}

displayMedias();
displayFooter();
