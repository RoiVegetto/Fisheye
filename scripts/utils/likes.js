/**
 * Cette fonction gère les likes, au clic on prends un like, si l'ont reclic ça l'enlève
 * Et ça mets a jour l'encart en bas a droite avec le total de likes
 */
const liked = {};

function toggleLike(button) {
  const index = parseInt(button.getAttribute('data-index'));
  const media = filteredMedias[index];
  const currentLikes = media.likes;
  const isLiked = liked[index] === true;

  if (isLiked) {
    media.likes = currentLikes - 1;
    liked[index] = false;
  } else {
    media.likes = currentLikes + 1;
    liked[index] = true;
  }

  const likes = button.querySelector('i');
  likes.textContent = media.likes;

  totalLikes = filteredMedias.reduce((sum, media) => sum + media.likes, 0);
  const totalLikesElement = document.querySelector('.total');
  totalLikesElement.textContent = totalLikes.toString();
}