import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null)

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

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm title='Вы уверенны?' name='delete-card' btnTitle="Да" />
      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title="Обновить аватар" name="edit-avatar" btnTitle="Сохранить" >
        <input
          type="url"
          className="popup__item popup__item_el_link-avatar"
          id="avatar-item"
          name="linkavatar"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="popup__item-error avatar-item-error" />
      </PopupWithForm>
      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title="Редактировать профиль" name="edit-profile" btnTitle="Сохранить" >
        <input
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
      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} title="Новое место" name="aad-card" btnTitle="Сохранить" >
        <input
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
          type="url"
          className="popup__item popup__item_el_link"
          id="link-item"
          name="link"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="popup__item-error link-item-error" />
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;