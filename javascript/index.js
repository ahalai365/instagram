const POPUP_OPEN_CLASS = 'popup_active';

// попап мест и профиля
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add');
const popupAddCloseButton = popupAdd.querySelector('.popup__close');

const popupEdit = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__edit');
const popupEditCloseButton = popupEdit.querySelector('.popup__close');



function openPopup(targetPopup) {
  targetPopup.classList.add(POPUP_OPEN_CLASS);
}

function closePopup(targetPopup) {
  targetPopup.classList.remove(POPUP_OPEN_CLASS);
}

buttonAdd.addEventListener('click', ()=>openPopup(popupAdd));
buttonEdit.addEventListener('click', ()=>openPopup(popupEdit));
popupAddCloseButton.addEventListener('click', ()=>closePopup(popupAdd));
popupEditCloseButton.addEventListener('click', ()=>closePopup(popupEdit));

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

popupViewCloseButton.addEventListener('click', ()=>closePopup(popupView));
document.addEventListener('click', openPopupViewHandler);

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
  const elementFooter = element.querySelector('.element__footer');
  const elementImage = element.querySelector('.element__img');
  const elementTitle = elementFooter.querySelector('.element__title');

  elementImage.setAttribute('src', src);
  elementImage.setAttribute('alt', title);
  elementTitle.textContent = title;
  
  return element
}