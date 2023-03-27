import { Component } from 'react';
import { Notify } from 'notiflix';
import axios from 'axios';

import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { Button } from './Button';
import { Modal } from './Modal';
import { Loader } from './Loader';
import css from './styles.module.css';

export class App extends Component {
  state = {
    SearchQuery: '',
    images: [],
    page: 1,
    loading: false,
    largeImageURL: '',
    showModal: false,
  };

  onFetch = async SearchQuery => {
    console.log('onFetch');

    const API_KEY = '33528220-6f12bec756615243821cbd5de';

    this.setState(() => {
      console.log('Додаємо лоадер, оновився стейт App');

      return { loading: true };
    });

    try {
      console.log('Відправляємо запит на api');

      const response = await axios.get(
        `https://pixabay.com/api/?q=${SearchQuery}&page=${this.state.page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      this.onSearch(response, SearchQuery);

      console.log(`Отримали відповідь: ${response.data.hits}`);
    } catch (error) {
      this.setState(() =>
        Notify.failure('Sorry, something went wrong...', error)
      );
    } finally {
      this.setState({ loading: false });
    }
  };

  onSearch = (response, SearchQuery) => {
    console.log(`this.state.images: ${this.state.images}`);
    console.log(`response.data.hits: ${response.data.hits}`);
    console.log(`SearchQuery: ${SearchQuery}`);
    console.log(`this.state.SearchQuery: ${this.state.SearchQuery}`);

    if (response.data.hits.length > 0) {
      // if (SearchQuery !== this.state.SearchQuery) {
      //   this.setState(() => {
      //     console.log(`Новий пошук`);
      //     return {
      //       images: [...response.data.hits],
      //       page: 1,
      //       SearchQuery,
      //     };
      //   });
      // } else {
      this.setState(() => {
        console.log('Пошук не змінився');

        return {
          images: [...this.state.images, ...response.data.hits],
          page: this.state.page + 1,
          SearchQuery,
        };
      });
      // }
    } else {
      Notify.info('Sorry, there are no pictures matching your search.');
    }
  };

  // onSubmitFetch = async SearchQuery => {
  //   console.log('onSubmitFetch, перший запит');

  //   const response = await fetch(
  //     `https://pixabay.com/api/?q=${SearchQuery}&page=${this.state.page}&key=33528220-6f12bec756615243821cbd5de&image_type=photo&orientation=horizontal&per_page=12`
  //   )
  //     .then(response => response.json())
  //     .catch(error => Notify.failure('Sorry, something went wrong...', error));

  //   if (SearchQuery !== this.state.SearchQuery) {
  //     this.setState(() => {
  //       console.log('Якщо новий запит, починаємо з першої сторінки');
  //       return { images: this.state.images, page: 1, SearchQuery };
  //     });
  //   } else {
  //     this.setState(() => {
  //       console.log('Перший запит, або запит не змінився');
  //       return { SearchQuery, loading: true };
  //     });

  //     if (response && response.hits.length > 0) {
  //       this.setState(() => {
  //         return {
  //           images: [...this.state.images, ...response.hits],
  //           page: this.state.page + 1,
  //           loading: false,
  //         };
  //       });
  //     } else {
  //       Notify.info('Sorry, there are no pictures matching your search.');
  //       this.setState({
  //         images: [],
  //         loading: false,
  //       });
  //     }
  //   }
  // };

  loadMore = event => {
    console.log('loadMore');

    event.preventDefault();

    console.log(this.state.SearchQuery);

    this.onFetch(this.state.SearchQuery);
  };

  onShowModal = event => {
    console.log('onShowModal');

    this.setState(() => {
      console.log('Відкрили модалку, оновився стейт App');

      return {
        showModal: true,
        largeImageURL: event,
      };
    });
  };

  onCloseModal = () => {
    console.log('onCloseModal');

    this.setState(() => {
      console.log('Закрили модалку, оновився стейт App');

      return { showModal: false, largeImageURL: '' };
    });
  };

  componentDidMount() {
    console.log('App componentDidMount');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');
    if (prevState.SearchQuery !== this.state.SearchQuery) {
      console.log(prevState.SearchQuery);
      console.log(this.state.SearchQuery);
      // this.onSearch(this.state.SearchQuery);
    }
  }

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onFetch} />
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
