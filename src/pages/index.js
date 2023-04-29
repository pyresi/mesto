import '../pages/index.css';

import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { initialCards, config } from '../utils/constants.js';

// -------------------------------------

function openAddPopup() {
  formValidators['popup-form-add'].resetValidation();
  popupAdd.open();
}

function openEditPopup() {
  const info = userInfo.getUserInfo();
  popupEdit.setInputValues({ 'input-name': info.name, 'input-job': info.bio });
  formValidators['popup-form-edit'].resetValidation();
  popupEdit.open();
}

function openPhotoPopup(name, link) {
  popupPhoto.open(name, link);
}

function handleEditForm(evt, inputs) {
  evt.preventDefault();
  userInfo.setUserInfo(inputs['input-name'], inputs['input-job']);
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
    name: inputs['input-title'],
    link: inputs['input-link'],
  });
  popupAdd.close();
}

const elementTemplate = document
  .querySelector('#element-template')
  .content.querySelector('.element');

const section = new Section(
  { items: initialCards, renderer: createCard },
  '.elements'
);
section.renderItems();

const popupEdit = new PopupWithForm('.popup_type_edit', handleEditForm);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_type_add', handleAddForm);
popupAdd.setEventListeners();

const popupPhoto = new PopupWithImage('.popup_type_photo');
popupPhoto.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  bioSelector: '.profile__bio',
});

const formValidators = {};

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
}

enableValidation(config);

// -------------------------------------
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');

buttonAdd.addEventListener('click', openAddPopup);
buttonEdit.addEventListener('click', openEditPopup);
