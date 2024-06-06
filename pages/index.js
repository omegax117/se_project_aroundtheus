import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//Elements
const formSubmitButton = document.querySelector("#form_submit");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const editProfileForm = document.querySelector("#profile-form");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector(".modal__input_type_name");
const profileDescriptionInput = document.querySelector(
  ".modal__input_type_description"
);
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#jscard-template").content.firstElementChild;
const cardAddBtn = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#newcards");
const addNewCardForm = document.querySelector("#newcard-form");
const newCardNameInput = document.querySelector(".modal__input_type_title");
const newCardLinkInput = document.querySelector(".modal__input_type_link");
const previewModal = document.querySelector("#preview");
const previewImage = document.querySelector(".modal__image-preview");
const previewTitle = document.querySelector(".modal__title-preview");
const closePopUpBtns = document.querySelectorAll(".modal__close-button");
const modals = document.querySelectorAll(".modal");
closePopUpBtns.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(popup));
});

//functions
function closePopUp(popup) {
  popup.classList.remove("modal_open");
  window.removeEventListener("keydown", handleEscKeyPress);
  window.removeEventListener("click", handleClickOverlay);
}

function openPopUp(popup) {
  popup.classList.add("modal_open");
  window.addEventListener("keydown", handleEscKeyPress);
  window.addEventListener("click", handleClickOverlay);
}

function handleClickOverlay(event) {
  if (Array.from(event.target.classList).includes("modal_open")) {
    closePopUp(event.target);
  }
}

function handleEscKeyPress(event) {
  if (event.key == "Escape") {
    const openModal = document.querySelector(".modal_open");
    closePopUp(openModal);
  }
}

function handleCardImageClick(event) {
  const preview = event.target;
  const cardTitle = preview.closest(".card");
  previewImage.src = preview.src;
  previewImage.alt = preview.alt;
  previewTitle.textContent = cardTitle.textContent;
  openPopUp(previewModal);
}

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector(".card__image");
//   const cardTitleEl = cardElement.querySelector(".card__description-text");
//   const likeButton = cardElement.querySelector(".card__like-button");
//   const deleteBtn = cardElement.querySelector(".card__delete-button");
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });
//   deleteBtn.addEventListener("click", () => {
//     cardElement.remove();
//   });
//   cardImageEl.addEventListener("click", handleCardImageClick);
//   cardImageEl.src = cardData.link;
//   cardTitleEl.textContent = cardData.name;
//   cardImageEl.alt = cardData.name;

//   return cardElement;
// }

function renderCard(cardData, cardListEl) {
  const card = new Card(
    cardData,
    "#jscard-template",
    handleCardImageClick
  ).getView();
  cardListEl.prepend(card);
}

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  formValidators["profile-form"].resetValidation();
  openPopUp(profileEditModal);
});

cardAddBtn.addEventListener("click", () => {
  openPopUp(newCardModal);
});

//Handler
editProfileForm.addEventListener("submit", (event) => {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  event.preventDefault();
  closePopUp(profileEditModal);
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

addNewCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  closePopUp(newCardModal);
  const name = newCardNameInput.value;
  const link = newCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  event.target.reset();
  formValidators["newcard-form"].disableButton();
});

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("id");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

// const editFormValidator = new FormValidator(config, editProfileForm);
// editFormValidator.enableValidation();
// const addFormValidator = new FormValidator(config, addNewCardForm);
// addFormValidator.enableValidation();
