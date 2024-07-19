// src/components/Modal.js
import React from 'react';
import '../styles/Modal.css';

import Button from '../components/Button';

const Modal = ({ show, onClose, onConfirm, title, children, loading }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <div className="modal-body">{children}</div>
                {!loading && (
                    <div className="modal-footer">
                        <Button click={onClose} buttonType="buttonCancel" name="Cancelar" />
                        <Button click={onConfirm} buttonType="buttonSuccess" name="Confirmar" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
