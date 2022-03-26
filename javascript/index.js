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
const likeButton = document.querySelector('.elements__like');
const LIKE_ACTIVE_CLASS = 'elements__like_active';

function likeClickHandler(event) {
  
  if (!event.target.classList.contains('elements__like_active')) {
    event.target.classList.add(LIKE_ACTIVE_CLASS);
    event.target.setAttribute('src','./images/like.png')
  } else {
    event.target.classList.remove(LIKE_ACTIVE_CLASS);
    event.target.setAttribute('src','./images/dislike.png')
  }
}

document.addEventListener('click', likeClickHandler);


// Просмотр фотографий
const popupView = document.querySelector('.popup_view');
const popupViewImg = popupView.querySelector('.popup__img');
const popupViewCloseButton = popupView.querySelector('.popup__close');

function openPopupViewHandler(event) {
  if (event.target.classList.contains('elements__img')) {
    popupView.classList.add(POPUP_OPEN_CLASS);
    popupViewImg.src = event.target.src;
  }
}

function closePopupViewHandler(event) {
  popupView.classList.remove(POPUP_OPEN_CLASS);
}

popupViewCloseButton.addEventListener('click', closePopupViewHandler);
document.addEventListener('click', openPopupViewHandler);

// тоже самое что и сверху только по красоте листнеры ещё ок, обычные фун-ии лучше по православному

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