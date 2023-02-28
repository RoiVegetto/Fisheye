/**
 * Fonction qui gère le fait d'avoir une image ou une vidéo dans l'élément visé
 * @param {*} media
 * @returns
 */

function mediaFactory(media) {
  const { image, video } = media;
  function getMediaDOM() {
    let mediaElement;
    if (media.image) {
      mediaElement = `<img class="img-video" src="./assets/images/${media.image}" alt="${media.title}" aria-label="${media.title}" tabindex="0" data-title="${media.title}">`;
    } else if (media.video) {
      mediaElement = `<video class="img-video" src="./assets/videos/${media.video}" alt="${media.title}" aria-label="${media.title}" tabindex="0" data-title="${media.title}"></video>`;
    }
    return mediaElement;
  }
  return {
    getMediaDOM,
  };
}
