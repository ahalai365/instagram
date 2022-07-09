const CONTENT_ACTIVE_CLASS = 'content_active'

export class Auth {
  constructor({ config }) {
    this.CONTENT_ACTIVE_CLASS = CONTENT_ACTIVE_CLASS;
    this.contentElement = document.querySelector(config.contentSelector);
    this.signInElement = document.querySelector(config.signInSelector);
  };

  isAuth(result) {
    if(result) {

      this.contentElement.classList.add(this.CONTENT_ACTIVE_CLASS);
    };
  }

  _render() {
    this._authorized = document.querySelector(config.templateSelector).cloneNode(true);

  };
};