/**
 * Cette fonction gère les likes, au clic on prends un like, si l'ont reclic ça l'enlève
 * Et ça mets a jour l'encart en bas a droite avec le total de likes
 */
const liked = {};

function toggleLike(button) {
  const index = parseInt(button.getAttribute('data-index'));
  const media = filteredMedias[index];
  const currentLikes = media.likes;
  const isLiked = media.liked === true;

  if (isLiked) {
    media.likes = currentLikes - 1;
    media.liked = false;
    button.querySelector('.fa-heart').classList.remove('fa-solid');
  } else {
    media.likes = currentLikes + 1;
    media.liked = true;
    button.querySelector('.fa-heart').classList.add('fa-solid');
  }

  const likes = button.querySelector('i');
  likes.textContent = media.likes;

  totalLikes = filteredMedias.reduce((sum, media) => sum + media.likes, 0);
  const totalLikesElement = document.querySelector('.total');
  totalLikesElement.textContent = totalLikes.toString();
}

