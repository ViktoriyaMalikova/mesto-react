import React from 'react';
import { usePopupClose } from '../hooks/usePopupClose';

function ImagePopup({ card, onClose }) {

    usePopupClose(card?.link, onClose)

    return (
        <div className={`popup popup_overlay_dark popup_type_open-image ${card && "popup_opened"}`}>
            <div className="popup__container">
                <figure className="popup__figure">
                    <button className="popup__close-btn" type="button" onClick={onClose} />
                    <img src={card ? card.link : '#'} alt={card ? card.name : ''} className="popup__image" />
                    <figcaption className="popup__figcaption" >{card && card.name}</figcaption>
                </figure>
            </div>
        </div>

    )
}

export default ImagePopup;