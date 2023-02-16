const lightboxModal = document.getElementById('lightbox-modal');
const lightboxMediaDisplay = document.getElementById('lightbox-media-display');
const mediaElements = document.querySelectorAll('.img-video');

/**
 * Cette fonction crée l'html de la lightbox en dynamique avec ce qui est cliqué
 * Les boutons permettent de switcher entre les photos
 * Et si le contenu visé est une vidéo, alors elle sera jouable dans la lightbox
 * @param {} mediaElement
 * @param {*} title
 */

function displayLightbox(mediaElement, title) {
  lightboxModal.style.display = 'block';
  document.body.classList.add('lightbox-open'); // Ajouter la classe CSS

  let mediaHtml = mediaElement;

  // Ajoute dans la balise le mot controls pour lire la vidéo
  if (mediaElement.includes('video')) {
    mediaHtml = mediaHtml.replace('<video', '<video controls');
  }

  lightboxMediaDisplay.innerHTML = `
  <div class="lightbox-controls">
    <button class="previous-button" onclick="previousImage()"><</button>
    <h2 id="lightbox-media-title" class="img-text-lightbox">${title}</h2>
    <button class="next-button" onclick="nextImage()">></button>
  </div>
  ${mediaHtml}
`;

  // Rendre l'image non sélectionnable au clavier
  const mediaImg = lightboxMediaDisplay.querySelector('img');
  if (mediaImg) {
    mediaImg.setAttribute('tabindex', '-1');
  }
}

/**
 * Previous et Next sont les fonctions qui servent a aller a l'image suivante ou précédente
 */

function previousImage() {
  if (filteredMedias && filteredMedias.length > 0) {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = filteredMedias.length - 1;
    }
    displayLightbox(
      filteredMedias[currentIndex].mediaElement,
      filteredMedias[currentIndex].title
    );
  }
}

function nextImage() {
  if (filteredMedias && filteredMedias.length > 0) {
    currentIndex++;
    if (currentIndex >= filteredMedias.length) {
      currentIndex = 0;
    }
    displayLightbox(
      filteredMedias[currentIndex].mediaElement,
      filteredMedias[currentIndex].title
    );
  }
}

/**
 * closeLightbox sert a fermer la lightbox
 */

function closeLightbox() {
  lightboxModal.style.display = 'none';
  document.body.classList.remove('lightbox-open'); // Retirer la classe CSS
}

lightboxModal.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    closeLightbox();
  }
});

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', closeLightbox);
