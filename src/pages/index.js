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
const EditPfp = new PopupWithForm("#pfpEdit", editPfpSubmit);
EditPfp.setEventListeners();
const confirmPopup = new PopupWithConfirm("#confirm");
confirmPopup.setEventListeners();
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8d3dab07-3d12-4401-9299-225a306c1793",
    "Content-Type": "application/json",
  },
});

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

function cardListData() {
  return api
    .getInitialCards()
    .then((res) => {
      console.log("Fetched Cards:", res);
      return res.map((card) => ({
        name: card.name,
        link: card.link,
        _id: card._id,
        isLiked: card.isLiked,
      }));
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
}

cardListData()
  .then((data) => {
    const cardElement = data.map((cardData) => createCard(cardData));
    cardSection.renderItems(cardElement);
  })
  .catch((err) => {
    console.error(err);
  });

const cardSection = new Section(
  {
    items: [],
    renderer: createCard,
  },
  selectors.cardSection
);
const userInfo = new UserInfo(profileName, profileDescription, pfp);
cardSection.renderItems();

api
  .getUserData()
  .then((res) => {
    console.log(res);
    userInfo.setUserInfo({ name: res.name, description: res.about });
    userInfo.setUserPfp({ avatar: res.avatar });
  })
  .catch((err) => {
    console.error(err);
  });

//render newcards

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
  EditPfp.open();
});

//Handler
function handleDeleteCard(card) {
  confirmPopup.open();
  confirmPopup.handleConfirm(() => {
    confirmPopup.showLoading(true);
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
        confirmPopup.showLoading(false);
      });
  });
}

function editProfileSubmit(userData) {
  profilePopup.showLoading(true);
  api
    .editUserData({
      name: userData.name,
      description: userData.description,
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profilePopup.showLoading(false);
    });
  userInfo.setUserInfo(userData);
  profilePopup.close();
}

function editPfpSubmit(userData) {
  EditPfp.showLoading(true);
  api
    .editPfp(userData)
    .then((res) => {
      userInfo.setUserPfp({ avatar: res.avatar });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      EditPfp.showLoading(false);
    });
  formValidators["pfp-editor"].disableButton();
}

function addNewCardSubmit(data) {
  newCardPopup.showLoading(true);
  api
    .addNewCard(data)
    .then((res) => {
      const cardElement = createCard(res);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      newCardPopup.showLoading(false);
    });
  formValidators["newcard-form"].disableButton();
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
