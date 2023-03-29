import { Component } from 'react';
import { Notify } from 'notiflix';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import css from './styles.module.css';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleChange = event => {
    event.preventDefault();

    this.setState(() => {
      // console.log('1. Ввели пошуковий запит в інпут, оновився стейт Searchbar');

      return { inputValue: event.target.value };
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.inputValue.trim() !== '') {
      // console.log(
      //   '2. Запит, введений в інпут валідний, відправляємо його в Арр'
      // );

      this.props.onSubmit(this.state.inputValue);
    } else {
      // console.log('2.1 Запит не валідний, виводимо інформаційне вікно');

      Notify.info('Please enter a valid value.');
      return;
    }
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button
            type="submit"
            className={css.SearchFormButton}
            disabled={this.state.inputValue.trim() === ''}
          >
            <span className={css.SearchFormButtonLabel}>
              <BiSearchAlt />
            </span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
