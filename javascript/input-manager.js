import { validateInputIsEmpty, validateMinLength, validateMaxLength, validateRegExp} from './validation-rules.js'

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

    //let errors = [];

    this._clearErrors();

    if (this.validationRules.isRequired) {
      if (!validateInputIsEmpty (value)) {  
        errors.push('Укажите имя');
      }
    }
  
    if (this.validationRules.isMin) {
      if (!validateMinLength (value, this.validationRules.isMin)) {
        errors.push('Имя слишком короткое');
      }
    }

    if (this.validationRules.isMax) {
      if (!validateMaxLength (value, this.validationRules.isMax)) {
        errors.push('Имя слишком длинное');
      }
    }

    if (this.validationRules.regExp) {
      if (!validateRegExp (value, this.validationRules.regExp.rule)) {
        errors.push(this.validationRules.regExp.text);
      }
    }

    const error = this._validator.validate(value);

    if (errors.length > 0) {
      this.inputElement.classList.add(this.invalidClassName);
      this._renderErrors(errors[0]);
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