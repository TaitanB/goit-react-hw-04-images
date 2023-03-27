import React from 'react';
import css from './styles.module.css';
import propTypes from 'prop-types';

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
  webformatURL: propTypes.string,
  largeImageURL: propTypes.string,
  onShowModal: propTypes.func,
  tags: propTypes.string,
};
