export class Popup {
  constructor(selector) {
    this.selector = selector;
    this.buttonClose = this.selector.querySelector('.popup__button-close');
  }

  open() {
    this.selector.classList.add('popup_opened');

    document.addEventListener('keydown', (evt) => {
      this._handleEscClose(evt);
    });

    this.selector.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }

  close() {
    this.selector.classList.remove('popup_opened');
  }

  setEventListeners() {
    this.buttonClose.addEventListener('click', () => {
      this.close();
    });
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
