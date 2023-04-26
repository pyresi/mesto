export class FormValidator {
  constructor(config, form) {
    // this._config = config;
    this._form = form;
    this._formSelector = config.formSelector;
    this._fieldSelector = config.fieldSelector;
    this._buttonSelector = config.buttonSelector;
    this._inputSelector = config.inputSelector;
    this._inputErrorSelector = config.inputErrorSelector;
    this._errorActiveClass = config.errorActiveClass;
    this._errorInputClass = config.errorInputClass;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._fieldList = Array.from(
      this._form.querySelectorAll(this._fieldSelector)
    ).map((field) => {
      const input = field.querySelector(this._inputSelector);
      const errorSpan = field.querySelector(this._inputErrorSelector);
      return {
        input: input,
        error: errorSpan,
      };
    });
    // console.log(this._fieldList);
    this._buttonSave = this._form.querySelector(this._buttonSelector);
  }

  _hasInvalidInput() {
    return this._fieldList.some((fieldElement) => {
      return !fieldElement.input.validity.valid;
    });
  }

  _disableButton() {
    this._buttonSave.classList.add(this._inactiveButtonClass);
    this._buttonSave.disabled = true;
  }

  _enableButton() {
    this._buttonSave.classList.remove(this._inactiveButtonClass);
    this._buttonSave.disabled = false;
  }

  _validateButton() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _showInputError(input, errorSpan) {
    errorSpan.classList.add(this._errorActiveClass);
    errorSpan.innerText = input.validationMessage;
    input.classList.add(this._errorInputClass);
  }

  _hideInputError(input, errorSpan) {
    errorSpan.innerText = '';
    input.classList.remove(this._errorInputClass);
  }

  _checkInputValidity(input, errorSpan) {
    if (!input.validity.valid) {
      this._showInputError(input, errorSpan);
    } else {
      this._hideInputError(input, errorSpan);
    }
  }

  runValidation() {
    this._validateButton();

    this._fieldList.forEach((field) => {
      this._checkInputValidity(field.input, field.error);
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    this._fieldList.forEach((field) => {
      field.input.addEventListener('input', (e) => {
        this._checkInputValidity(field.input, field.error);
        this._validateButton();
      });
    });
  }
}
