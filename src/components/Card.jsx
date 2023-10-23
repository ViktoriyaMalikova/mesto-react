import React from 'react';
function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <article className="elements__element">
            <img src={card.link} alt={card.name} className="elements__image" onClick={handleClick} />
            <button className="elements__delete" type="button" />
            <div className="elements__wrapper">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__container-like">
                    <button className="elements__like" type="button" />
                    <p className="elements__counter-like" >{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;