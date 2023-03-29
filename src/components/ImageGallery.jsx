import React from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from './styles.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = props => {
  const { images, onShowModal } = props;
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ webformatURL, largeImageURL, id, tags }) => (
        <ImageGalleryItem
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onShowModal={onShowModal}
          tags={tags}
          key={id}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onShowModal: PropTypes.func.isRequired,
};
