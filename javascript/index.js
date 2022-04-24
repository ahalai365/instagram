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
  clearInput(title);
  clearInput(src);
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
const POPUP_INPUT_INVALID = 'popup__input_invalid';

function ivalidInput(currentInput) {
  currentInput.classList.add(POPUP_INPUT_INVALID);
}

function removeInvalid(currentInput) {
  currentInput.classList.remove(POPUP_INPUT_INVALID);
}
//отчистка инпута
function clearInput(currentInput) {
  currentInput.value = '';
}

//Изменение профиля

const profileEditForm = document.forms.profileEditForm
const profileName = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditName = profileEditForm.elements.profileName;
const profileEditSubtitle = profileEditForm.elements.profileProfession;

profileEditForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (profileEditName.value === '') {
    ivalidInput(profileEditName);
    profileEditName.setAttribute('placeholder', 'Введите имя');
    
    removeInvalid(profileEditSubtitle)
    if (profileEditSubtitle.value === '') {
      ivalidInput(profileEditSubtitle);
      profileEditSubtitle.setAttribute('placeholder', 'Укажите профессию');  
    }
    return

  } else {

    removeInvalid(profileEditName);
    if (profileEditSubtitle.value === '') {
      ivalidInput(profileEditSubtitle);
      profileEditSubtitle.setAttribute('placeholder', 'Укажите профессию'); 

      if (profileEditName.value === '') {
        ivalidInput(profileEditName);
        profileEditName.setAttribute('placeholder', 'Введите имя');
      }
      return
    }
  }

  profileName.textContent = profileEditName.value;
  profileSubtitle.textContent = profileEditSubtitle.value;

  removeInvalid(profileEditSubtitle)
  removeInvalid(profileEditName)
  closePopup(popupEdit);
});

// добавить место
const addForm = document.forms.addForm;
const placeName = addForm.elements.placeName;
const placeBrowse = addForm.elements.placeBrowse;
const title = addForm.elements.placeName;
const src = addForm.elements.placeBrowse;

addForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const element = [{
      title: '',
      src: ''
    }];

  element[0].title = title.value;
  element[0].src = src.value;

  if (title.value === '') {
    ivalidInput(placeName);
    title.setAttribute('placeholder', 'Введите название места');

    removeInvalid(placeBrowse);
    if ((src.value === '')) {
      ivalidInput(placeBrowse);
      src.setAttribute('placeholder', 'Укажите путь к фотографии');
    }
    return

  } else {

    removeInvalid(placeName);
    if ((src.value === '')) {
      ivalidInput(placeBrowse);
      src.setAttribute('placeholder', 'Укажите путь к фотографии');
      if (title.value === '') {
        ivalidInput(placeName);
        title.setAttribute('placeholder', 'Введите название места');
      }
      return
    }
  } 

  createElements (element);
  removeInvalid(placeName);
  removeInvalid(placeBrowse);
  closePopup(popupAdd);
});