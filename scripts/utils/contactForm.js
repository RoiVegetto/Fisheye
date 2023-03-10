const modal = document.getElementById('contact_modal');
const form = modal.querySelector('form');
const firstNameInput = form.querySelector('#Prénom');
const lastNameInput = form.querySelector('#nom-de-famille');
const emailInput = form.querySelector('#Email');
const messageInput = form.querySelector('.input-message');
const closeModalButton = modal.querySelector('img');
const submitButton = form.querySelector('button[type="submit"]');
const openModalButton = document.querySelector('.open-modal-button');

if (openModalButton) {
  openModalButton.addEventListener('click', () => {
    displayModal();
  });
}

function displayModal() {
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
}

// fonction de validation du formulaire
function validateForm(event) {
  event.preventDefault(); // empêcher la page de se rafraîchir
  if (
    firstNameInput.value &&
    lastNameInput.value &&
    emailInput.checkValidity() &&
    messageInput.value
  ) {
    // les champs sont remplis et valides, on peut supprimer les valeurs
    console.log('Nom:', lastNameInput.value);
    console.log('Prénom:', firstNameInput.value);
    console.log('Email:', emailInput.value);
    console.log('Message:', messageInput.value);
    firstNameInput.value = '';
    lastNameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
    closeModal(); // fermer la modal
  } else {
    // afficher un message d'erreur
    alert(
      'Veuillez remplir correctement, Nom Prénom Email et un message contenant au moins 10 caractères.'
    );
  }
}

/**
 * Ceci permet de pouvoir cliquer sur la croix de fermeture de la modal au clavier
 */
closeModalButton.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    closeModal();
  }
});

// ajout d'un gestionnaire d'événement au document pour écouter la touche "échap"
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && modal.style.display === 'flex') {
    closeModal();
  }
});

// fonction de fermeture de la modal
function closeModal() {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');

  // supprimer le contenu des champs de formulaire
  firstNameInput.value = '';
  lastNameInput.value = '';
  emailInput.value = '';
  messageInput.value = '';
}

/**
 * Ceci permet de cliquer sur envoyer au clavier et de vérifier si les champs sont remplit
 */
if (submitButton) {
  submitButton.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      validateForm(event);
    }
  });
}

// ajout d'un gestionnaire d'événement au bouton de fermeture
closeModalButton.addEventListener('click', closeModal);

// ajout d'un gestionnaire d'événement au bouton "Envoyer" si la variable submitButton est définie
if (submitButton) {
  submitButton.addEventListener('click', validateForm);
}
