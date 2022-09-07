import './styles/vendor/reset.css';
import './styles/vendor/normalize.css';
import './styles/pages/index.css';

import { Card } from './javascript/components/cards.js';
import { FormConstructor } from './javascript/components/form.js'
import { PopupManager } from './javascript/components/popup.js';
import { Profile } from './javascript/components/profile.js';
import { Auth } from './javascript/components/auth.js';
import { api } from './javascript/utils/api.js';
import { SessionManager } from './javascript/components/session-manager.js';

// Просмотр фотографий и создание карточек
const CARD_TEMPLATE = '#element-template';

const popupView = document.querySelector('.popup_view')
const previewImg = popupView.querySelector('.popup__img');
const ELEMENTS = document.querySelector('.elements');

const viewPopup = new PopupManager(popupView);

function handleClickCard(src) {
  previewImg.src = src;
  viewPopup.openPopup();
}

function loadCards() {
  api.getAllcards().then((cards) => {
    cards.forEach((cardData) => {
      const card = new Card(cardData, CARD_TEMPLATE);
      auth.onChangeUser((currentUser) => {
        card.notifyUser(currentUser);
      });
      card.onClick(handleClickCard);
      ELEMENTS.append(card.render());
    });
  });
}

//Изменение профиля
const popupEdit = document.querySelector('.popup_edit');
const buttonEdit = document.querySelector('.profile__edit');

const profilePopup = new PopupManager(popupEdit);

buttonEdit.addEventListener( 'click', () => {
  editForm.inputChanger();
  profilePopup.openPopup();
});

//Добавление фотографий
const popupAdd = document.querySelector('.popup_add');
const buttonAdd = document.querySelector('.profile__add');

const addPopup = new PopupManager(popupAdd);

buttonAdd.addEventListener( 'click', () => {
  addForm.clearInputs();
  addPopup.openPopup();
});

//Вход
const popupSignIn = document.querySelector('.popup_sign-in');
const buttonSignIn = document.querySelector('.account__sign-in');

const signInPopup = new PopupManager(popupSignIn);

buttonSignIn.addEventListener( 'click', () => {
  signInForm.clearInputs();
  signInPopup.openPopup();
});

//Ошибка при не ответе сервера
const popupError = document.querySelector('.popup_error');

const errorPopup = new PopupManager(popupError);

//Успешная регистрация
const popupSuccess = document.querySelector('.popup_success');

const successPopup = new PopupManager(popupSuccess);

//Регистрация
const popupRegistration = document.querySelector('.popup_registration');
const buttonRegistration = document.querySelector('.account__registration');

const registrationPopup = new PopupManager(popupRegistration);

buttonRegistration.addEventListener( 'click', () => {
  registrationForm.clearInputs();
  registrationPopup.openPopup();
});

const editForm = new FormConstructor({
  onSubmit: () => {
    api.getUser().then((response) => {
      const newData = profile.updateUser(response.user, editForm.getValues());
      api.updateUser(newData).then(() => {
        profile.onSubmit(newData);
        profilePopup.closePopup();
      });
    });
  },

  rules: {
    name: {
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
    },
    
    description: {
      isRequired: true,
      empty: {
        message: 'Укажите профессию'
      },
      minLength: {
        length: 3,
        message: 'Название слишком короткое'
      }
    }
  },

  config: {
    formSelector: '.form__edit',
    inputClassNameSelector: '.popup__input',
    submitSelector: '.popup__submit',
  }
});

const addForm = new FormConstructor({
  onSubmit: () => {
    api.createCard( 
      addForm.getValues() 
    ).then((cardData) => {
      const card = new Card(cardData, CARD_TEMPLATE);
      card.onClick(handleClickCard);
      ELEMENTS.append(card.render());
      addPopup.closePopup();
    });
  },

  rules: {
    title: {
      isRequired: true,
      empty: {
        message: 'Укажите название места'
      },
      minLength: {
        length: 3,
        message: 'Название слишком короткое'
      },
    },

    url: {
      isRequired: true,
      empty: {
        message: 'Укажите адрес изображения'
      },
      regExp: {
        rule: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        message: 'Попробуйте начать с https'
      }
    }
  },

  config: {
    formSelector: '.form__add',
    inputClassNameSelector: '.popup__input',
    submitSelector: '.popup__submit',
  }
});

//Форма входа
const signInForm = new FormConstructor({
  onSubmit: () => {
    sessionManager.login(signInForm.getValues()
    ).catch(() => {
      errorPopup.openPopup();
      console.log('Сервер сломался!');
    }).then(() => {
      // loadCards();
      signInPopup.closePopup();
    });
  },

  rules: {
    email: {
      isRequired: true,
      empty: {
        message: 'Укажите e-mail'
      },
      fn: {
        execute: function(value) { return value.includes('@'); },
        message: 'Это не e-mail'
      }
    },
    
    password: {
      isRequired: true,
      empty: {
        message: 'Укажите пароль'
      },
    }
  },

  config: {
    formSelector: '.form__sign-in',
    inputClassNameSelector: '.popup__input',
    submitSelector: '.popup__sign-in',
  }
});

//Выход из аккаунта
const exitButton = document.querySelector('.account__exit');
exitButton.addEventListener('click', () => {
  sessionManager.logout();
});

//Форма регистрации
function onRegistrComplete() {
  successPopup.openPopup();
}

const registrationForm = new FormConstructor({
  onSubmit: () => {
    api.register(
      registrationForm.getValues()
    ).then(() => {
      onRegistrComplete();
    }).catch(() => {
      errorPopup.openPopup();
      console.log('Сервер сломался!');
    }).then(() => {
      registrationPopup.closePopup();
    });
  },
  
  rules: {
    email: {
      isRequired: true,
      empty: {
        message: 'Укажите e-mail'
      },
      regExp: {
        rule: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Это не e-mail'
      }
    },
    
    password: {
      isRequired: true,
      empty: {
        message: 'Укажите пароль'
      },
    },

    passwordRepit: {
      isRequired: true,
      empty: {
        message: 'Повторите пароль'
      },
      fn: {
        execute: function(value, values) {
          if (value === values.password) {
            return true
          }
        },
        message: 'Пароль не совпадает'
      }
    },
    
    name: {
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
    },

    description: {
      isRequired: true,
      empty: {
        message: 'Укажите профессию'
      },
      minLength: {
        length: 3,
        message: 'Название слишком короткое'
      }
    },

    avatar: {
      isRequired: true,
      empty: {
        message: 'Укажите адрес изображения'
      },
      regExp: {
        rule: /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
        message: 'Попробуйте начать с https'
      }
    }

  },

  config: {
    formSelector: '.form__registration',
    inputClassNameSelector: '.popup__input',
    submitSelector: '.popup__registration',
  }
});

const auth = new Auth({
  config: {
    profileSelector: '.profile',
    signInSelector: '.account__sign-in',
    registrationSelector: '.account__registration',
    authSelector: '.account__auth',
    exitSelector: '.account__exit',
  },
});

const profile = new Profile({
  config: {
    nameSelector: '.profile__name',
    descriptionSelector: '.profile__subtitle',
    avatarSelector: '.profile__avatar',
    authSelector: '.account__auth',
  }
});

const sessionManager = new SessionManager(auth, profile);
sessionManager.start().then(() => {
  loadCards();
});