import { InputValidator } from './validator.js'

export class InputManager {
  constructor(domElement, validationRules, chooseSubmitState) {
    this.inputElement = domElement;
    this.validationRules = validationRules;
    this.invalidClassName = 'popup__input_invalid';
    this.chooseSubmitState = chooseSubmitState;
    
    domElement.addEventListener('input', (e) => { this._handleInputChange(e)});
  }

  _handleInputChange(e) {
    let value = this.inputElement.value;
    this._validator = new InputValidator(value, this.validationRules);

    this._clearErrors();

    const error = this._validator.validate(value);

    if (error) {
      this.inputElement.classList.add(this.invalidClassName);
      this._renderErrors(error);
    }

    this.chooseSubmitState();
  }

  _renderErrors(errorText) {
    let error = document.createElement('div');
    error.className = `popup__error popup__error--${this.inputElement.name}`;
    error.innerHTML = errorText; 
    this.inputElement.parentElement.insertBefore(error, this.inputElement.nextSibling);
  }

  _clearErrors() {
    let errors = document.querySelectorAll(`.popup__error--${this.inputElement.name}`);
    this.inputElement.classList.remove('popup__input_invalid');

    errors.forEach(function(e) {
      e.remove();
    })
  }

  
}