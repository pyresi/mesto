import { Popup } from './Popup.js';
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._buttonConfirmation = this._popup.querySelector('.popup__button-save');
  }

  open(confirmationCallback) {
    this.confirmationCallback = confirmationCallback;
    super.open();
    this._buttonConfirmation.textContent = 'Да';
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonConfirmation.addEventListener('click', () => {
      this._buttonConfirmation.textContent = 'Сохранение...';
      this.confirmationCallback();
    });
  }
}
