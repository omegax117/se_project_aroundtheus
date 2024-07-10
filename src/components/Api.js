export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this._headers = headers;
    // constructor body
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserData() {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  editUserData(userData) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.description,
      }),
    });
  }

  editPfp(userData) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar: userData.link }),
    });
  }

  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  addNewCard(cardData) {
    return this._request(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
      }),
    });
  }

  addLike(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  removeLike(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  deleteCard(cardData) {
    return this._request(`${this.baseUrl}/cards/${cardData}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }
}
