function hasInvalidInput(fieldList) {
  return fieldList.some(function (fieldElement) {
    return !fieldElement.querySelector('.popup__input').validity.valid;
  });
}

function disableButton(button) {
  button.classList.add('popup__button-save_disabled');
  button.setAttribute('disabled', 'disabled');
}

function enableButton(button) {
  button.classList.remove('popup__button-save_disabled');
  button.removeAttribute('disabled');
}

export function validateForm(form) {
  const fieldList = Array.from(form.querySelectorAll('.form__field'));
  const buttonSave = form.querySelector('.popup__button-save');

  fieldList.forEach((field) => {
    const input = field.querySelector('.popup__input');
    const errorSpan = field.querySelector('.form__input-error');
    checkInputValidity(input, errorSpan);
  });

  validateButton(fieldList, buttonSave);
}

function validateButton(fieldList, buttonSave) {
  if (hasInvalidInput(fieldList)) {
    disableButton(buttonSave);
  } else {
    enableButton(buttonSave);
  }
}

function showInputError(input, errorSpan) {
  errorSpan.classList.add('form__input-error_active');
  errorSpan.innerText = input.validationMessage;
  input.classList.add('popup__input_error');
}

function hideInputError(input, errorSpan) {
  errorSpan.innerText = '';
  errorSpan.classList.remove('form__input-error_active');
  input.classList.remove('popup__input_error');
}

function checkInputValidity(input, errorSpan) {
  if (!input.validity.valid) {
    showInputError(input, errorSpan);
  } else {
    hideInputError(input, errorSpan);
  }
}

function setEventListeners(
  form,
  fieldList,
  buttonSave,
  inputSelector,
  inputErrorSelector
) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  fieldList.forEach((field) => {
    const input = field.querySelector(inputSelector);
    const errorSpan = field.querySelector(inputErrorSelector);
    input.addEventListener('input', (e) => {
      checkInputValidity(input, errorSpan);
      validateButton(fieldList, buttonSave);
    });
  });
}

export function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach(function (form) {
    const fieldList = Array.from(form.querySelectorAll(config.fieldSelector));
    const buttonSave = form.querySelector(config.buttonSelector);
    setEventListeners(
      form,
      fieldList,
      buttonSave,
      config.inputSelector,
      config.inputErrorSelector
    );
  });
}
