import { openPhotoPopup } from './index.js';

export class Card {
  constructor(cardData, templateSelector) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._currentElement = this._templateSelector.cloneNode(true);
    this._like = this._currentElement.querySelector('.element__like');
    this._trash = this._currentElement.querySelector('.element__trash');
    this._elementTitle = this._currentElement.querySelector('.element__title');
    this._elementPhoto = this._currentElement.querySelector('.element__photo');
  }

  _setTitle() {
    this._elementTitle.innerText = this._cardData.name;
  }

  _setPhoto() {
    this._elementPhoto.alt = this._cardData.name;
    this._elementPhoto.src = this._cardData.link;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._trash.addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._elementPhoto.addEventListener('click', () => {
      this._handleOpenClick();
    });
  }

  _handleLikeClick() {
    this._like.classList.toggle('element__like_active');
  }

  _handleDeleteClick() {
    console.log(this._currentElement);
    this._currentElement.remove();
  }

  _handleOpenClick() {
    // console.log(this._cardData);
    openPhotoPopup(this._cardData.name, this._cardData.link);
  }

  createCard() {
    this._setTitle();
    this._setPhoto();
    this._setEventListeners();
    return this._currentElement;
  }
}
