import { InputManager } from './input-manager.js';
import { InputValidator } from './validator.js'

export class FormConstructor {
  constructor({onSubmit, rules, config}){
    this.onSubmit = onSubmit;
    this._form = document.querySelector(config.formSelector);
    this.inputElement = this._form.querySelectorAll(config.inputClassNameSelector);

    this.button = this._form.querySelector(config.submitSelector);
    this.chooseSubmitButtonStateCb = () => this._chooseSubmitButtonState(this._form);

    this._inputManagers = this.inputElement.forEach((currentInput) => {
      new InputManager(currentInput, new InputValidator(rules[currentInput.name]), this.chooseSubmitButtonStateCb);
    });

    this._form.addEventListener('submit', (e) => {
        e.preventDefault();

        let haveError = this._form.querySelector('.popup__input_invalid');
        if (haveError) {
          return
        }
        this.onSubmit(this.inputElement);
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
}