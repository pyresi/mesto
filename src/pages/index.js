import '../pages/index.css';

import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { initialCards } from '../components/consts.js';

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

// -------------------------------------

function openAddPopup() {
  formValidators['add-validator'].runValidation();
  popupAdd.open();
}

function openEditPopup() {
  // info = userInfo.getUserInfo();
  formValidators['edit-validator'].runValidation();
  popupEdit.open();
}

function openPhotoPopup(name, link) {
  popupPhoto.open(name, link);
}

function handleEditForm(evt, inputs) {
  evt.preventDefault();
  userInfo.setUserInfo(inputs['input-name'].value, inputs['input-job'].value);
  popupEdit.close();
}

function createCard(item) {
  const card = new Card(item, elementTemplate, openPhotoPopup);
  const cardElement = card.createCard();
  return cardElement;
}

function handleAddForm(evt, inputs) {
  evt.preventDefault();
  section.addItem({
    name: inputs['input-title'].value,
    link: inputs['input-link'].value,
  });
  popupAdd.close();
}

// HTML Elements
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');

const elements = document.querySelector('.elements');
const elementTemplate = document
  .querySelector('#element-template')
  .content.querySelector('.element');

const section = new Section(
  { items: initialCards, renderer: createCard },
  elements
);

const popupEdit = new PopupWithForm(
  document.querySelector('.popup_type_edit'),
  handleEditForm
);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(
  document.querySelector('.popup_type_add'),
  handleAddForm
);
popupAdd.setEventListeners();

const popupPhoto = new PopupWithImage(
  document.querySelector('.popup_type_photo')
);
popupPhoto.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: document.querySelector('.profile__name'),
  bioSelector: document.querySelector('.profile__bio'),
});

const popupProfileForm = document.forms['popup-form-edit'];
const popupFormAdd = document.forms['popup-form-add'];

const formValidators = {
  'edit-validator': new FormValidator(config, popupProfileForm),
  'add-validator': new FormValidator(config, popupFormAdd),
};

// -------------------------------------

buttonAdd.addEventListener('click', openAddPopup);
buttonEdit.addEventListener('click', openEditPopup);

Object.keys(formValidators).forEach((key) => {
  formValidators[key].enableValidation();
});
