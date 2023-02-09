/**
 * Ici je vais chercher les informations du fichier JSON
 * @returns
 */

async function getPhotographers() {
  const url = './data/photographers.json';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.photographers;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Ici nous avons la même fonction que getPhotographers sauf qu'elle vise les médias
 * @returns
 */

async function getMedias() {
  const url = './data/photographers.json';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.media;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Ici nous allons dispatché la data, parsé l'ID
 * @returns
 */

async function displayData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const photographers = await getPhotographers();
  const photographer = photographers.find(
    (photographer) => parseInt(photographer.id) === parseInt(id)
  );

  if (!photographer) {
    console.error(`Photographer with id ${id} not found.`);
    return;
  }

  const photographerModel = displayFactory(photographer);
  photographerModel.displayPhotographer();
}

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData();
}

init();

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

  if (!photographer) {
    console.error("Photographer not found");
    return;
  }
  displayMedias(photographer.id);
}

getPhotographerDetails();



