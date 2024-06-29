// VARIABLES
const $contact = document.getElementById("contact"),
  $info = document.getElementById("information"),
  $closeContact = document.getElementById("close-contact"),
  $closeInfo = document.getElementById("close-information");

// FUNCIONES
export default function footerActions(action) {
  action === "contact"
    ? document.querySelector(".contact").classList.toggle("show")
    : document.querySelector(".information").classList.toggle("show");
}

// EVENTOS
$contact.addEventListener("click", () => footerActions("contact"));
$closeContact.addEventListener("click", () => footerActions("contact"));
$info.addEventListener("click", () => footerActions());
$closeInfo.addEventListener("click", () => footerActions());
