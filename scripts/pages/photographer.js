function displayFactory(data) {
  const { name, city, country, tagline, portrait } = data;
  const picture = `assets/photographers/${portrait}`;

  function displayPhotographer() {
    const nameDiv = document.getElementById('name');
    nameDiv.textContent = name;

    const locationDiv = document.getElementById('location');
    locationDiv.textContent = `${city}, ${country}`;

    const taglineDiv = document.getElementById('tagline');
    taglineDiv.textContent = tagline;

    const imgDiv = document.getElementById('image');
    imgDiv.setAttribute('src', picture);
  }

  return {
    name,
    city,
    country,
    tagline,
    picture,
    displayPhotographer,
  };
}

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

/*let phtographe = `<article>
            <a href="./photographer.html?id=${photographer.id}" aria-label="lien vers ${photographer.name} ">
                <img src="./assets/photographers/${photographer.portrait}" alt="${photographer.name}"/>
                <h2>${photographer.name}</h2>
            </a>
            <div>
                <h3 aria-label="zone de travail ${photographer.city}, ${photographer.country}">${photographer.city}, ${photographer.country}</h3>
                <p aria-label =*/