/**
 * Ici on va créer toutes les informations dont nous avons besoin pour le profil des photographes
 * @param {*} data
 * @returns
 */

function photographerFactory(data) {
  const { name, id, portrait, city, country, tagline, tarif, price } = data;
  const picture = `assets/photographers/${portrait}`;

  /**
   * La fonction getUserCardDOM va créer les informations dont on a besoin pour créer le profil d'un photographe
   * @returns
   */

  function getUserCardDOM() {
    const article = document.createElement('article');
    article.setAttribute('id', id);
    const imgContainer = document.createElement('a');
    imgContainer.classList.add('profile-picture-container');
    imgContainer.setAttribute('href', 'photographer.html?id=' + id);
    imgContainer.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        imgContainer.click();
      }
    });
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const location = document.createElement('p');
    location.textContent = city + ', ' + country;
    location.classList.add('photographe-location');
    const description = document.createElement('p');
    description.textContent = tagline;
    description.classList.add('photographe-description');
    const tarif = document.createElement('p');
    tarif.textContent = price + '€/jour';
    tarif.classList.add('photographe-tarif');

    imgContainer.appendChild(img);
    imgContainer.appendChild(h2);

    article.appendChild(imgContainer);
    article.appendChild(location);
    article.appendChild(description);
    article.appendChild(tarif);
    return article;
  }
  return {
    name,
    id,
    picture,
    tagline,
    city,
    country,
    tarif,
    price,
    getUserCardDOM,
  };
}
