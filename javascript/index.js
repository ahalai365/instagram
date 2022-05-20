const POPUP_OPEN_CLASS = 'popup_active';

// открыть/закрыть попап
function openPopup(targetPopup) {
  targetPopup.classList.add(POPUP_OPEN_CLASS);
}

function closePopup(targetPopup) {
  targetPopup.classList.remove(POPUP_OPEN_CLASS);
}

// попап мест и профиля
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');

buttonAdd.addEventListener('click', ()=> {
  clearInput(inputPlaceName);
  clearInput(inputPlaceBrowse);
  openPopup(popupAdd);
});
popupAddCloseButton.addEventListener('click', ()=>closePopup(popupAdd));

const popupEdit = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__edit');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');

buttonEdit.addEventListener('click', ()=>openPopup(popupEdit));
popupEditCloseButton.addEventListener('click', ()=>closePopup(popupEdit));

// Просмотр фотографий
const popupView = document.querySelector('.popup_view');
const popupViewImg = popupView.querySelector('.popup__img');
const popupViewCloseButton = popupView.querySelector('.popup__close');

function openPopupViewHandler(event) {
  if (event.target.classList.contains('element__img')) {
    openPopup(popupView);
    popupViewImg.src = event.target.src;
  }
}

popupViewCloseButton.addEventListener('click', ()=>closePopup(popupView));
document.addEventListener('click', openPopupViewHandler);

// лукасы
const likeButton = document.querySelector('.element__like');
const LIKE_ACTIVE_CLASS = 'element__like_active';

function likeClickHandler(event) {
  if (event.target.classList.contains('element__like')) {
    if (event.target.classList.contains(LIKE_ACTIVE_CLASS)) {
      event.target.classList.remove(LIKE_ACTIVE_CLASS);
    } else {
      event.target.classList.add(LIKE_ACTIVE_CLASS);
    }
  }
}

document.addEventListener('click', likeClickHandler);

//База фотокарточек
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

// Создание фотокарточек
const ELEMENTS = document.querySelector('.elements');

function createElements (data) {
  for (let i = 0; i < data.length; i++) {
    const newElement = createElement (data[i]);
    ELEMENTS.append(newElement);
  }
}

createElements (data);

//Через шаблон (template)
function createElement ({title, src}) {
  const element = document.querySelector('#element-template').content.querySelector('.element').cloneNode(true);
  const elementFooter = element.querySelector('.element__footer');
  const elementImage = element.querySelector('.element__img');
  const elementTitle = elementFooter.querySelector('.element__title');

  elementImage.setAttribute('src', src);
  elementImage.setAttribute('alt', title);
  elementTitle.textContent = title;
  
  return element
}

//Изменение профиля, отправка формы
const elementProfileName = document.querySelector('.profile__name');
const elementProfileSubtitle = document.querySelector('.profile__subtitle');

const profileEditForm = document.forms.profileEditForm
const inputProfileName = profileEditForm.elements.inputProfileName;
const inputProfileSubtitle = profileEditForm.elements.inputProfileSubtitle;
const profileInputFields = document.querySelectorAll('.popup_edit .field');

profileEditForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let form = profileEditForm;
  let haveError = validatePresenceError(form);
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
const addFormFields = document.querySelectorAll('.popup_add .field');

addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let form = addForm;
  let haveError = validatePresenceError(form);
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

//отчистка инпута
function clearInput(currentInput) {
  currentInput.value = '';
}

//Валидация
inputProfileName.addEventListener('input', () => {
  let form = profileEditForm;
  let input = inputProfileName;

  let isEmpty = validateInputIsEmpty(input.value);
  let isMinLength = validateMinLength(input.value, 3);
  let isMaxLength = validateMaxLength(input.value, 20);

  removeError(input);
  removeinActiveButton(form);

  if (!isEmpty) {
    createError (input, 'Укажите имя');
  }
  if (!isMinLength) {
    createError (input, 'Имя слишком короткое');
  }
  if (!isMaxLength) {
    createError (input, 'Имя слишком длинное');
  }

  let haveError = validatePresenceError(form);

  if (haveError) {
    inActiveButton(form);
  }
});

inputProfileSubtitle.addEventListener('input', () => {
  let form = profileEditForm;
  let input = inputProfileSubtitle;

  let isEmpty = validateInputIsEmpty(input.value);
  let isMinLength = validateMinLength(input.value, 3);
  
  removeError(input);
  removeinActiveButton(form);

  if (!isEmpty) {
    createError (input, 'Укажите деятельность');
  }
  if (!isMinLength) {
    createError (input, 'Слишком короткое');
  }

  let haveError = validatePresenceError(form);

  if (haveError) {
    inActiveButton(form);
  }
});

inputPlaceName.addEventListener('input', () => {
  let form = addForm;
  let input = inputPlaceName;

  let isEmpty = validateInputIsEmpty(input.value);
  let isMinLength = validateMinLength(input.value, 3);
  
  removeError(input);
  removeinActiveButton(form);

  if (!isEmpty) {
    createError (input, 'Укажите название');
  }
  if (!isMinLength) {
    createError (input, 'Слишком короткое');
  }

  let haveError = validatePresenceError(form);

  if (haveError) {
    inActiveButton(form);
  }
});

inputPlaceBrowse.addEventListener('input', () => {
  let form = addForm;
  let input = inputPlaceBrowse;

  let isEmpty = validateInputIsEmpty(input.value);
  let isValidURL = validateInputURL(input.value);
  
  removeError(input);
  removeinActiveButton(form);

  if (!isEmpty) {
    createError (input, 'Укажите путь');
  }
  if (!isValidURL) {
    createError (input, 'Укажите верный путь');
  }

  let haveError = validatePresenceError(form);

  if (haveError) {
    inActiveButton(form);
  }
});

//Создание и удаление ошибок
function createError (targetInput, errorText) {
  targetInput.classList.add('popup__input_invalid');

  let error = document.createElement('div');
  error.className = `popup__error popup__error--${targetInput.name}`;
  error.innerHTML = errorText; 
  targetInput.parentElement.insertBefore(error, targetInput.nextSibling);
}

function removeError(targetInput) {
  let errors = document.querySelectorAll(`.popup__error--${targetInput.name}`);
  targetInput.classList.remove('popup__input_invalid');
  errors.forEach(function(e) {
    e.remove();
  })
}

//Неактивная кнопка
function inActiveButton(targetForm) {
  const button = targetForm.querySelector('.popup__save');
  return button.classList.add('opacity_invalid');
}

function removeinActiveButton(targetForm) {
  const button = targetForm.querySelector('.popup__save');
  return button.classList.remove('opacity_invalid');
}

function validatePresenceError(targetForm) {
  let error = targetForm.querySelector('.popup__error');

  if (error) {
    return true
  }
  return false
}


//проверка полей на пустоту
function validateInputIsEmpty (value) {
  if (value.length > 0) {
    return true
  }
  return false
}
//проверка полей на количество символов
function validateMinLength (value, MinLength) {
  if (value.length < MinLength) {
    return false
  }
  return true
}
function validateMaxLength (value, MaxLength) {
  if (value.length > MaxLength) {
    return false
  }
  return true
}

function validateInputURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};