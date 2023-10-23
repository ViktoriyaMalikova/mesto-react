class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
        this._authorization = options.headers.authorization;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInfoProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._checkResponse)
    }

    setUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.username,
                about: data.userjob,

            })
        })
            .then(this._checkResponse)
    }

    setNewAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.linkavatar,
            })
        })
            .then(this._checkResponse)
    }

    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.title,
                link: data.link,
            })
        })
            .then(this._checkResponse);
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._checkResponse);
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._checkResponse);
    }


    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: this._authorization
            }
        })
            .then(this._checkResponse);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
    headers: {
        authorization: '471e18fc-43ec-4587-90e0-f6ac04729a79',
        'Content-Type': 'application/json'
    }
});

export { api };