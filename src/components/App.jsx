import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import { api } from "../utils/api.js";
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null)

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const [cardIdToDelete, setCardIdToDelete] = React.useState("");

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCardClick(cardId) {
    setIsDeleteCardPopupOpen(true);
    setCardIdToDelete(cardId);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
  }

  React.useEffect(() => {
    Promise.all([api.getInfoProfile(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData)
      })
      .catch(error => console.log(`Ошибка ${error}`))
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(error => console.log(`Ошибка ${error}`))

    } else {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(error => console.log(`Ошибка ${error}`))
    }
  }

  function handleCardDelete(CardId) {
    setIsLoading(true)
    api.deleteCard(CardId)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== CardId));
        closeAllPopups()
      })
      .catch(error => console.log(`Ошибка ${error}`))
      .finally(
        () => { setIsLoading(false) }
      )
  }

  function handleUpdateUser(newUserData) {
    setIsLoading(true)
    api.setUserInfo(newUserData)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка ${error}`))
      .finally(
        () => { setIsLoading(false) }
      )
  }

  function handleUpdateAvatar(newUserAvatar) {
    setIsLoading(true)
    api.setNewAvatar(newUserAvatar)
      .then((userData) => {
        setCurrentUser(userData)
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка ${error}`))
      .finally(
        () => { setIsLoading(false) }
      )
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true)
    api.addNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(error => console.log(`Ошибка ${error}`))
      .finally(
        () => { setIsLoading(false) }
      )
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onTrashClick={handleDeleteCardClick}
          cards={cards}
          onLoading={isLoading}
        />
        <Footer />
        <EditAvatarPopup
          onLoading={isLoading}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          onLoading={isLoading}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          onLoading={isLoading}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <DeleteCardPopup
          onLoading={isLoading}
          cardId={cardIdToDelete}
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;