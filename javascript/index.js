import { createElement } from './cards.js';
import { InputManager } from './input-manager.js';
import './likes.js';
import { PopupManager } from './popup.js';
import './validation-rules.js';

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
data.forEach(createElement);


const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');

const popupEdit = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__edit');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');

const viewElement = document.querySelector('.element__img');
const popupView = document.querySelector('.popup_view');
const popupViewImg = popupView.querySelector('.popup__img');
const popupViewCloseButton = popupView.querySelector('.popup__close');

// попапы мест и профиля
const openAddPopup = new PopupManager(buttonAdd, popupAdd);
const closeAddPopup = new PopupManager(popupAddCloseButton, popupAdd)

const openEditPopup = new PopupManager(buttonEdit, popupEdit);
const closeEditPopup = new PopupManager(popupEditCloseButton, popupEdit)

// Просмотр фотографий
function PopupImgHandler(viewElement) {
    popupViewImg.src = viewElement.src;
}

const PopupImgHandlerCb = () => PopupImgHandler(viewElement);

const openViewPopup = new PopupManager(viewElement, popupView, PopupImgHandlerCb);
const closeViewPopup = new PopupManager(popupViewCloseButton, popupView)

//Изменение профиля, отправка формы
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

  closePopup(popupEdit);
});

// добавить место, отправка формы
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

  const element = [{
      title: '',
      src: ''
    }];

  element[0].title = inputPlaceName.value;
  element[0].src = inputPlaceBrowse.value;

  createElement(element);
  closePopup(popupAdd);
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
const profileNameManager = new InputManager(inputProfileName, nameValidationRules, profileFormCb);

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
const profileSubtitleManager = new InputManager(inputProfileSubtitle, subtitleValidationRules, profileFormCb);

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
const placeNameManager = new InputManager(inputPlaceName, placeValidationRules, placeFormCb);

//Путь
let linkValidationRules = {
  isRequired: true,
  regExp: {
    rule: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    message: 'Попробуйте начать с https'
  }
}
const placeBrowseManager = new InputManager(inputPlaceBrowse, linkValidationRules, placeFormCb);