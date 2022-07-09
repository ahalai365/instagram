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