import { api } from './../utils/api.js';

export class SessionManager {
  constructor(auth, profile) {
    this._auth = auth;
    this._profile = profile;
  }

  start() {
    const token = localStorage.getItem('token');
    api.setupAuthToken(token);
    if (token) {
      return api.getUser().then((responseBody) => {
        return this._setupUser(responseBody.user);
      });
    }
    return Promise.resolve();
  }

  _setupUser(user) {
    if (user) {
      this._auth.setupUser(user);
      this._profile.setupProfileData(user);
    }
  }

  _setupToken(token) {
    if (token) {
      api.setupAuthToken(`Bearer ${token}`);
      localStorage.setItem('token', `Bearer ${token}`);
    } else {
      api.setupAuthToken();
      localStorage.removeItem('token');
    }
  }

  login(data) {
    return api.login(
      data
    ).then((responseBody) => {
      const token = responseBody.token;
      this._setupToken(token);
      return api.getUser();
    }).then((responseBody) => {
      return this._setupUser(responseBody.user);
    })
  }

  logout() {
    this._auth.logout();
    this._setupUser(null);
    this._setupToken(null);
  }
}