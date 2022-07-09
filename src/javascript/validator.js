import { validateInputIsEmpty, validateMinLength, validateMaxLength, validateRegExp, validateEmail } from './validation-rules.js'

export class InputValidator {
  constructor (rules, currentInputName, getValues) {
    this.validationRules = rules;
    this.getValues = getValues;
    this.currentInputName = currentInputName;
  }

  validate() {
    const values = this.getValues();
    const currentValue = values[this.currentInputName];

    if (this.validationRules.isRequired) {
      if (!validateInputIsEmpty(currentValue)) {  
        return this.validationRules.empty.message;
      }
    }
  
    if (this.validationRules.minLength) {
      if (!validateMinLength(currentValue, this.validationRules.minLength.length)) {
        return this.validationRules.minLength.message;
      }
    }

    if (this.validationRules.maxLength) {
      if (!validateMaxLength(currentValue, this.validationRules.maxLength.length)) {
        return this.validationRules.maxLength.message;
      }
    }

    if (this.validationRules.regExp) {
      if (!validateRegExp(currentValue, this.validationRules.regExp.rule)) {
        return this.validationRules.regExp.message;
      }
    }

    if (this.validationRules.fn) {
      if (!this.validationRules.fn.execute(currentValue, values)) {
        return this.validationRules.fn.message;
      }
    }
  }
}