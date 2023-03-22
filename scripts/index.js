// HTML Elements
const buttonEdit = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');
const buttonAdd = document.querySelector('.profile__button-add');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element-template').content;

const popupEdit = document.querySelector('.popup_type_edit');
const editForm = document.forms['popup-form-edit'];
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_job');
// const buttonEditClose = popupEdit.querySelector('.popup__button-close');

const popupAdd = document.querySelector('.popup_type_add');
const addForm = document.forms['popup-form-add'];
// const buttonAddClose = popupAdd.querySelector('.popup__button-close');
const inputTitle = popupAdd.querySelector('.popup__input_type_title');
const inputLink = popupAdd.querySelector('.popup__input_type_link');

const popupPhoto = document.querySelector('.popup_type_photo');
// const buttonPhotoClose = popupPhoto.querySelector('.popup__button-close');
const photo = popupPhoto.querySelector('.popup__photo');
const photoSubtitle = popupPhoto.querySelector('.popup__photo-subtitle');

// -------------------------------------

// Functions
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

function openAddPopup() {
  validateForm(document.forms['popup-form-add']);
  openPopup(popupAdd);
}

function openEditPopup() {
  jobInput.value = profileBio.textContent;
  nameInput.value = profileName.textContent;
  validateForm(document.forms['popup-form-edit']);
  openPopup(popupEdit);
}

function closePopup() {
  const openedPopup = document.querySelector('.popup_opened');
  openedPopup.classList.remove('popup_opened');
}

function handleEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileBio.textContent = jobInput.value;
  closeEventPopup(evt);
}

function handleAddForm(evt) {
  evt.preventDefault();
  const newCard = createCard({ name: inputTitle.value, link: inputLink.value });
  addElement(newCard);
  inputTitle.value = '';
  inputLink.value = '';
  closeEventPopup(evt);
}

function openPhotoPopup(evt) {
  openPopup(popupPhoto);
  photo.src = evt.target.src;
  photo.alt = evt.target.alt;
  photoSubtitle.textContent = evt.target.alt;
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function createCard(element) {
  const currentElement = elementTemplate.cloneNode(true);

  const like = currentElement.querySelector('.element__like');
  const trash = currentElement.querySelector('.element__trash');
  const elementTitle = currentElement.querySelector('.element__title');
  const elementPhoto = currentElement.querySelector('.element__photo');

  elementTitle.innerText = element.name;
  elementPhoto.alt = element.name;
  elementPhoto.src = element.link;

  like.addEventListener('click', toggleLike);
  trash.addEventListener('click', deleteCard);
  elementPhoto.addEventListener('click', openPhotoPopup);

  return currentElement;
}

function addElement(card) {
  elements.prepend(card);
}

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

function validateForm(form) {
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
// -------------------------------------

document.querySelectorAll('.popup__button-close').forEach((button) => {
  button.addEventListener('click', closePopup);
});

buttonAdd.addEventListener('click', openAddPopup);
buttonEdit.addEventListener('click', openEditPopup);
editForm.addEventListener('submit', handleEditForm);
addForm.addEventListener('submit', handleAddForm);

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
});

popupEdit.addEventListener('click', handleOverlayClick);
popupAdd.addEventListener('click', handleOverlayClick);
popupPhoto.addEventListener('click', handleOverlayClick);

function handleOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}

// Cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// _________________________ВАЛИДАЦИЯ__________________________

const showInputError = (input, errorSpan) => {
  errorSpan.classList.add('form__input-error_active');
  errorSpan.innerText = input.validationMessage;
  input.classList.add('popup__input_error');
};

const hideInputError = (input, errorSpan) => {
  errorSpan.innerText = '';
  errorSpan.classList.remove('form__input-error_active');
  input.classList.remove('popup__input_error');
};

const checkInputValidity = (input, errorSpan) => {
  if (!input.validity.valid) {
    showInputError(input, errorSpan);
  } else {
    hideInputError(input, errorSpan);
  }
};

const setEventListeners = (form, fieldList, buttonSave) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  fieldList.forEach((field) => {
    const input = field.querySelector('.popup__input');
    const errorSpan = field.querySelector('.form__input-error');
    input.addEventListener('input', (e) => {
      checkInputValidity(input, errorSpan);
      validateButton(fieldList, buttonSave);
    });
  });
};

const enableValidation = (config) => {
  const form = document.forms[config.formName];
  const fieldList = Array.from(form.querySelectorAll(config.fieldSelector));
  const buttonSave = form.querySelector('.popup__button-save');
  setEventListeners(form, fieldList, buttonSave);
};

enableValidation({
  formName: 'popup-form-edit',
  fieldSelector: '.form__field',
});

enableValidation({
  formName: 'popup-form-add',
  fieldSelector: '.form__field',
});

const createdCards = initialCards.map(createCard);
createdCards.reverse();
createdCards.forEach(addElement);
