import React from 'react';
import css from './styles.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = props => {
  const { webformatURL, largeImageURL, onShowModal, tags } = props;
  return (
    <li className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={() => onShowModal(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onShowModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
