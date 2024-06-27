import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import {
  initialCards,
  config,
  profileEditBtn,
  profileEditModal,
  profileName,
  profileDescription,
  profileNameInput,
  profileDescriptionInput,
  cardAddBtn,
  newCardModal,
  newCardNameInput,
  newCardLinkInput,
  formValidators,
  selectors,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";

//Elements
const imagePopup = new PopupWithImage({ popupSelector: "#preview" });
imagePopup.setEventListeners();
const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  editProfileSubmit
);
profilePopup.setEventListeners();
const newCardPopup = new PopupWithForm("#newcards", addNewCardSubmit);
newCardPopup.setEventListeners();

function handleCardImageClick(name, link) {
  imagePopup.open(name, link);
}
const CardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardEl = new Card(
        cardData,
        selectors.cardTemplate,
        handleCardImageClick
      );
      CardSection.addItem(cardEl.getView());
    },
  },
  selectors.cardSection
);
const userInfo = new UserInfo(profileName, profileDescription);
CardSection.renderItems();

//render newcards
function renderCard(cardData) {
  const card = new Card(
    cardData,
    "#jscard-template",
    handleCardImageClick
  ).getView();
  CardSection.addItem(card);
}

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileNameInput.value = name;
  profileDescriptionInput.value = description;
  formValidators["profile-form"].resetValidation();
  profilePopup.open();
});

cardAddBtn.addEventListener("click", () => {
  newCardPopup.open(newCardModal);
});

//Handler
function editProfileSubmit(userData) {
  userInfo.setUserInfo(userData);
  profilePopup.close(profileEditModal);
}

function addNewCardSubmit() {
  const name = newCardNameInput.value;
  const link = newCardLinkInput.value;
  renderCard({ name, link });
  formValidators["newcard-form"].disableButton();
}

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
