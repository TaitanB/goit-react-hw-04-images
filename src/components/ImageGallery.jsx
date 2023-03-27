import React from 'react';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from './styles.module.css';
import propTypes from 'prop-types';

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
  images: propTypes.array,
  onShowModal: propTypes.func,
};
