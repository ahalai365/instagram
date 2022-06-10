import { Card } from './cards.js';
import { InputManager } from './input-manager.js';
import { PopupManager } from './popup.js';
import './validation-rules.js';
import { InputValidator } from './validator.js'

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

// Лайки
const LIKE_ACTIVE_CLASS = 'element__like_active';
// Просмотр фотографий и создание карточек
const CARD_TEMPLATE = '#element-template';

const popupView = document.querySelector('.popup_view')
const previewImg = popupView.querySelector('.popup__img');
const ELEMENTS = document.querySelector('.elements');

let viewPopup = new PopupManager(popupView);

function handleClickCard(src) {
  previewImg.src = this._src;
  viewPopup.openPopup();
}

data.forEach((cardData) => {
  const card = new Card(cardData, CARD_TEMPLATE);
  console.log
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

const profileEditForm = document.forms.profileEditForm;
const inputProfileName = profileEditForm.elements.inputProfileName;
const inputProfileSubtitle = profileEditForm.elements.inputProfileSubtitle;

profileEditForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let form = profileEditForm;
  let haveError = form.querySelector('.popup__input_invalid');
  if (haveError) {
    return
  }

  elementProfileName.textContent = inputProfileName.value;
  elementProfileSubtitle.textContent = inputProfileSubtitle.value;

  profilePopup.closePopup();
});

//Добавление фотографий
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add');

let addPopup = new PopupManager(popupAdd);

buttonAdd.addEventListener( 'click', () => {
  addPopup.openPopup();
})

const addForm = document.forms.addForm;
const inputPlaceName = addForm.elements.inputPlaceName;
const inputPlaceBrowse = addForm.elements.inputPlaceBrowse;

addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let form = addForm;
  let haveError = form.querySelector('.popup__input_invalid');
  if (haveError) {
    return
  }

  const element = {
      title: '',
      src: ''
    };

  element.title = inputPlaceName.value;
  element.src = inputPlaceBrowse.value;

  const card = new Card(element, CARD_TEMPLATE);
  card.onClick(handleClickCard);
  ELEMENTS.append(card.render);
  addPopup.closePopup();
});

//Неактивная кнопка
function chooseSubmitButtonState(targetForm) {
  let error = targetForm.querySelector('.popup__input_invalid');
  const button = targetForm.querySelector('.popup__save');

  if (error) {
    button.disabled = true;
    button.classList.add('popup__save_disable', 'opacity');
    return 
  }
  button.disabled = false;
  button.classList.remove('popup__save_disable', 'opacity');
}

const profileFormCb = () => chooseSubmitButtonState(profileEditForm);
const placeFormCb = () => chooseSubmitButtonState(addForm);

//ВАЛИДАЦИЯ
//Имени
let nameValidationRules = {
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
}
const profileNameManager = new InputManager(inputProfileName, new InputValidator(nameValidationRules), profileFormCb);

//Профессии 
let subtitleValidationRules = {
  isRequired: true,
  empty: {
    message: 'Укажите профессию'
  },
  minLength: {
    length: 3,
    message: 'Название слишком короткое'
  }
}
const profileSubtitleManager = new InputManager(inputProfileSubtitle, new InputValidator(subtitleValidationRules), profileFormCb);

//Название места
let placeValidationRules = {
  isRequired: true,
  empty: {
    message: 'Укажите название места'
  },
  minLength: {
    length: 3,
    message: 'Название слишком короткое'
  }
}
const placeNameManager = new InputManager(inputPlaceName, new InputValidator(placeValidationRules), placeFormCb);

//Путь
let linkValidationRules = {
  isRequired: true,
  regExp: {
    rule: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    message: 'Попробуйте начать с https'
  }
}
const placeBrowseManager = new InputManager(inputPlaceBrowse, new InputValidator(linkValidationRules), placeFormCb);