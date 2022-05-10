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
  clearInput(placeName);
  clearInput(placeBrowse);
  openPopup(popupAdd)
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
    const newElement = createElement2 (data[i]);
    // const newElement = createElement (data[i]);
    ELEMENTS.append(newElement);
  }
}

createElements (data);

// 1. Через шаблон (template)
function createElement2 ({title, src}) {
  const element = document.querySelector('#element-template').content.children[0].cloneNode(true);
  const elementFooter = element.querySelector('.element__footer');
  const elementImage = element.querySelector('.element__img');
  const elementTitle = elementFooter.querySelector('.element__title');

  elementImage.setAttribute('src', src);
  elementImage.setAttribute('alt', title);
  elementTitle.textContent = title;
  
  return element
}

// 2. Длинный заёбный способ
function createElement ({title, src}) {
  const element = document.createElement('div');
  const elementImage = document.createElement('img');
  const elementFooter = document.createElement('div');
  const elementTitle = document.createElement('h3');
  const elementButtonLike = document.createElement('button');

  element.classList.add('element');
  
  element.append(elementImage);
  elementImage.classList.add('element__img');
  elementImage.setAttribute('src', src);
  elementImage.setAttribute('alt', title);

  element.append(elementFooter);
  elementFooter.classList.add('element__footer');

  elementFooter.append(elementTitle);
  elementTitle.classList.add('element__title');
  elementTitle.textContent = title;

  elementFooter.append(elementButtonLike);
  elementButtonLike.classList.add('element__like');
  elementButtonLike.classList.add('opacity');

  return element;
}

//Инвалид инпут
function removeInvalid(errors) {
  errors = document.querySelectorAll('.popup__input_invalid');
  for (let i = 0; i < errors.length; i++) {
    errors[i].remove()
  }
}

function createError (inputField, someText) {
  let error = document.createElement('div');
  error.className = 'popup__input_invalid popup__input';
  inputField.parentElement.insertBefore(error, inputField.nextSibling);
  error.innerHTML = someText; 
}

//отчистка инпута
function clearInput(currentInput) {
  currentInput.value = '';
}

//проверка полей на пустоту
function checkInput (inputFields, someText) {
  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields[i].value) {
      checkMassive.push(true);  
    } else { 
      createError (inputFields[i], someText[i]);
      checkMassive.push(false);
    }
  }
}

//проверка полей на количество символов
function checkInputValueName (inputField, someText1, someText2) {
  if (inputField.value.length < 3) {
    createError (inputField, someText1);
    checkMassive.push(false);
  } else {
    if (inputField.value.length > 20) {
      createError (inputField, someText2);
      checkMassive.push(false);
    } else {
      checkMassive.push(true);
    }
  }
}

function checkInputValueSubtitle (inputField, someText) {
  if (inputField.value.length < 3) {
    createError (inputField, someText);
    checkMassive.push(false);
  } else {
    checkMassive.push(true); 
  }
}

//Изменение профиля
const profileEditForm = document.forms.profileEditForm
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileInputFields = document.querySelectorAll('.popup_edit .field');
const profileEditName = profileEditForm.elements.profileName;
const profileEditSubtitle = profileEditForm.elements.profileProfession;
let checkMassive = [];

profileEditForm.addEventListener('submit', (e) => {
  checkMassive = [];

  e.preventDefault();
  removeInvalid();

  checkInput(profileInputFields, ['Укажите имя', 'Укажите деятельность']);
  checkInputValueName(profileEditName, 'Имя слишком короткое', 'Имя слишком длинное');
  checkInputValueSubtitle(profileEditSubtitle, 'Слишком короткое название');

  if (checkMassive.some(function(e) {return e === false})) {
    return
  }

  profileName.textContent = profileEditName.value;
  profileSubtitle.textContent = profileEditSubtitle.value;

  closePopup(popupEdit);
});

// добавить место
const addForm = document.forms.addForm;
const placeName = addForm.elements.placeName;
const placeBrowse = addForm.elements.placeBrowse;
const addFormFields = document.querySelectorAll('.popup_add .field');

addForm.addEventListener('submit', (e) => {
  checkMassive = [];

  e.preventDefault();
  removeInvalid();

  checkInput(addFormFields, ['Укажите название', 'Укажите путь']);
  console.log(checkMassive);
  if (checkMassive.some(function(e) {return e === false})) {
    return
  }

  const element = [{
      title: '',
      src: ''
    }];

  element[0].title = placeName.value;
  element[0].src = placeBrowse.value;

  createElements (element);
  closePopup(popupAdd);
});