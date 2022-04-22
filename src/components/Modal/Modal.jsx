import { Component } from 'react';

class Modal extends Component {
  closeModalByEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  closeByBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEsc);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEsc);
  }
  render() {
    const { url, title } = this.props;
    return (
      <div className="Overlay">
        <div className="Modal">
          <img src={url} alt={title} />
        </div>
      </div>
    );
  }
}

export default Modal;
