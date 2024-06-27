export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = document.querySelector(".modal__close-button");
    this._openedModal = document.querySelector(".modal_open");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_open");
    document.addEventListener("keydown", this._handleEscClose);
    //opens
  }

  close() {
    this._popupElement.classList.remove("modal_open");
    document.removeEventListener("keydown", this._handleEscClose);
    //close
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close(this._openedModal);
    }
  }

  _handleClickOverlay(event) {
    if (event.target.classList.contains("modal_open")) {
      this.close(event.target);
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (event) => {
      if (
        event.target.classList.contains("modal_open") ||
        event.target.classList.contains("modal__close-button")
      ) {
        this.close(this._openedModal);
      }
    });
  }
}
