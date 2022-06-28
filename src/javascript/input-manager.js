export class InputManager {
  constructor(domElement, validator, chooseSubmitState) {
    this.inputElement = domElement;
    this._validator = validator;
    this.invalidClassName = 'popup__input_invalid';
    this._chooseSubmitState = chooseSubmitState;
    domElement.addEventListener('input', this._handleInputChange);
  }

  _handleInputChange = () => {
    let value = this.inputElement.value;
    
    this._clearErrors();

    const error = this._validator.validate(value);

    if (error) {
      this.inputElement.classList.add(this.invalidClassName);
      this._renderErrors(error);
    }

    this._chooseSubmitState();
  }

  _renderErrors(errorText) {
    let error = document.createElement('div');
    error.className = `popup__error popup__error--${this.inputElement.name}`;
    error.innerHTML = errorText; 
    this.inputElement.parentElement.insertBefore(error, this.inputElement.nextSibling);
  }

  _clearErrors() {
    let errors = document.querySelectorAll(`.popup__error--${this.inputElement.name}`);
    this.inputElement.classList.remove(this.invalidClassName);

    errors.forEach(function(e) {
      e.remove();
    })
  }
}