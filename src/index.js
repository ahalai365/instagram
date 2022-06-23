import './public/pages/index.css';
import './public/vendor/reset.css';
import './public/vendor/normalize.css';

import { Card } from '../javascript/cards.js';
import { FormConstructor } from '../javascript/form.js'
import { PopupManager } from '../javascript/popup.js';

//Создание карточек
const data = [
  {
    title: 'Карачаевск',
    src: './images/1.png'
  },
  {
    title: 'Гора Эльбрус',
    src: './images/2.png'
  },
  {
    title: 'Домбай',
    src: './images/3.png'
  },
  {
    title: 'Гора Эльбрус',
    src: './images/2.png'
  },
  {
    title: 'Домбай',
    src: './images/3.png'
  },
  {
    title: 'Карачаево-Черкесская Республика',
    src: './images/1.png'
  }
]

// Просмотр фотографий и создание карточек
const CARD_TEMPLATE = '#element-template';

const popupView = document.querySelector('.popup_view')
const previewImg = popupView.querySelector('.popup__img');
const ELEMENTS = document.querySelector('.elements');

let viewPopup = new PopupManager(popupView);

function handleClickCard(src) {
  previewImg.src = src;
  viewPopup.openPopup();
}

data.forEach((cardData) => {
  const card = new Card(cardData, CARD_TEMPLATE);
  card.onClick(handleClickCard);
  ELEMENTS.append(card.render());
});

//Изменение профиля
const popupEdit = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__edit');

let profilePopup = new PopupManager(popupEdit);

buttonEdit.addEventListener( 'click', () => {
  profilePopup.openPopup();
})

const elementProfileName = document.querySelector('.profile__name');
const elementProfileSubtitle = document.querySelector('.profile__subtitle');

//Добавление фотографий
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add');

let addPopup = new PopupManager(popupAdd);

buttonAdd.addEventListener( 'click', () => {
  addPopup.openPopup();
})

const editForm = new FormConstructor({
  onSubmit: (inputElement) => {
    elementProfileName.textContent = inputElement[0].value;
    elementProfileSubtitle.textContent = inputElement[1].value;

    profilePopup.closePopup();
  },

  rules: {
    title: {
      isRequired: true,
      empty: {
        message: 'Укажите имя'
      },
      minLength: {
        length: 3,
        message: 'Имя слишком короткое'
      },
      maxLength: {
        length: 20,
        message: 'Имя слишком длинное'
      }
    },
    
    subtitle: {
      isRequired: true,
      empty: {
        message: 'Укажите профессию'
      },
      minLength: {
        length: 3,
        message: 'Название слишком короткое'
      }
    }
  },

  config: {
    formSelector: '.form__edit',
    inputClassNameSelector: '.popup__input',
    inputErrorClassName: 'popup__error',
    submitSelector: '.popup__save',
  }
});

const addForm = new FormConstructor({
  onSubmit: (inputElement) => {
  const element = {
  title: '',
  src: ''
  };

  element.title = inputElement[0].value;
  element.src = inputElement[1].value;

  const card = new Card(element, CARD_TEMPLATE);
  card.onClick(handleClickCard);
  ELEMENTS.append(card.render);
  addPopup.closePopup();
  },

  rules: {
    title: {
      isRequired: true,
      empty: {
        message: 'Укажите название места'
      },
      minLength: {
        length: 3,
        message: 'Название слишком короткое'
      },
    },

    browse: {
      isRequired: true,
      empty: {
        message: 'Укажите адрес изображения'
      },
      regExp: {
        rule: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        message: 'Попробуйте начать с https'
      }
    }
  },

  config: {
    formSelector: '.form__add',
    inputClassNameSelector: '.popup__input',
    inputErrorClassName: 'popup__error',
    submitSelector: '.popup__save',
  }
});

