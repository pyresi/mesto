function hasInvalidInput(fieldList, inputSelector) {
  return fieldList.some(function (fieldElement) {
    return !fieldElement.querySelector(inputSelector).validity.valid;
  });
}

function disableButton(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
}

function enableButton(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  button.disabled = false;
}

export function validateForm(form, config) {
  const fieldList = Array.from(form.querySelectorAll(config.fieldSelector));
  const buttonSave = form.querySelector(config.buttonSelector);

  fieldList.forEach((field) => {
    const input = field.querySelector(config.inputSelector);
    const errorSpan = field.querySelector(config.inputErrorSelector);
    checkInputValidity(
      input,
      errorSpan,
      config.errorActiveClass,
      config.errorInputClass
    );
  });

  validateButton(
    fieldList,
    buttonSave,
    config.inputSelector,
    config.inactiveButtonClass
  );
}

function validateButton(
  fieldList,
  buttonSave,
  inputSelector,
  inactiveButtonClass
) {
  if (hasInvalidInput(fieldList, inputSelector)) {
    disableButton(buttonSave, inactiveButtonClass);
  } else {
    enableButton(buttonSave, inactiveButtonClass);
  }
}

function showInputError(input, errorSpan, errorActiveClass, errorInputClass) {
  errorSpan.classList.add(errorActiveClass);
  errorSpan.innerText = input.validationMessage;
  input.classList.add(errorInputClass);
}

function hideInputError(input, errorSpan, errorActiveClass, errorInputClass) {
  errorSpan.innerText = '';
  errorSpan.classList.remove(errorActiveClass);
  input.classList.remove(errorInputClass);
}

function checkInputValidity(
  input,
  errorSpan,
  errorActiveClass,
  errorInputClass
) {
  console.log(input, errorSpan, errorActiveClass, errorInputClass);
  if (!input.validity.valid) {
    showInputError(input, errorSpan, errorActiveClass, errorInputClass);
  } else {
    hideInputError(input, errorSpan, errorActiveClass, errorInputClass);
  }
}

function setEventListeners(
  form,
  fieldList,
  buttonSave,
  inputSelector,
  inputErrorSelector,
  errorActiveClass,
  errorInputClass,
  inactiveButtonClass
) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  fieldList.forEach((field) => {
    const input = field.querySelector(inputSelector);
    const errorSpan = field.querySelector(inputErrorSelector);
    input.addEventListener('input', (e) => {
      checkInputValidity(input, errorSpan, errorActiveClass, errorInputClass);
      validateButton(fieldList, buttonSave, inputSelector, inactiveButtonClass);
    });
  });
}

export function validateForm(form, config) {
  const fieldList = Array.from(form.querySelectorAll(config.fieldSelector));
  const buttonSave = form.querySelector(config.buttonSelector);

  fieldList.forEach((field) => {
    const input = field.querySelector(config.inputSelector);
    const errorSpan = field.querySelector(config.inputErrorSelector);
    checkInputValidity(
      input,
      errorSpan,
      config.errorActiveClass,
      config.errorInputClass
    );
  });

  validateButton(
    fieldList,
    buttonSave,
    config.inputSelector,
    config.inactiveButtonClass
  );
}

export function enableValidation(config) {
  console.log(config);
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach(function (form) {
    const fieldList = Array.from(form.querySelectorAll(config.fieldSelector));
    const buttonSave = form.querySelector(config.buttonSelector);
    setEventListeners(
      form,
      fieldList,
      buttonSave,
      config.inputSelector,
      config.inputErrorSelector,
      config.errorActiveClass,
      config.errorInputClass,
      config.inactiveButtonClass
    );
  });
}
