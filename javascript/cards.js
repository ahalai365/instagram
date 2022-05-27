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
    const newElement = createElement (data[i]);
    ELEMENTS.append(newElement);
  }
}

createElements (data);

//Через шаблон (template)
function createElement ({title, src}) {
  const element = document.querySelector('#element-template').content.querySelector('.element').cloneNode(true);
  const elementFooter = element.querySelector('.element__footer');
  const elementImage = element.querySelector('.element__img');
  const elementTitle = elementFooter.querySelector('.element__title');

  elementImage.setAttribute('src', src);
  elementImage.setAttribute('alt', title);
  elementTitle.textContent = title;
  
  return element
}