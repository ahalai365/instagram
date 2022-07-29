class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _get(url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      }).then((response) => {
        return this._processResponse(response)});
  }

  _post(url, body) {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
    console.log('data', loginData)
    return this._post(`${this._baseUrl}/user/login`, loginData)
  }

  register(registerData) {
    return this._post(`${this._baseUrl}/user/register`, registerData);
  }

  getUser(userId) {
    return this._get(`${this._baseUrl}/user/` + userId);
  }
}

export const api = new Api(`http://localhost:8200`);