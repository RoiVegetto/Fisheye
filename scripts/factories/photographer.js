function photographerFactory(data) {
  const { name, id, portrait, city, country, tagline, tarif, price } = data;

  const picture = `assets/photographers/${portrait}`;

  /**
   * La fonction getUserCardDOM va prendre les informations dont on a besoin pour créer le profil d'un photographe
   * @returns
   */

  function getUserCardDOM() {
    const article = document.createElement('article');
    article.setAttribute('id', id);
    const img = document.createElement('img');
    img.setAttribute('src', picture);
    const h2 = document.createElement('h2');
    h2.textContent = name;
    const location = document.createElement('p');
    location.textContent = city + ', ' + country;
    const description = document.createElement('p');
    description.textContent = tagline;
    const tarif = document.createElement('p');
    tarif.textContent = price + '€/jour';
    article.appendChild(img);
    article.appendChild(h2);
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
