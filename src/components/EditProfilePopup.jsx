import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {

    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Редактировать профиль"
            name="edit-profile"
            btnTitle={onLoading ? "Сохранение..." : "Сохранить"}
        >
            <input
                value={name || ""}
                onChange={handleChangeName}
                type="text"
                className="popup__item popup__item_el_name"
                id="name-item"
                name="username"
                minLength={2}
                maxLength={40}
                required=""
            />
            <span className="popup__item-error name-item-error" />
            <input
                value={description || ""}
                onChange={handleChangeDescription}
                type="text"
                className="popup__item popup__item_el_job"
                id="job-item"
                name="userjob"
                minLength={2}
                maxLength={200}
                required=""
            />
            <span className="popup__item-error job-item-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup;