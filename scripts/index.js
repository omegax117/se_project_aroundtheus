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

//Elements
const profileEditBtn = document.querySelector(".profile__edit-button");
const modalCloseBtn = document.querySelector(".modal__close-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileForm = document.querySelector(".modal__form");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector(".modal__input_type_title");
const profileDescriptionInput = document.querySelector(
  ".modal__input_type_description"
);
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#jscard-template").content.firstElementChild;
const cardAddBtn = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#newcards");
const newCardForm = document.querySelector(".newcards__form");
const newCardNameInput = document.querySelector(".newcards__input_type_title");
const newCardLinkInput = document.querySelector(".newcards__input_type_link");
const previewModal = document.querySelector("#preview");
const previewImage = document.querySelector(".preview__image");
const previewTitle = document.querySelector(".preview__title");

//functions
function closePopUp(popup) {
  popup.classList.remove("modal_open");
}

function openPopUp(popup) {
  popup.classList.add("modal_open");
}

function handleCardImageClick(event) {
  if (event.target.classList.contains("card__image")) {
    const preview = event.target;
    const cardTitle = preview.closest(".card");
    previewImage.src = preview.src;
    previewImage.alt = preview.alt;
    previewTitle.textContent = cardTitle.textContent;
    openPopUp(previewModal);
  }
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__description-text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteBtn = cardElement.querySelector(".card__delete-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
  cardListEl.addEventListener("click", handleCardImageClick);
  const closeBtns = document.querySelectorAll(".modal__close-button");
  closeBtns.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closePopUp(popup));
  });
  cardImageEl.src = cardData.link;
  cardTitleEl.textContent = cardData.name;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

function renderCard(cardData, cardListEl) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
});

cardAddBtn.addEventListener("click", () => {
  openPopUp(newCardModal);
});

//Handler
profileForm.addEventListener("submit", (event) => {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  event.preventDefault();
  closePopUp();
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

newCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  closePopUp(newCardModal);
  const name = newCardNameInput.value;
  const link = newCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  event.target.reset(name, link);
});
