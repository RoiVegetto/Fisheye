window.onload = function () {
  const lightboxImgVideo = document.querySelectorAll('.img-video');
  const lightbox = document.querySelector('.lightbox');
  const lightboxMedia = document.querySelector('.lightbox-media');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxButtonG = document.querySelector('#g');
  const lightboxButtonD = document.querySelector('#d');

  const images = [];

  lightboxImgVideo.forEach((thumbnail) => {
    images.push(thumbnail.src);
    thumbnail.addEventListener('click', (event) => {
      if (event.target.matches('.img-video')) {
        lightboxMedia.src = event.target.src;
        lightbox.style.display = 'flex';
        lightboxImgIndex = images.indexOf(event.target.src);
      }
    });
  });

  let lightboxImgIndex = 0;

  lightboxButtonG.addEventListener('click', () => {
    if (lightboxImgIndex === 0) {
      lightboxImgIndex = images.length - 1;
    } else {
      lightboxImgIndex -= 1;
    }
    lightboxMedia.src = images[lightboxImgIndex];
  });

  lightboxButtonD.addEventListener('click', () => {
    if (lightboxImgIndex === images.length - 1) {
      lightboxImgIndex = 0;
    } else {
      lightboxImgIndex += 1;
    }
    lightboxMedia.src = images[lightboxImgIndex];
  });

  lightboxClose.addEventListener('click', (event) => {
    lightbox.style.display = 'none';
  });
};
