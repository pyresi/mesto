const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_job');

const popupEdit = document.querySelector('.popup_type_edit');
const editForm = popupEdit.querySelector('.popup__container');  

const buttonEditClose = popupEdit.querySelector('.popup__button-close');
const buttonEdit = document.querySelector('.profile__button-edit');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

const popupAdd = document.querySelector('.popup_type_add');
const addForm = popupAdd.querySelector('.popup__container');  

const buttonAdd = document.querySelector('.profile__button-add');
const buttonAddClose = popupAdd.querySelector('.popup__button-close');


function add() {
    popupAdd.classList.add('popup_opened');
}
buttonAdd.addEventListener('click', add);


function edit() {
    jobInput.value = profileBio.textContent;
    nameInput.value = profileName.textContent;
    popupEdit.classList.add('popup_opened');
} 

function close(evt) {
    evt.target.parentNode.parentNode.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileBio.textContent = jobInput.value;
    close();
}

buttonEdit.addEventListener('click', edit);
buttonEditClose.addEventListener('click', close);
buttonAddClose.addEventListener('click', close);
editForm.addEventListener('submit', handleFormSubmit);

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

function addElement(element) {
  const currentElement = elementTemplate.cloneNode(true);
  const elementTitle = currentElement.querySelector('.element__title');
  const elementPhoto = currentElement.querySelector('.element__photo');
  elementTitle.innerText = element.name;
  elementPhoto.alt = element.name;
  elementPhoto.src = element.link;

  currentElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  elements.append(currentElement);
}

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(addElement);





