import '../pages/index.css';

import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { config } from '../utils/constants.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import { Api } from '../components/Api';

// -------------------------------------

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: 'c64bdc0f-9e69-43d7-913f-b4a8209f730f',
    'Content-Type': 'application/json',
  },
});

function deleteLike(cardId) {
  return api.deleteLike(cardId).then((res) => {
    return res.likes;
  });
}

function putLike(cardId) {
  return api.putLike(cardId).then((res) => {
    return res.likes;
  });
}

function deleteCard(cardId) {
  return api.deleteCard(cardId);
}

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

function openConfirmationPopup(confirmationCallback) {
  popupWithConfirmation.open(confirmationCallback);
}

function openAvatarPopup() {
  popupAvatar.open();
}

function handleEditForm(evt, inputs) {
  evt.preventDefault();
  api
    .editUserInfo(inputs['input-name'], inputs['input-job'])
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function createCard(item) {
  const card = new Card(
    item,
    elementTemplate,
    openPhotoPopup,
    openConfirmationPopup,
    userInfo.getId(),
    deleteLike,
    putLike,
    deleteCard
  );
  const cardElement = card.createCard();
  return cardElement;
}

function handleAddForm(evt, inputs) {
  evt.preventDefault();
  api
    .postCard(inputs['input-title'], inputs['input-link'])
    .then((res) => {
      cardSection.addItem(res);
      popupAdd.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleAvatarForm(evt, inputs) {
  evt.preventDefault();
  api
    .changeAvatar(inputs['input-avatar'])
    .then((res) => {
      userInfo.setAvatar(res.avatar);
      popupAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

const elementTemplate = document
  .querySelector('#element-template')
  .content.querySelector('.element');

// const section = new Section(
//   { items: initialCards, renderer: createCard },
//   '.elements'
// );
// section.renderItems();
let cardSection;

const popupEdit = new PopupWithForm('.popup_type_edit', handleEditForm);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_type_add', handleAddForm);
popupAdd.setEventListeners();

const popupPhoto = new PopupWithImage('.popup_type_photo');
popupPhoto.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(
  '.popup_type_confirmation'
);
popupWithConfirmation.setEventListeners();

const popupAvatar = new PopupWithForm('.popup_type_avatar', handleAvatarForm);
popupAvatar.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  bioSelector: '.profile__bio',
  avatarSelector: '.profile__avatar',
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
const buttonAvatarEdit = document.querySelector('.profile__avatar');

buttonAdd.addEventListener('click', openAddPopup);
buttonEdit.addEventListener('click', openEditPopup);
buttonAvatarEdit.addEventListener('click', openAvatarPopup);

api
  .getUserInfo()
  .then((result) => {
    console.log(result);
    userInfo.setUserInfo(result.name, result.about);
    userInfo.setAvatar(result.avatar);
    userInfo.setId(result._id);
  })
  .then(() => {
    return api.getInitialCards();
  })
  .then((result) => {
    console.log(result);
    cardSection = new Section(
      { items: result.reverse(), renderer: createCard },
      '.elements'
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });
