class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

  setupAuthToken(token) {
    if (token) {
      this._headers.Authorization = `${token}`;
    } else {
      delete this._headers.Authorization;
    }
  }

  _get(url) {
    return fetch(url, {
      method: 'GET',
      headers: this._headers,
      }).then((response) => {
        return this._processResponse(response)});
  }

  _post(url, body) {
    return fetch(url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(body)
    }).then((response) => {
      return this._processResponse(response)});
  }

  _processResponse(response) {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject
    }
  }

  login(loginData) {
    return this._post(`${this._baseUrl}/user/login`, loginData);
  }

  register(registerData) {
    return this._post(`${this._baseUrl}/user/register`, registerData);
  }

  getUser() {
    return this._get(`${this._baseUrl}/user/profile`);
  }

  getAllcards() {
    return this._get(`${this._baseUrl}/cards`);
  }

  createCard(data) {
    console.log('data create', data);
    return this._post(`${this._baseUrl}/cards`, data);
  }
}

export const api = new Api(`http://localhost:8200`);