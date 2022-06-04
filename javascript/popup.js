const POPUP_OPEN_CLASS = 'popup_active';

// открыть/закрыть попап
export function openPopup(targetPopup) {
  targetPopup.classList.add(POPUP_OPEN_CLASS);
}

export function closePopup(targetPopup) {
  targetPopup.classList.remove(POPUP_OPEN_CLASS);
}

class Popup {
  constructor (domElement) {
    this.POPUP_OPEN_CLASS = 'popup_active';
    this.domElement = domElement;
    this.targetPopup = 

    // domElement.addEventListener('click', (e) => { this._handlePopupState(e)});
  }

  // _handlePopupState() {
  //   if (this.domElement.classList.contain)
  // }

  _openPopup(targetPopup) {
    targetPopup.classList.add(this.POPUP_OPEN_CLASS);
  }

  _closePopup(targetPopup) {
    targetPopup.classList.remove(this.POPUP_OPEN_CLASS);
  }
}