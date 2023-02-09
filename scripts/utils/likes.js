const liked = {};

async function toggleLike(button) {
  // Recherchez l'index de l'élément cliqué
  const index = parseInt(button.getAttribute('data-index'));
  const media = filteredMedias[index];

  // Enregistrez l'état aimé pour ce média
  liked[media.id] = liked[media.id] === undefined ? true : !liked[media.id];

  // Augmentez ou diminuez le nombre de likes
  media.likes += liked[media.id] ? 1 : -1;

  // Mettez à jour l'interface utilisateur
  button.innerHTML = `<i>${media.likes}</i>`;
}