const buttonEdit = document.querySelector('.profile__button-edit');
const buttonClose = document.querySelector('.popup__button-close');
const popup = document.querySelector('.popup');


function edit() {
    popup.classList.add('popup_active');
} 

buttonEdit.addEventListener('click', edit);

function close() {
    popup.classList.remove('popup_active');
}

buttonClose.addEventListener('click', close);

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');  // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_type_job');// Воспользуйтесь инструментом .querySelector()


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let job = jobInput.value;
    let name = nameInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__name');
    let profileBio = document.querySelector('.profile__bio');
    // Вставьте новые значения с помощью textContent
    profileName.textContent = name;
    profileBio.textContent = job;

    close();

}



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);