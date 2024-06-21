// src/components/Modal.js
import React from 'react';
import '../styles/Modal.css';

import Button from '../components/Button';


const Modal = ({ show, onClose, onConfirm, title, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <h2>{title}</h2>
                <div className="modal-body">{children}</div>
                <div className="modal-footer">
                    <Button click={onClose} buttonType="buttonLogout" name="Cancelar" />
                    <Button click={onConfirm} buttonType="buttonSuccess" name="Confirmar" />
                </div>
            </div>
        </div>
    );
};

export default Modal;
