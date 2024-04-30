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
const profileEditCloseBtn = document.querySelector(".modal__close-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileSave = document.querySelector(".modal__form");
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
const newCardSave = document.querySelector(".newcards__form");
const newCardClose = document.querySelector(".newcards__close-button");
const newCardNameInput = document.querySelector(".newcards__input_type_title");
const newCardLinkInput = document.querySelector(".newcards__input_type_link");
const previewModal = document.querySelector("#preview");
const previewCloseBtn = document.querySelector(".preview__close-button");

//functions
function closePopUp() {
  profileEditModal.classList.remove("modal_open");
}

function openPreview() {
  previewModal.classList.add("preview__modal_open");
}

function closePreview() {
  previewModal.classList.remove("preview__modal_open");
}

function handleCardImageClick(event) {
  if (event.target.classList.contains("card__image")) {
    const previewImage = event.target;
    const cardTitle = previewImage.closest(".card");
    previewModal.querySelector(".preview__image").src = previewImage.src;
    previewModal.querySelector(".preview__title").textContent =
      cardTitle.textContent;
    openPreview();
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
  profileEditModal.classList.add("modal_open");
});

profileEditCloseBtn.addEventListener("click", () => {
  closePopUp();
});

cardAddBtn.addEventListener("click", () => {
  newCardModal.classList.add("newcards_open");
  newCardNameInput.value = "Title";
  newCardLinkInput.value = "Image URL";
});

newCardClose.addEventListener("click", () => {
  newCardModal.classList.remove("newcards_open");
});

cardListEl.addEventListener("click", handleCardImageClick);
previewCloseBtn.addEventListener("click", () => {
  closePreview();
});

//Handler
profileSave.addEventListener("submit", (event) => {
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  event.preventDefault();
  closePopUp();
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

newCardSave.addEventListener("submit", (event) => {
  event.preventDefault();
  newCardModal.classList.remove("newcards_open");
  const name = newCardNameInput.value;
  const link = newCardLinkInput.value;
  renderCard({ name, link }, cardListEl);
  cardListEl.prepend(getCardElement(cardElement));
});
