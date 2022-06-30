//проверка полей на пустоту
export function validateInputIsEmpty (value) {
  if (value.length > 0) {
    return true
  }
  return false
}

//проверка полей на количество символов
export function validateMinLength (value, MinLength) {
  if (value.length < MinLength) {
    return false
  }
  return true
}

export function validateMaxLength (value, MaxLength) {
  if (value.length > MaxLength) {
    return false
  }
  return true
}

//валидация URL
export function validateRegExp(string, rule) {
  var res = string.match(rule);
  return (res !== null)
};

export function validateEmail(value, execute) {
  console.log(execute(value));
  if (!execute(value)){
    return false
  }
  return true
}

export function validatePasswordMatch(value, password) {
  if (value !== password) {
    return false
  }
return true
};