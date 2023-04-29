import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photo = this._popup.querySelector('.popup__photo');
    this._subtitle = this._popup.querySelector('.popup__photo-subtitle');
  }
  open(name, link) {
    this._photo.src = link;
    this._photo.alt = name;
    this._subtitle.textContent = name;
    super.open();
  }
}
