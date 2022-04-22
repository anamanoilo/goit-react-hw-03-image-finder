import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
// import Modal from 'components/Modal';
import Button from 'components/Button';
import api from 'services/Api';

const statuses = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

class Main extends Component {
  state = {
    status: statuses.IDLE,
    hits: [],
    loadMore: false,
    modalIsShown: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.setState({ hits: [] });
      api.resetPage();
      this.loadPhotos();
      return;
    }
    if (prevState.loadMore && !this.state.loadMore) {
      toast.info("We're sorry, but you've reached the end of search results.");
      console.log('toast', toast);
    }
  }

  onLoadMore = () => {
    api.incrementPage();
    this.loadPhotos();
  };

  loadPhotos = async () => {
    api.query = this.props.query;
    try {
      await this.setState({ status: statuses.PENDING });
      const data = await api.fetchPhotos();
      if (!data.hits.length) {
        toast.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        this.setState({ status: statuses.REJECTED });
        return;
      }
      const pages = Math.ceil(data.totalHits / 12);
      this.setState(prev => {
        return {
          ...prev,
          hits: [...prev.hits, ...data.hits],
          status: statuses.RESOLVED,
          loadMore: !!(api.page !== pages),
        };
      });
    } catch (error) {
      this.setState({ status: statuses.REJECTED });
      toast.error('Something went wrong. Please try again');
    }
  };

  render() {
    const { onLoadMore } = this;
    const { status, hits, loadMore } = this.state;
    if (status === 'idle') {
      return null;
    }
    if (status === 'pending') {
      return (
        <>
          <ImageGallery hits={hits} />
          <Loader />
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <>
          <ToastContainer
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      );
    }
    if (status === 'resolved') {
      return (
        <>
          <ImageGallery hits={hits} />
          {loadMore ? <Button onClick={onLoadMore} /> : null}
          <ToastContainer
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      );
    }
  }
}

export default Main;
