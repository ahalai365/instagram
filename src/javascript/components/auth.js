const PROFILE_ACTIVE_CLASS = 'profile_active';
const ACCOUNT_ACTIVE_CLASS = 'account_active';

export class Auth {
  constructor({ config }) {
    this._user = null;

    this.profileElement = document.querySelector(config.profileSelector);
    this.signInElement = document.querySelector(config.signInSelector);
    this.registrationElement = document.querySelector(config.registrationSelector);
    this.authElement = document.querySelector(config.authSelector);
    this.exitElement = document.querySelector(config.exitSelector);

    this._cbs = [];
  }

  onChangeUser(cb) {
    this._cbs.push(cb);
    cb(this._user);
  }

  setupUser(user) {
    this._user = user;

    if(this._user) {
      this.signInElement.classList.remove(ACCOUNT_ACTIVE_CLASS);
      this.registrationElement.classList.remove(ACCOUNT_ACTIVE_CLASS);

      this.authElement.classList.add(ACCOUNT_ACTIVE_CLASS);
      this.exitElement.classList.add(ACCOUNT_ACTIVE_CLASS);
      
      this.profileElement.classList.add(PROFILE_ACTIVE_CLASS);
    } else {
      this.signInElement.classList.add(ACCOUNT_ACTIVE_CLASS);
      this.registrationElement.classList.add(ACCOUNT_ACTIVE_CLASS);

      this.authElement.classList.remove(ACCOUNT_ACTIVE_CLASS);
      this.exitElement.classList.remove(ACCOUNT_ACTIVE_CLASS);
      
      this.profileElement.classList.remove(PROFILE_ACTIVE_CLASS);
    }

    
    this._cbs.forEach((savedCallback) => {
      savedCallback(this._user);
    });
    
  }

  logout() {
    this.setupUser(null);
  }
};