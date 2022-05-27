//Валидация
inputProfileName.addEventListener('input', () => {
  let form = profileEditForm;
  let input = inputProfileName;

  let isEmpty = validateInputIsEmpty(input.value);
  let isMinLength = validateMinLength(input.value, 3);
  let isMaxLength = validateMaxLength(input.value, 20);
  
  let textError = [];

  removeError(input);
  chooseSubmitButtonState(form, input, textError[0]);

  if (!isEmpty) {
    input.classList.add('popup__input_invalid');
    textError.push('Укажите имя');
  }

  if (!isMinLength) {
    input.classList.add('popup__input_invalid');
    textError.push('Имя слишком короткое');
  }

  if (!isMaxLength) {
    input.classList.add('popup__input_invalid');
    textError.push('Имя слишком длинное');
  }

  chooseSubmitButtonState(form, input, textError[0]);
});

inputProfileSubtitle.addEventListener('input', () => {
  let form = profileEditForm;
  let input = inputProfileSubtitle;

  let isEmpty = validateInputIsEmpty(input.value);
  let isMinLength = validateMinLength(input.value, 3);
  
  let textError = [];

  removeError(input);
  chooseSubmitButtonState(form, input, textError[0]);

  if (!isEmpty) {
    input.classList.add('popup__input_invalid');
    textError.push('Укажите деятельность');
  }
  if (!isMinLength) {
    input.classList.add('popup__input_invalid');
    textError.push('Слишком короткое');
  }

  chooseSubmitButtonState(form, input, textError[0]);
});

inputPlaceName.addEventListener('input', () => {
  let form = addForm;
  let input = inputPlaceName;

  let isEmpty = validateInputIsEmpty(input.value);
  let isMinLength = validateMinLength(input.value, 3);
  
  let textError = [];

  removeError(input);
  chooseSubmitButtonState(form, input, textError[0]);

  if (!isEmpty) {
    input.classList.add('popup__input_invalid');
    textError.push('Укажите название');
  }
  if (!isMinLength) {
    input.classList.add('popup__input_invalid');
    textError.push('Слишком короткое');
  }

 chooseSubmitButtonState(form, input, textError[0]);
});

inputPlaceBrowse.addEventListener('input', () => {
  let form = addForm;
  let input = inputPlaceBrowse;

  let isEmpty = validateInputIsEmpty(input.value);
  let isValidURL = validateInputURL(input.value);
  
  let textError = [];

  removeError(input);
  chooseSubmitButtonState(form, input, textError[0]);

  if (!isEmpty) {
    input.classList.add('popup__input_invalid');
    textError.push('Укажите путь');
  }
  if (!isValidURL) {
    input.classList.add('popup__input_invalid');
    textError.push('Адрес должен содержать https');
  }

  chooseSubmitButtonState(form, input, textError[0]);
});

//Создание и удаление ошибок
function createError (targetInput, errorText) {
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
//Мне кажется тут я наговнокодил, потому что функция работает с кнопкой, а я в инпут лезу :/
function chooseSubmitButtonState(targetForm, input, textError) {
  let error = targetForm.querySelector('.popup__input_invalid');
  const button = targetForm.querySelector('.popup__save');

  if (error) {
    button.disabled = true;
    createError (input, textError);
    input.classList.remove('opacity' && 'popup__input_focus');
    button.classList.add('popup__save_disable');
    
  }
  button.disabled = false;
  input.classList.add('opacity' && 'popup__input_focus');
  button.classList.remove('popup__save_disable');
  
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