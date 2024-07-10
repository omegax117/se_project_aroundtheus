import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import {
  config,
  profileEditBtn,
  profileName,
  profileDescription,
  cardAddBtn,
  formValidators,
  selectors,
  pfp,
} from "../utils/constants.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirm from "../components/PopupWithConfirm";

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
const editPfp = new PopupWithForm("#pfpEdit", editPfpSubmit);
editPfp.setEventListeners();
const confirmPopup = new PopupWithConfirm("#confirm");
confirmPopup.setEventListeners();
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8d3dab07-3d12-4401-9299-225a306c1793",
    "Content-Type": "application/json",
  },
});
const userInfo = new UserInfo(profileName, profileDescription, pfp);

//initalization
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#jscard-template",
    handleCardImageClick,
    handleDeleteCard,
    handleLikeCard
  );
  const cardElement = card.getView();
  cardSection.addItem(cardElement);
}
//render newcards
function cardListData() {
  return api
    .getInitialCards()
    .then((data) => {
      const cardElement = data.map((cardData) => createCard(cardData));
      cardSection.renderItems(cardElement);
    })
    .catch((err) => {
      console.error(err);
    });
}

cardListData();

const cardSection = new Section(
  {
    items: [],
    renderer: createCard,
  },
  selectors.cardSection
);

api
  .getUserData()
  .then((res) => {
    userInfo.setUserInfo({ name: res.name, description: res.about });
    userInfo.setUserPfp({ avatar: res.avatar });
  })
  .catch((err) => {
    console.error(err);
  });

// Event Listeners
profileEditBtn.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  profilePopup.setInputValues(info);
  formValidators["profile-form"].resetValidation();
  profilePopup.open();
});

cardAddBtn.addEventListener("click", () => {
  newCardPopup.open();
});

pfp.addEventListener("click", () => {
  editPfp.open();
});

//Handler
function handleDeleteCard(card) {
  confirmPopup.open();
  confirmPopup.handleConfirm(() => {
    confirmPopup.renderLoading(true);
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.handleDeleteCard();
        confirmPopup.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        confirmPopup.renderLoading(false);
      });
  });
}

//submit function
function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}

function editProfileSubmit(userData) {
  function makeRequest() {
    return api.editUserData(userData).then((userData) => {
      userInfo.modifyUserInfo(userData);
    });
  }
  handleSubmit(makeRequest, profilePopup);
}

function editPfpSubmit(userData) {
  function makeRequest() {
    return api.editPfp(userData).then((userData) => {
      userInfo.setUserPfp({ avatar: userData.avatar });
    });
  }
  handleSubmit(makeRequest, editPfp);
}

function addNewCardSubmit(data) {
  function makeRequest() {
    return api.addNewCard(data).then((data) => {
      createCard(data);
      formValidators["newcard-form"].disableButton();
    });
  }
  handleSubmit(makeRequest, newCardPopup);
}

function handleCardImageClick(name, link) {
  imagePopup.open(name, link);
}

function handleLikeCard(card) {
  if (card.getIsLiked()) {
    api
      .removeLike(card.getCardId())
      .then(() => {
        card.setIsLiked(false);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .addLike(card.getCardId())
      .then(() => {
        card.setIsLiked(true);
      })
      .catch(console.error);
  }
}

//validation
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
