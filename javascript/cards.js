// Создание фотокарточек через шаблон (template)
export function createElement ({title, src}) {
  const ELEMENTS = document.querySelector('.elements');
  
  const element = document.querySelector('#element-template').content.querySelector('.element').cloneNode(true);
  const elementFooter = element.querySelector('.element__footer');
  const elementImage = element.querySelector('.element__img');
  const elementTitle = elementFooter.querySelector('.element__title');

  elementImage.setAttribute('src', src);
  elementImage.setAttribute('alt', title);
  elementTitle.textContent = title;
  
  return ELEMENTS.append(element);
}