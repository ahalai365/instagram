import { api } from "../utils/api";

// Создание фотокарточек через шаблон (template)
const LIKE_ACTIVE_CLASS = 'element__like_active';

export class Card {
  constructor(cardData, templateSelector) {
    this._cardData = cardData;
    this._title = cardData.title;
    this._src = cardData.url;
    this._clickCallback = () => {};
    
    this._element = document.querySelector(templateSelector).content.querySelector('.element').cloneNode(true);
    const elementFooter = this._element.querySelector('.element__footer');
    const elementImage = this._element.querySelector('.element__img');
    const elementTitle = elementFooter.querySelector('.element__title');

    elementImage.setAttribute('src', this._src);
    elementImage.setAttribute('alt', this._title);
    elementTitle.textContent = this._title;

    elementImage.addEventListener('click', () => {
      this._clickCallback(this._src);
    });

    this._likeButton = this._element.querySelector('.element__like');
    this._likeButton.addEventListener('click', this._likeClickHandler);

    this._likeCountElement = this._element.querySelector('.element__count');
    this._likeCountElement.textContent = cardData.likes.length;

    this._deleteButton = this._element.querySelector('.element__delete');
    this._deleteButton.addEventListener('click', this._deleteClickHandler);
  }

  notifyUser(user) {
    this._activeUser = user;
    this._rerenderLike();
  }

  _rerenderLike() {
    const likesCount = this._cardData.likes.length;
    this._likeCountElement.innerText = likesCount;
    
    const hasCurrentUserLike = this._cardData.likes.includes(this._activeUser ? this._activeUser.id : null);
    
    if (hasCurrentUserLike) {
      this._likeButton.classList.add(LIKE_ACTIVE_CLASS);
    } else {
      this._likeButton.classList.remove(LIKE_ACTIVE_CLASS);
    }
  }

  _likeClickHandler = () => {
    api.likeCard(this._cardData.id).then((response) => {
      console.log(this._cardData);
      this._cardData = response.card;
      this._rerenderLike();
    });
  }
  
  onClick(callback) {
      this._clickCallback = callback;
  }

  render() {
   return this._element;
  }

  _deleteClickHandler = () => {
    api.deleteCard(this._cardData.id).then(() => { 
      this._element.remove();
    }).catch(() => {
      console.log('Чужая фотокарточка!');
    });
  }
}