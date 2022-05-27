class InputManager {
  constructor(domElement) {
    this.inputElement = domElement;
    domElement.addEventListener('input', (e) => { this._handleInputChange(e)});
  }
  _handleInputChange() {
    console.log(e.target.value === this.inputElement.value);
  }
}