import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Card from './Card.jsx';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards, onTrashClick }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (<main className="content">
        <section className="profile">
            <button className="profile__add-avatar-btn" onClick={onEditAvatar}>
                <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
            </button>
            <div className="profile__info">
                <div className="profile__info-wrapper">
                    <h1 className="profile__name" >{currentUser.name}</h1>
                    <button className="profile__edit-btn" type="button" onClick={onEditProfile} />
                </div>
                <h2 className="profile__job" >{currentUser.about}</h2>
            </div>
            <button className="profile__add-btn" type="button" onClick={onAddPlace} />
        </section>
        <section className="elements">
            <ul className="elements__list">
                {cards.map((card) => {
                    return (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onTrashClick={onTrashClick}
                        />
                    )
                })}
            </ul>
        </section>
    </main>)
}

export default Main;