import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './styles.module.css';

export class Modal extends Component {
  componentDidMount() {
    // console.log('Modal componentDidMount, додали слухача на віндовс');
    window.addEventListener('keydown', this.handleClose);
  }

  componentWillUnmount() {
    // console.log('Modal componentWillUnmount, видалили слухача на віндовс');
    window.removeEventListener('keydown', this.handleClose);
  }

  handleClose = event => {
    if (event.code === 'Escape' || event.target.className === css.Overlay) {
      // console.log(
      //   'При натисканні Escape або кліку на оверлей закриваємо модалку'
      // );

      return this.props.onCloseModal();
    }
  };

  render() {
    const { largeImage } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleClose}>
        <div className={css.Modal}>
          <img src={largeImage} alt="largeImage" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
