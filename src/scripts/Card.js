export class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._currentElement = this._templateSelector.cloneNode(true);
    this._like = this._currentElement.querySelector('.element__like');
    this._trash = this._currentElement.querySelector('.element__trash');
    this._elementTitle = this._currentElement.querySelector('.element__title');
    this._elementPhoto = this._currentElement.querySelector('.element__photo');
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick(this._cardData.name, this._cardData.link);
    });
  }

  _handleLikeClick() {
    this._like.classList.toggle('element__like_active');
  }

  _handleDeleteClick() {
    console.log(this._currentElement);
    this._currentElement.remove();
  }

  createCard() {
    this._setTitle();
    this._setPhoto();
    this._setEventListeners();
    return this._currentElement;
  }
}
