import { Component } from 'react';
import propTypes from 'prop-types';
import css from './styles.module.css';

export class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount, додали слухача на віндовс');
    window.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    console.log('Modal componentWillUnmount, видалили слухача на віндовс');
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose = event => {
    console.log('handleClose');
    if (event.code === 'Escape') {
      console.log('При натисканні Escape закриваємо модалку');

      return this.props.onCloseModal();
    }
  };

  render() {
    const { largeImage, onCloseModal } = this.props;
    return (
      <div className={css.Overlay} onClick={onCloseModal}>
        <div className={css.Modal}>
          <img src={largeImage} alt="largeImage" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImage: propTypes.string,
  onCloseModal: propTypes.func,
};
