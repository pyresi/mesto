export class Card {
  constructor(
    cardData,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    myId,
    api
  ) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._currentElement = this._templateSelector.cloneNode(true);
    this._like = this._currentElement.querySelector('.element__like');
    this._likeCounter = this._currentElement.querySelector(
      '.element__like-counter'
    );
    this._trash = this._currentElement.querySelector('.element__trash');
    this._elementTitle = this._currentElement.querySelector('.element__title');
    this._elementPhoto = this._currentElement.querySelector('.element__photo');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._myId = myId;
    this._api = api;
  }

  _setTitle() {
    this._elementTitle.innerText = this._cardData.name;
  }

  _setPhoto() {
    this._elementPhoto.alt = this._cardData.name;
    this._elementPhoto.src = this._cardData.link;
  }

  _setLikes() {
    this._likeCounter.textContent = this._cardData.likes.length;
    if (this._checkLiked()) {
      this._like.classList.add('element__like_active');
    } else {
      this._like.classList.remove('element__like_active');
    }
  }

  _checkLiked() {
    return this._cardData.likes.some((element) => {
      return element._id === this._myId;
    });
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._trash.addEventListener('click', () => {
      this._handleDeleteClick(() => {
        this._removeCard();
      });
    });
    this._elementPhoto.addEventListener('click', () => {
      this._handleCardClick(this._cardData.name, this._cardData.link);
    });
  }

  _setDeleteIcon() {
    if (this._myId !== this._cardData.owner._id) {
      this._trash.classList.add('element__trash_disabled');
    }
  }

  _handleLikeClick() {
    if (this._checkLiked()) {
      this._api
        .deleteLike(this._cardData._id)
        .then((res) => {
          this._cardData.likes = res.likes;
          this._setLikes();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._api
        .putLike(this._cardData._id)
        .then((res) => {
          this._cardData.likes = res.likes;
          this._setLikes();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _removeCard() {
    console.log(this._currentElement);
    this._api
      .deleteCard(this._cardData._id)
      .then((res) => {
        // console.log(res);
        this._currentElement.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createCard() {
    this._setTitle();
    this._setPhoto();
    this._setEventListeners();
    this._setLikes();
    this._setDeleteIcon();
    return this._currentElement;
  }
}
