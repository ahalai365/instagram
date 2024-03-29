import { InputManager } from './input-manager.js';
import { InputValidator } from './../utils/validator.js'

export class FormConstructor {
  constructor({onSubmit, rules, config}){
    this.onSubmit = onSubmit;
    this._form = document.querySelector(config.formSelector);
    this.inputElement = this._form.querySelectorAll(config.inputClassNameSelector);

    this.button = this._form.querySelector(config.submitSelector);
    this.chooseSubmitButtonStateCb = () => this._chooseSubmitButtonState(this._form);

    this.getValuesCb = () => this.getValues();

    this._inputManagers = this.inputElement.forEach((currentInput) => {
      new InputManager(currentInput, new InputValidator(rules[currentInput.name], currentInput.name, this.getValuesCb), this.chooseSubmitButtonStateCb);
    });

    this._form.addEventListener('submit', (e) => {
        e.preventDefault();

        let haveError = this._form.querySelector('.popup__input_invalid');
        if (haveError) {
          return
        }

        this.onSubmit();
      });
  }

  _chooseSubmitButtonState(targetForm) {
    let error = targetForm.querySelector('.popup__input_invalid');
    if (error) {
      this.button.disabled = true;
      return 
    }
    this.button.disabled = false;
  }

  getValues() {
    const result = {};

    this.inputElement.forEach((currentInput) => {
      result[currentInput.name] = currentInput.value;
    });
  
    return result;
  }

  clearInputs() {
    this.inputElement.forEach((currentInput) => {
      currentInput.value = '';
    });
  }

  inputChanger() {
    const profileName = document.querySelector('.profile__name');
    const profileDescription = document.querySelector('.profile__subtitle');
    const inputName = this.inputElement[0];
    const inputDescription = this.inputElement[1];

    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
  }
}