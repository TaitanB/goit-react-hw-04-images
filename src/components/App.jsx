import { Component } from 'react';
import { Notify } from 'notiflix';

import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { Button } from './Button';
import { Modal } from './Modal';
import { Loader } from './Loader';
import css from './styles.module.css';
import { onFetch } from './pixabay-api';

export class App extends Component {
  state = {
    SearchQuery: '',
    images: [],
    page: 1,
    loading: false,
    largeImageURL: '',
    showModal: false,
  };

  // componentDidMount() {
  //   console.log('App componentDidMount');
  // }

  handleSearchSubmit = SearchQuery => {
    this.setState({ SearchQuery });
  };

  loadMore = event => {
    // console.log('loadMore');

    event.preventDefault();

    this.setState(() => {
      // console.log('loading: true');

      return {
        loading: true,
      };
    });

    onFetch(this.state.SearchQuery, this.state.page + 1).then(images => {
      if (images && images.length > 0) {
        this.setState(() => {
          // console.log('8. Завантажуємо наступну сторінку, loading: false');

          return {
            images: [...this.state.images, ...images],
            page: this.state.page + 1,
            loading: false,
          };
        });
      }
    });
  };

  onShowModal = event => {
    this.setState(() => {
      // console.log('Відкрили модалку, оновився стейт App');

      return { showModal: true, largeImageURL: event };
    });
  };

  onCloseModal = () => {
    this.setState(() => {
      // console.log('Закрили модалку, оновився стейт App');

      return { showModal: false, largeImageURL: '' };
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');

    if (prevState.SearchQuery !== this.state.SearchQuery) {
      // console.log(`Попередній запит: ${prevState.SearchQuery}`);
      // console.log(`Поточний запит: ${this.state.SearchQuery}`);

      this.setState(() => {
        // console.log('loading: true');

        return {
          loading: true,
        };
      });

      onFetch(this.state.SearchQuery, 1).then(images => {
        if (images && images.length > 0) {
          this.setState(() => {
            // console.log(
            //   '7. Новий запит, починаємо з першої сторінки, loading: false'
            // );

            return {
              images,
              page: 1,
              SearchQuery: this.state.SearchQuery,
              loading: false,
            };
          });
        } else {
          // console.log(`Попередній запит: ${prevState.SearchQuery}`);
          // console.log(`Поточний запит: ${this.state.SearchQuery}`);
          // console.log(
          //   '7.1 Вибачте, немає зображень, що відповідають вашому запиту, loading: false'
          // );

          Notify.info('Sorry, there are no pictures matching your search.');
          this.setState({
            images: [],
            loading: false,
          });
        }
      });
    }
  }

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {this.state.loading && (
          <div className={css.Loader}>
            <Loader />
          </div>
        )}
        <ImageGallery
          images={this.state.images}
          onShowModal={this.onShowModal}
        />
        {this.state.images.length > 0 && <Button loadMore={this.loadMore} />}
        {this.state.showModal && (
          <Modal
            largeImage={this.state.largeImageURL}
            onCloseModal={this.onCloseModal}
          />
        )}
      </div>
    );
  }
}
