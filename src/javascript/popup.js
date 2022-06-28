const POPUP_OPEN_CLASS = 'popup_active';

export class PopupManager {
  constructor (popupElement) {
    this.POPUP_OPEN_CLASS = 'popup_active';
    this._popupElement = popupElement;

    const closeButton = popupElement.querySelector('.popup__close');

    closeButton.addEventListener('click', () => {
      this.closePopup();
    })
  }

  openPopup() {
    this._popupElement.classList.add(this.POPUP_OPEN_CLASS);
  }

  closePopup() {
    this._popupElement.classList.remove(this.POPUP_OPEN_CLASS);
  }
}