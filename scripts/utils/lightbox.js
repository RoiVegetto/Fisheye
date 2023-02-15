/**
 * Cette fonction crée l'html de la lightbox en dynamique avec ce qui est cliqué
 * Les boutons permettent de switcher entre les photos
 * Et si le contenu visé est une vidéo, alors elle sera jouable dans la lightbox
 * @param {} mediaElement
 * @param {*} title
 */

function displayLightbox(mediaElement, title) {
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxMediaDisplay = document.getElementById(
    'lightbox-media-display'
  );
  lightboxModal.style.display = 'block';

  let mediaHtml = mediaElement;

  // Add controls to video element if it's a video
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
  const lightboxModal = document.getElementById('lightbox-modal');
  lightboxModal.style.display = 'none';
}

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener('click', closeLightbox);
