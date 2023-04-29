import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.photo = this.selector.querySelector('.popup__photo');
    this.subtitle = this.selector.querySelector('.popup__photo-subtitle');
  }
  open(name, link) {
    this.photo.src = link;
    this.photo.alt = name;
    this.subtitle.textContent = name;
    super.open();
  }
}
