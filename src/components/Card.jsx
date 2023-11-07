import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onTrashClick }) {

    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `elements__like ${isLiked && 'elements__like_active'}`
    );;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleTrashClick() {
        onTrashClick(card._id)
    }

    return (
        <li className="elements__element">
            <img src={card.link} alt={card.name} className="elements__image" onClick={handleClick} />
            {isOwn && <button className="elements__delete" type="button" onClick={handleTrashClick} />}
            <div className="elements__wrapper">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__container-like">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
                    <p className="elements__counter-like" >{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;