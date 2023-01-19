/**
 * Ici displayModal sert a ouvrir la modal et closeModal sert a la fermer.
 */

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
