import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
    const [title, setTitle] = React.useState("");
    const [link, setLink] = React.useState("");

    React.useEffect(() => {
        setTitle("");
        setLink("");
    }, [isOpen]);

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: title,
            link,
        })
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            title="Новое место"
            name="aad-card"
            btnTitle={onLoading ? "Сохранить..." : "Сохранить"}
            onSubmit={handleSubmit}
        >
            <input
                value={title || ""}
                onChange={handleChangeTitle}
                type="text"
                minLength={2}
                maxLength={30}
                className="popup__item popup__item_el_caption"
                id="caption-item"
                name="title"
                placeholder="Название"
                required=""
            />
            <span className="popup__item-error caption-item-error" />
            <input
                value={link || ""}
                onChange={handleChangeLink}
                type="url"
                className="popup__item popup__item_el_link"
                id="link-item"
                name="link"
                placeholder="Ссылка на картинку"
                required=""
            />
            <span className="popup__item-error link-item-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;