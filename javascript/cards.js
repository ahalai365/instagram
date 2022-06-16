// Создание фотокарточек через шаблон (template)
const LIKE_ACTIVE_CLASS = 'element__like_active';

export class Card {
  constructor({ title, src }, templateSelector) {
    this._title = title;
    this._src = src;
    this._clickCallback = () => {};
    
    this._element = document.querySelector(templateSelector).content.querySelector('.element').cloneNode(true);
    const elementFooter = this._element.querySelector('.element__footer');
    const elementImage = this._element.querySelector('.element__img');
    const elementTitle = elementFooter.querySelector('.element__title');

    elementImage.setAttribute('src', src);
    elementImage.setAttribute('alt', title);
    elementTitle.textContent = title;

    elementImage.addEventListener('click', () => {
      this._clickCallback(this._src);
    });

    this._likeButton = this._element.querySelector('.element__like');

    this._likeButton.addEventListener('click', this._likeClickHandler);
  }

    _likeClickHandler = (event) => {
      if (this._likeButton.classList.contains('element__like')) {
        if (this._likeButton.classList.contains(LIKE_ACTIVE_CLASS)) {
          this._likeButton.classList.remove(LIKE_ACTIVE_CLASS);
        } else {
          this._likeButton.classList.add(LIKE_ACTIVE_CLASS);
        }
      }
    }
  
  onClick(callback) {
      this._clickCallback = callback;
  }

  render() {
   return this._element;
  }
}
