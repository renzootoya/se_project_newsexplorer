import { useEffect } from 'react';
import './ModalWithForm.css';

const ModalWithForm = ({ title, isOpen, onClose, onSubmit, submitText, children, altLink }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal modal_open" onClick={handleOverlayClick}>
      <div className="modal__container">
        <button className="modal__close" type="button" onClick={onClose} />
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button className="modal__submit" type="submit">
            {submitText}
          </button>
        </form>
        {altLink && (
          <p className="modal__alt">
            {altLink.text}{' '}
            <button className="modal__alt-link" type="button" onClick={altLink.onClick}>
              {altLink.linkText}
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default ModalWithForm;
