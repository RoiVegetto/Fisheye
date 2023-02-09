/**
 * Ici je vais chercher les informations du fichier JSON
 * @returns
 */

async function getPhotographers() {
  const url = '/data/photographers.json';
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
 * Ici je vais prendre la section des photographes et y ajouter les informations
 * @param {*} photographers
 */

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

/**
 * Ici la fonction init va initialiser une variable ou un objet en lui assignant une valeur par défaut
 */

async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
