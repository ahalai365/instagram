const CONTENT_ACTIVE_CLASS = 'content_active';
const ACCOUNT_ACTIVE_CLASS = 'account_active';

export class Auth {
  constructor({ config }) {
    this.CONTENT_ACTIVE_CLASS = CONTENT_ACTIVE_CLASS;

    this._user = null;

    this.contentElement = document.querySelector(config.contentSelector);
    this.signInElement = document.querySelector(config.signInSelector);
    this.registrationElement = document.querySelector(config.registrationSelector);
    this.authElement = document.querySelector(config.authSelector);
    this.exitElement = document.querySelector(config.exitSelector);
  }

  setupUser(user) {
    this._user = user;

    if(this._user) {
      this.signInElement.classList.remove(ACCOUNT_ACTIVE_CLASS);
      this.registrationElement.classList.remove(ACCOUNT_ACTIVE_CLASS);

      this.authElement.classList.add(ACCOUNT_ACTIVE_CLASS);
      this.exitElement.classList.add(ACCOUNT_ACTIVE_CLASS);
      
      this.contentElement.classList.add(this.CONTENT_ACTIVE_CLASS);

    } else {
      
    this.signInElement.classList.add(ACCOUNT_ACTIVE_CLASS);
    this.registrationElement.classList.add(ACCOUNT_ACTIVE_CLASS);

    this.authElement.classList.remove(ACCOUNT_ACTIVE_CLASS);
    this.exitElement.classList.remove(ACCOUNT_ACTIVE_CLASS);
    
    this.contentElement.classList.remove(this.CONTENT_ACTIVE_CLASS);
    }
  }

  logout() {
    this.setupUser(null);
  }
};