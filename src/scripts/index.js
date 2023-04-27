import '../pages/index.css';

import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
import { Popup } from './Popup.js';
import { PopupWithImage } from './PopupWithImage';

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

// HTML Elements
const buttonEdit = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const buttonAdd = document.querySelector('.profile__button-add');
const elements = document.querySelector('.elements');
const elementTemplate = document
  .querySelector('#element-template')
  .content.querySelector('.element');

const popupEdit = new Popup(document.querySelector('.popup_type_edit'));

const popupProfileForm = document.forms['popup-form-edit'];
// const nameInput = popupEdit.querySelector('.popup__input_type_name');
// const jobInput = popupEdit.querySelector('.popup__input_type_job');

const popupAdd = document.querySelector('.popup_type_add');
const popupFormAdd = document.forms['popup-form-add'];
const inputTitle = popupAdd.querySelector('.popup__input_type_title');
const inputLink = popupAdd.querySelector('.popup__input_type_link');

const popupPhoto = new PopupWithImage(
  document.querySelector('.popup_type_photo')
);
// const photo = popupPhoto.querySelector('.popup__photo');
// const photoSubtitle = popupPhoto.querySelector('.popup__photo-subtitle');

const formValidators = {
  'edit-validator': new FormValidator(config, popupProfileForm),
  'add-validator': new FormValidator(config, popupFormAdd),
};

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
  document.removeEventListener('keydown', handleEscKey);
  popup.removeEventListener('click', handleOverlayClick);

  // popup.querySelector('form').reset();
}

function openAddPopup() {
  formValidators['add-validator'].runValidation();
  openPopup(popupAdd);
}

// function openEditPopup() {
//   jobInput.value = profileBio.textContent;
//   nameInput.value = profileName.textContent;

//   formValidators['edit-validator'].runValidation();
//   openPopup(popupEdit);
// }

function openPhotoPopup(name, link) {
  // openPopup(popupPhoto);
  // photo.src = link;
  // photo.alt = name;
  // photoSubtitle.textContent = name;
  popupPhoto.open(name, link);
}

function handleEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closeEventPopup(evt);
}

function createCard(item) {
  const card = new Card(item, elementTemplate, openPhotoPopup);
  const cardElement = card.createCard();
  return cardElement;
}

function handleAddForm(evt) {
  evt.preventDefault();
  const newCard = createCard({ name: inputTitle.value, link: inputLink.value });
  addElement(newCard);
  evt.target.reset();
  closeEventPopup(evt);
}

function addElement(card) {
  elements.prepend(card);
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

// document.querySelectorAll('.popup__button-close').forEach((button) => {
//   button.addEventListener('click', closeEventPopup);
// });

buttonAdd.addEventListener('click', openAddPopup);
// buttonEdit.addEventListener('click', openEditPopup);
popupProfileForm.addEventListener('submit', handleEditForm);
popupFormAdd.addEventListener('submit', handleAddForm);

const createdCards = initialCards.map(function (element) {
  return createCard(element);
});
createdCards.reverse();
createdCards.forEach(addElement);

Object.keys(formValidators).forEach((key) => {
  formValidators[key].enableValidation();
});
