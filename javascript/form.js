import { InputManager } from './input-manager.js';
import { InputValidator } from './validator.js'

export class FormConstructor {
  constructor({onSubmit, rules, config, inputErrorClassName}){
    this.onSubmit = onSubmit;
    this.rules = rules;
    this._form = document.querySelector(config.formSelector);

    this.inputClassName = this._form.querySelectorAll(config.inputClassNameSelector);
    this.inputErrorClassName = inputErrorClassName;

    this.submitSelector = config.submitSelector;
        
    this.chooseSubmitButtonStateCb = () => this.chooseSubmitButtonState(this._form);

    this._inputManagers = this.inputClassName.forEach((currentInput) => {
      new InputManager(currentInput, new InputValidator(rules[currentInput.name]), this.chooseSubmitButtonStateCb);
    });

    this._form.addEventListener('submit', (e) => {
        e.preventDefault();

        let haveError = this._form.querySelector('.popup__input_invalid');
        if (haveError) {
          return
        }
      
        this.onSubmit(this.inputClassName);
      });

    // console.log('rules', this.rules);
    // console.log('form', this._form);
    // console.log('submit', this.onSubmit);
    // console.log('inputs', this.inputClassName);
    // console.log('managers', this._inputManagers);
    // console.log('submit', this.chooseSubmitButtonStateCb);
  }

  chooseSubmitButtonState(targetForm) {
  let error = targetForm.querySelector('.popup__input_invalid');
  const button = targetForm.querySelector(this.submitSelector);

  if (error) {
    button.disabled = true;
    return 
  }
  button.disabled = false;
  }
}