import { api } from './../utils/api.js';

export class SessionManager {
  constructor(auth, profile) {
    this._auth = auth;
    this._profile = profile;

    this.start();
  }

  start() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this._setupUser(JSON.parse(userData));
    }
  }

  _setupUser(user) {
    this._auth.setupUser(user);
    this._profile.setupProfileData(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }

  login(data) {
    return api.login(
      data
    ).then((responseBody) => {
      return api.getUser(responseBody.userId);
    }).then((responseBody) => {
      return this._setupUser(responseBody.user);
    })
  }
}