import React, { useState } from 'react';
import { Notify } from 'notiflix';
import { BiSearchAlt } from 'react-icons/bi';
import PropTypes from 'prop-types';
import css from './styles.module.css';

export default function Searchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = event => {
    event.preventDefault();

    setInputValue(() => {
      // console.log('Ввели пошуковий запит в інпут Searchbar');

      return event.target.value;
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() !== '') {
      // console.log('Запит валідний, відправляємо його в Арр');

      onSubmit(inputValue);
    } else {
      // console.log('Запит не валідний, виводимо інформаційне вікно');

      Notify.info('Please enter a valid value.');
      return;
    }
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={css.SearchFormButton}
          disabled={inputValue.trim() === ''}
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
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
