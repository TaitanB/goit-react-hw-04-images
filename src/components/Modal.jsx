import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import css from './styles.module.css';

export default function Modal({ onCloseModal, largeImage }) {
  const handleClose = useCallback(
    event => {
      if (event.code === 'Escape' || event.target.className === css.Overlay) {
        // console.log(
        //   'При натисканні Escape або кліку на оверлей закриваємо модалку'
        // );
        return onCloseModal();
      }
    },
    [onCloseModal]
  );

  useEffect(() => {
    // console.log('додали слухача на віндовс');
    window.addEventListener('keydown', handleClose);

    return () => {
      // console.log('видалили слухача на віндовс');
      window.removeEventListener('keydown', handleClose);
    };
  }, [handleClose]);

  return (
    <div className={css.Overlay} onClick={handleClose}>
      <div className={css.Modal}>
        <img src={largeImage} alt="largeImage" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
