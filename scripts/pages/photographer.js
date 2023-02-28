let cachedData = null;
let cachedPhotographerDetails = null;

async function getData() {
  if (cachedData) {
    return cachedData;
  }
  const url = './data/photographers.json';
  try {
    const response = await fetch(url);
    const data = await response.json();
    cachedData = data;
    return data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

async function getPhotographers() {
  const data = await getData();
  return data.photographers;
}

async function getPhotographerDetails() {
  if (cachedPhotographerDetails) {
    return cachedPhotographerDetails;
  }
  const data = await getData();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  const photographer = data.photographers.find(
    (photographer) => parseInt(photographer.id) === parseInt(id)
  );

  if (!photographer) {
    console.error(`Photographer with id ${id} not found.`);
    return;
  }

  const filteredMedias = data.media.filter(
    (media) => media.photographerId === parseInt(photographer.id)
  );

  displayPhotographerData(photographer);

  cachedPhotographerDetails = filteredMedias;
  return cachedPhotographerDetails;
}
