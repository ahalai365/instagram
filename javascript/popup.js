const POPUP_OPEN_CLASS = 'popup_active';

export class PopupManager {
  constructor (domElement, targetPopup, popupViewHandler) {
    this.POPUP_OPEN_CLASS = 'popup_active';
    this.domElement = domElement;
    this.targetPopup = targetPopup;
    this.popupViewHandler = popupViewHandler;

    domElement.addEventListener('click', (e) => { this._handlePopup(e)});
    
  }

  _handlePopup() {
    if (this.domElement.classList.contains('element__img')) {
      this._openPopup(this.targetPopup);
      this.popupViewHandler();
      return
    }

    if (this.domElement.classList.contains('profile__edit')) {
      return this._openPopup(this.targetPopup);
    }

    if (this.domElement.classList.contains('profile__add')) {
      return this._openPopup(this.targetPopup);
    }

    if (this.domElement.classList.contains('popup__close')) {
      return this._closePopup(this.targetPopup);
    }
  }

  _openPopup(targetPopup) {
    targetPopup.classList.add(this.POPUP_OPEN_CLASS);
  }

  _closePopup(targetPopup) {
    targetPopup.classList.remove(this.POPUP_OPEN_CLASS);
  }
}