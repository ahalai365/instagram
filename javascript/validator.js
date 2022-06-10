import { validateInputIsEmpty, validateMinLength, validateMaxLength, validateRegExp} from './validation-rules.js'

export class InputValidator {
  constructor (rules) {
    this.validationRules = rules;
  }

  validate(value) {
    if (this.validationRules.isRequired) {
      if (!validateInputIsEmpty(value)) {  
        return this.validationRules.empty.message;
      }
    }
  
    if (this.validationRules.minLength) {
      if (!validateMinLength(value, this.validationRules.minLength.length)) {
        return this.validationRules.minLength.message;
      }
    }

    if (this.validationRules.maxLength) {
      if (!validateMaxLength(value, this.validationRules.maxLength.length)) {
        return this.validationRules.maxLength.message;
      }
    }

    if (this.validationRules.regExp) {
      if (!validateRegExp(value, this.validationRules.regExp.rule)) {
        return this.validationRules.regExp.text;
      }
    }
  }
}