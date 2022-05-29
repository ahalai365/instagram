import './cards.js';
import { InputManager } from './input-manager.js'
import './likes.js';
import './popup.js';
import { popupEdit, popupAdd } from './popup.js';
import { closePopup } from './popup.js';
import './validation-rules.js';

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
// const addFormFields = document.querySelectorAll('.popup_add .field');

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

  createElements (element);
  closePopup(popupAdd);
});

//Валидация
// inputProfileName.addEventListener('input', () => {
//   let form = profileEditForm;
//   let input = inputProfileName;

//   let isEmpty = validateInputIsEmpty(input.value);
//   let isMinLength = validateMinLength(input.value, 3);
//   let isMaxLength = validateMaxLength(input.value, 20);
  
//   let textError = [];

//   removeError(input);
//   chooseSubmitButtonState(form, input, textError[0]);

//   if (!isEmpty) {
//     input.classList.add('popup__input_invalid');
//     textError.push('Укажите имя');
//   }

//   if (!isMinLength) {
//     input.classList.add('popup__input_invalid');
//     textError.push('Имя слишком короткое');
//   }

//   if (!isMaxLength) {
//     input.classList.add('popup__input_invalid');
//     textError.push('Имя слишком длинное');
//   }

//   chooseSubmitButtonState(form, input, textError[0]);
// });

// inputProfileSubtitle.addEventListener('input', () => {
//   let form = profileEditForm;
//   let input = inputProfileSubtitle;

//   let isEmpty = validateInputIsEmpty(input.value);
//   let isMinLength = validateMinLength(input.value, 3);
  
//   let textError = [];

//   removeError(input);
//   chooseSubmitButtonState(form, input, textError[0]);

//   if (!isEmpty) {
//     input.classList.add('popup__input_invalid');
//     textError.push('Укажите деятельность');
//   }
//   if (!isMinLength) {
//     input.classList.add('popup__input_invalid');
//     textError.push('Слишком короткое');
//   }

//   chooseSubmitButtonState(form, input, textError[0]);
// });

// inputPlaceName.addEventListener('input', () => {
//   let form = addForm;
//   let input = inputPlaceName;

//   let isEmpty = validateInputIsEmpty(input.value);
//   let isMinLength = validateMinLength(input.value, 3);
  
//   let textError = [];

//   removeError(input);
//   chooseSubmitButtonState(form, input, textError[0]);

//   if (!isEmpty) {
//     input.classList.add('popup__input_invalid');
//     textError.push('Укажите название');
//   }
//   if (!isMinLength) {
//     input.classList.add('popup__input_invalid');
//     textError.push('Слишком короткое');
//   }

//  chooseSubmitButtonState(form, input, textError[0]);
// });

// inputPlaceBrowse.addEventListener('input', () => {
//   let form = addForm;
//   let input = inputPlaceBrowse;

//   let isEmpty = validateInputIsEmpty(input.value);
//   let isValidURL = validateInputURL(input.value);
  
//   let textError = [];

//   removeError(input);
//   chooseSubmitButtonState(form, input, textError[0]);

//   if (!isEmpty) {
//     input.classList.add('popup__input_invalid');
//     textError.push('Укажите путь');
//   }
//   if (!isValidURL) {
//     input.classList.add('popup__input_invalid');
//     textError.push('Адрес должен содержать https');
//   }

//   chooseSubmitButtonState(form, input, textError[0]);
// });

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
  isMin: 3,
  isMax: 20
}
const profileNameManager = new InputManager(inputProfileName, nameValidationRules, profileFormCb);

//Профессии 
let subtitleValidationRules = {
  isRequired: true,
  isMin: 3
}
const profileSubtitleManager = new InputManager(inputProfileSubtitle, subtitleValidationRules, profileFormCb);

//Название места
let placeValidationRules = {
  isRequired: true,
  isMin: 3,
}
const placeNameManager = new InputManager(inputPlaceName, placeValidationRules, placeFormCb);

//Путь
let linkValidationRules = {
  isRequired: true,
  regExp: {
    rule: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
    text: 'Попробуйте начать с https'
  }
}
const placeBrowseManager = new InputManager(inputPlaceBrowse, linkValidationRules, placeFormCb);