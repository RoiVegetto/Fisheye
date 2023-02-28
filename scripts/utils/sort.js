/**
 *  Cette fonction gère le tri des images/vidéos de la section
 * @param {*} filteredMedias
 * @param {*} option
 * @returns
 */

function sortMedias(filteredMedias, option) {
  if (option === 'likes') {
    filteredMedias.sort((a, b) => b.likes - a.likes);
  } else if (option === 'date') {
    filteredMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
  } else if (option === 'title') {
    filteredMedias.sort((a, b) => a.title.localeCompare(b.title));
  }
  return filteredMedias;
}
