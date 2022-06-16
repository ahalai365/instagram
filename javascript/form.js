export class FormConstructor {
  constructor(rules, formSelector){
    this._rules = rules;
    this._form = document.querySelector(formSelector);

    
  }
  a() {console.log(this.form);}
}