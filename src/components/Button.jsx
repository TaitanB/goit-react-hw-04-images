import React from 'react';
import PropTypes from 'prop-types';
import css from './styles.module.css';

export const Button = props => {
  const { loadMore } = props;
  return (
    <>
      <button className={css.Button} onClick={loadMore}>
        Load more
      </button>
    </>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
