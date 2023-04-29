import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(selector, submitCallback) {
    super(selector);
    this.submitCallback = submitCallback;
    this.form = this.selector.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      this.submitCallback(evt, this._getInputValues());
    });
  }

  close() {
    super.close();
    this.form.reset();
  }

  _getInputValues() {
    return this.form.elements;
  }
}
