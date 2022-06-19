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
    this.submitDisabled = config.submitDisabledClassName;
    const chooseSubmitButtonStateCb = () => {chooseSubmitButtonState(this._form)};

    this._inputManagers = this.inputClassName.forEach((currentInput) => {
      console.log('currentInput', currentInput);
      return new InputManager(currentInput, new InputValidator(rules[currentInput.name], chooseSubmitButtonStateCb));
    });

    console.log('rules', this.rules);
    console.log('form', this._form);
    console.log('submit', this.onSubmit);
    console.log('inputs', this.inputClassName);
    console.log('submit', chooseSubmitButtonStateCb);

  }

//Неактивная кнопка
  chooseSubmitButtonState(targetForm) {
  let error = targetForm.querySelector('.popup__input_invalid');
  const button = targetForm.querySelector(this.submitSelector);

  if (error) {
    button.disabled = true;
    button.classList.add(this.submitDisabled);
    return 
  }
  button.disabled = false;
  button.classList.remove(this.submitDisabled);
  }
}