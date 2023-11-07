import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {

    const avatarRef = React.useRef()

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title="Обновить аватар"
            name="edit-avatar"
            btnTitle={onLoading ? "Сохранение..." : "Сохранить"}
        >
            <input
                type="url"
                className="popup__item popup__item_el_link-avatar"
                id="avatar-item"
                name="linkavatar"
                placeholder="Ссылка на картинку"
                required=""
                ref={avatarRef}
            />
            <span className="popup__item-error avatar-item-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;