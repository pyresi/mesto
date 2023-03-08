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

const inputTitle = popupAdd.querySelector('.popup__input_type_title');
const inputLink = popupAdd.querySelector('.popup__input_type_link');

const popupPhoto = document.querySelector('.popup_type_photo');
const buttonPhotoClose = popupPhoto.querySelector('.popup__button-close');
const photo = popupPhoto.querySelector('.popup__photo');
const photoSubtitle = popupPhoto.querySelector('.popup__photo-subtitle');

function deleteCard(evt) {
  evt.target.parentNode.remove();
}

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

function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileBio.textContent = jobInput.value;
    close(evt);
}

buttonEdit.addEventListener('click', edit);
buttonEditClose.addEventListener('click', close);
buttonAddClose.addEventListener('click', close);
buttonPhotoClose.addEventListener('click', close);
editForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmitAdd(evt) {
  evt.preventDefault();
  inputTitle.value;
  addElement({name: inputTitle.value, link: inputLink.value}, prepend=true);
  close(evt);
}
addForm.addEventListener('submit', handleFormSubmitAdd);

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

function addElement(element, prepend=false) {
  const currentElement = elementTemplate.cloneNode(true);

  currentElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  currentElement.querySelector('.element__trash').addEventListener('click', deleteCard);

  const elementTitle = currentElement.querySelector('.element__title');
  elementTitle.innerText = element.name;
  
  const elementPhoto = currentElement.querySelector('.element__photo');
  elementPhoto.alt = element.name;
  elementPhoto.src = element.link;

  elementPhoto.addEventListener('click', openPhoto);

  if (prepend) {
    elements.prepend(currentElement);
  } else {
    elements.append(currentElement);
  }
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

function openPhoto(evt) {
  popupPhoto.classList.add('popup_opened');
  photo.src = evt.target.src;
  photo.alt = evt.target.alt;
  photoSubtitle.textContent = evt.target.alt;
}





