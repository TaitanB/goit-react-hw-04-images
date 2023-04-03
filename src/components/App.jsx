import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { ImageGallery } from './ImageGallery';
import Searchbar from './Searchbar';
import { Button } from './Button';
import Modal from './Modal';
import { Loader } from './Loader';
import css from './styles.module.css';
import { onFetch } from './pixabay-api';

export function App() {
  const [SearchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // console.log('useEffect');
    if (SearchQuery !== '') {
      setLoading(true);
      onFetch(SearchQuery, page).then(images => {
        // console.log(`Отримали відповідь onFetch ${images}`);
        if (images.length > 0) {
          setImages(prevState => [...prevState, ...images]);
          setLoading(false);
        } else {
          // console.log('Немає зображень, що відповідають запиту');
          Notify.info('Sorry, there are no pictures matching your search.');
          setImages([]);
          setLoading(false);
        }
      });
    }
  }, [SearchQuery, page]);

  const handleSearchSubmit = newQuery => {
    if (newQuery !== SearchQuery) {
      // console.log('Новий запит, починаємо з першої сторінки');

      setSearchQuery(newQuery);
      setPage(1);
    }
    if (newQuery === SearchQuery) {
      Notify.info(`You are already viewing images for the query ${newQuery}.`);
    } else {
      setImages([]);
      setSearchQuery(newQuery);
      setPage(1);
    }
  };

  const loadMore = event => {
    // console.log('loadMore');

    event.preventDefault();
    setPage(prevState => prevState + 1);
  };

  const onShowModal = event => {
    // console.log('onShowModal');
    setShowModal(true);
    setLargeImageURL(event);
  };

  const onCloseModal = () => {
    // console.log('onCloseModal');
    setShowModal(false);
    setLargeImageURL('');
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onShowModal={onShowModal} />
      {loading && (
        <div className={css.Loader}>
          <Loader />
        </div>
      )}
      {images.length > 0 && <Button loadMore={loadMore} />}
      {showModal && (
        <Modal largeImage={largeImageURL} onCloseModal={onCloseModal} />
      )}
    </div>
  );
}
