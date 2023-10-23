import React from 'react';
function PopupWithForm({ name, title, btnTitle, children, isOpen, onClose }) {
    return (
        <div className={`popup popup_overlay_light popup_type_${name} ${isOpen && 'popup_opened'}`} >
            <div className={`popup__container popup__container_type_${name}`}>
                <button className="popup__close-btn" type="button" onClick={onClose} />
                <h2 className="popup__title">{title}</h2>
                <form
                    className={`popup__form popup__form_type_${name}`}
                    name={name}
                    noValidate=""
                >
                    {children}
                    <button className="popup__save-btn" type="submit">
                        {btnTitle}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;