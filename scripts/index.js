const formElement = document.querySelector('.popup__container');  
const nameInput = document.querySelector('.popup__input_type_name'); 
const jobInput = document.querySelector('.popup__input_type_job');

const buttonEdit = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__button-close');
const popup = document.querySelector('.popup');

const profileName = document.querySelector('.profile__name');
const profileBio = document.querySelector('.profile__bio');

function edit() {
    jobInput.value = profileBio.textContent;
    nameInput.value = profileName.textContent;
    popup.classList.add('popup_opened');
} 

function close() {
    popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileBio.textContent = jobInput.value;
    close();
}

buttonEdit.addEventListener('click', edit);
buttonClose.addEventListener('click', close);
formElement.addEventListener('submit', handleFormSubmit);