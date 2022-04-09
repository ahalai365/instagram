const POPUP_OPEN_CLASS = 'popup_active';

// попап добавляющий места
const addButton = document.querySelector('.profile__add');
const popupAdd = document.querySelector('.popup_add');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');

function addButtonClickHandler(event) {
  popupAdd.classList.add(POPUP_OPEN_CLASS);
}

function closePopupAddHandler(event) {
  popupAdd.classList.remove(POPUP_OPEN_CLASS);
}

addButton.addEventListener('click', addButtonClickHandler);
popupAddCloseButton.addEventListener('click', closePopupAddHandler);


// попап изменяющий профиль
const editButton = document.querySelector('.profile__edit');
const popupEdit = document.querySelector('.popup_edit');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');

function editButtonClickHandler(event) {
  popupEdit.classList.add(POPUP_OPEN_CLASS);
}

function closePopupEditHandler(event) {
  popupEdit.classList.remove(POPUP_OPEN_CLASS);
}

editButton.addEventListener('click', editButtonClickHandler);
popupEditCloseButton.addEventListener('click', closePopupEditHandler);


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


// Просмотр фотографий
const popupView = document.querySelector('.popup_view');
const popupViewImg = popupView.querySelector('.popup__img');
const popupViewCloseButton = popupView.querySelector('.popup__close');

function openPopupViewHandler(event) {
  if (event.target.classList.contains('element__img')) {
    popupView.classList.add(POPUP_OPEN_CLASS);
    popupViewImg.src = event.target.src;
  }
}

function closePopupViewHandler(event) {
  popupView.classList.remove(POPUP_OPEN_CLASS);
}

popupViewCloseButton.addEventListener('click', closePopupViewHandler);
document.addEventListener('click', openPopupViewHandler);

// тоже самое что и сверху только по красоте. Стрелки в листнеры ещё ок, обычные фун-ии лучше по православному

// document.addEventListener('click', (event) => {
//   console.log('Click on', event.target);
//   if (event.target.classList.contains('elements__img')) {
//     console.log('Click on card!', popupView, popupViewImg);
//     popupView.classList.add(POPUP_OPEN_CLASS);
//     popupViewImg.src = event.target.src;
//   }
// });

// popupView.querySelector('.popup__close').addEventListener('click', () => {
//   popupView.classList.remove(POPUP_OPEN_CLASS);
// });

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
    // const newElement = createElement (data[i]);
    const newElement = createElement2 (data[i]);
    ELEMENTS.append(newElement);
  }
}

createElements (data);


// 1. Длинный заёбный способ
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


// 2. Через шаблон (template)
function createElement2 ({title, src}) {
  const element = document.querySelector('#element-template').content.children[0].cloneNode(true);
  const elementFooter = element.children[1]
  const elementImage = element.children[0]
  const elementTitle = elementFooter.children[0]

  elementImage.setAttribute('src', src);
  elementImage.setAttribute('alt', title);
  elementTitle.textContent = title;
  
  return element
}