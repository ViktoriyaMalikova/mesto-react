import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ cardId, isOpen, onClose, onCardDelete, onLoading }) {

    function handleSubmit(e) {
        e.preventDefault();
        onCardDelete(cardId)
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            title='Вы уверенны?'
            name='delete-card'
            btnTitle={onLoading ? "Да..." : "Да"}
            onSubmit={handleSubmit} />
    )
}

export default DeleteCardPopup