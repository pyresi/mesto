import { validateForm, enableValidation } from './validation.js';

// HTML Elements
const buttonEdit = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const buttonAdd = document.querySelector('.profile__button-add');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

const popupEdit = document.querySelector('.popup_type_edit');
const editForm = document.forms['popup-form-edit'];
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');

const popupAdd = document.querySelector('.popup_type_add');
const addForm = document.forms['popup-form-add'];
const inputTitle = popupAdd.querySelector('.popup__input_type_title');
const inputLink = popupAdd.querySelector('.popup__input_type_link');

const popupPhoto = document.querySelector('.popup_type_photo');
const photo = popupPhoto.querySelector('.popup__photo');
const photoSubtitle = popupPhoto.querySelector('.popup__photo-subtitle');

// -------------------------------------

// Functions
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscKey);
  popup.addEventListener('click', handleOverlayClick);
}

function closeEventPopup(evt) {
  closePopup(evt.target.closest('.popup'));
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', handleEscKey);
  popup.removeEventListener('click', handleOverlayClick);
}

function openAddPopup() {
  validateForm(document.forms['popup-form-add'], config);
  openPopup(popupAdd);
}

function openEditPopup() {
  jobInput.value = profileBio.textContent;
  nameInput.value = profileName.textContent;
  validateForm(document.forms['popup-form-edit'], config);
  openPopup(popupEdit);
}

function openPhotoPopup(evt) {
  openPopup(popupPhoto);
  photo.src = evt.target.src;
  photo.alt = evt.target.alt;
  photoSubtitle.textContent = evt.target.alt;
}

function handleEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closePopup(evt);
}

function handleAddForm(evt) {
  evt.preventDefault();
  const newCard = createCard({ name: inputTitle.value, link: inputLink.value });
  addElement(newCard);
  inputTitle.value = '';
  inputLink.value = '';
  closePopup(evt);
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function createCard(element) {
  const currentElement = elementTemplate.cloneNode(true);

  const like = currentElement.querySelector('.element__like');
  const trash = currentElement.querySelector('.element__trash');
  const elementTitle = currentElement.querySelector('.element__title');
  const elementPhoto = currentElement.querySelector('.element__photo');

  elementTitle.innerText = element.name;
  elementPhoto.alt = element.name;
  elementPhoto.src = element.link;

  like.addEventListener('click', toggleLike);
  trash.addEventListener('click', deleteCard);
  elementPhoto.addEventListener('click', openPhotoPopup);

  return currentElement;
}

function addElement(card) {
  elements.prepend(card);
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

function handleEscKey(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeEventPopup(evt);
  }
}

// -------------------------------------

document.querySelectorAll('.popup__button-close').forEach((button) => {
  button.addEventListener('click', closeEventPopup);
});

buttonAdd.addEventListener('click', openAddPopup);
buttonEdit.addEventListener('click', openEditPopup);
editForm.addEventListener('submit', handleEditForm);
addForm.addEventListener('submit', handleAddForm);

// Cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const createdCards = initialCards.map(createCard);
createdCards.reverse();
createdCards.forEach(addElement);

const config = {
  formSelector: '.popup__form',
  fieldSelector: '.popup__form-field',
  buttonSelector: '.popup__button-save',
  inputSelector: '.popup__input',
  inputErrorSelector: '.popup__form-field-error',
  errorActiveClass: 'popup__form-field-error_active',
  errorInputClass: 'popup__input_error',
  inactiveButtonClass: 'popup__button-save_disabled',
};

enableValidation(config);
