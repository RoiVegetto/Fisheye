function DescriptionFactory(data) {
  const { name, id, portrait, city, country, tagline } = data;
  const picture = `assets/photographers/${portrait}`;

  /**
   * La fonction getUserCardDOM va prendre les informations dont on a besoin pour créer le profil d'un photographe
   * @returns
   */

  function getDescriptionCardDOM() {
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const location = document.createElement('p');
    location.textContent = city + ', ' + country;
    location.classList.add('photographe-location');
    const description = document.createElement('p');
    description.textContent = tagline;
    description.classList.add('photographe-description');
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(location);
    article.appendChild(description);
    return article;
  }
  return {
    name,
    id,
    picture,
    tagline,
    city,
    country,
    getDescriptionCardDOM,
  };
}
