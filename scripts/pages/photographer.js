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

async function displayMedias(photographerId) {
  const section = document.getElementById('section');
  const medias = await getMedias();
  const filteredMedias = medias.filter(
    (media) => media.photographerId === parseInt(photographerId)
  );

  filteredMedias.forEach((media) => {
    let mediaElement;
    if (media.image !== undefined) {
      mediaElement = `<img src="./assets/images/${media.image}" alt="${media.title}">`;
    } else if (media.video !== undefined) {
      mediaElement = `<video src="./assets/videos/${media.video}" alt="${media.title}" controls></video>`;
    }

    console.log(media.video);
    console.log(media.image);
    const mediaItem = `
      <div class="media">
        ${mediaElement}
        <div class="informations">
          <p class="p">${media.title}</p>
          <div>
            <button class="button-like">
              <i>${media.likes}</i>
            </button>
            <i class="fa-solid fa-heart"></i>
          </div>
        </div>
      </div>
    `;
    section.innerHTML += mediaItem;
  });
}

/**
 * Cette fonction a pour but de rajouter l'id dans l'URL et de lancer la fonction displayMedia
 */

async function getPhotographerDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const photographers = await getPhotographers();
  const photographer = photographers.find(
    (photographer) => parseInt(photographer.id) === parseInt(id)
  );

  displayMedias(photographer.id);
}

/**
 * Cette fonction crée les éléments du footer avec le prix du photographe et le nombre total de like qu'il possède
 */

getPhotographerDetails();

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

/*let section = document.querySelector("section");
let photographeImage = `<article>
            <a href="./photographer.html?id=${photographers.id}" aria-label="lien vers ${photographer.name} ">
                <img src="./assets/photographers/${photographer.portrait}" alt="${photographer.name}"/>
                <h2>${photographer.name}</h2>
            </a> 
            </article>`;

let article = document.createElement("div");
article.innerHTML = photographeImage;

section.appendChild(article);*/

/*
            <div>
                <h3 aria-label="zone de travail ${photographer.city}, ${photographer.country}">${photographer.city}, ${photographer.country}</h3>
                <p aria-label =*/
