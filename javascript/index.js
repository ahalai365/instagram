import './cards.js';
import './input-manager.js'
import './likes.js';
import './popup.js';
import { popupEdit, popupAdd } from './popup.js';
import { closePopup } from './popup.js';
import './validation-rules.js';


//Изменение профиля, отправка формы
const elementProfileName = document.querySelector('.profile__name');
const elementProfileSubtitle = document.querySelector('.profile__subtitle');

const profileEditForm = document.forms.profileEditForm
const inputProfileName = profileEditForm.elements.inputProfileName;
const inputProfileSubtitle = profileEditForm.elements.inputProfileSubtitle;
// const profileInputFields = document.querySelectorAll('.popup_edit .field');

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
export const inputPlaceName = addForm.elements.inputPlaceName;
export const inputPlaceBrowse = addForm.elements.inputPlaceBrowse;
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