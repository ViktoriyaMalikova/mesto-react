import React from 'react';
import { api } from "../utils/api.js";
import Card from './Card.jsx';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getInfoProfile(), api.getInitialCards()])
            .then(([userData, cardsData]) => {
                setUserName(userData.name)
                setUserDescription(userData.about)
                setUserAvatar(userData.avatar)
                setCards(cardsData)
            })
            .catch(error => console.log(`Ошибка ${error}`))
    }, [])

    return (<main className="content">
        <section className="profile">
            <button className="profile__add-avatar-btn" onClick={onEditAvatar}>
                <img src={userAvatar} alt="Аватар" className="profile__avatar" />
            </button>
            <div className="profile__info">
                <div className="profile__info-wrapper">
                    <h1 className="profile__name" >{userName}</h1>
                    <button className="profile__edit-btn" type="button" onClick={onEditProfile} />
                </div>
                <h2 className="profile__job" >{userDescription}</h2>
            </div>
            <button className="profile__add-btn" type="button" onClick={onAddPlace} />
        </section>
        <section className="elements">
            <ul className="elements__list">
                {cards.map((card) => {
                    return (
                        <li key={card._id}>
                            <Card card={card} onCardClick={onCardClick} />
                        </li>
                    )
                })}
            </ul>
        </section>
    </main>)
}

export default Main;