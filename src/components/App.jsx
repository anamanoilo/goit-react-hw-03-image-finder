import { Component } from 'react';
import Searchbar from './Searchbar';
// import Modal from './Modal';
import Main from './Main/Main';

class App extends Component {
  state = {
    query: '',
    modalIsShown: false,
  };

  onSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { onSubmit } = this;
    return (
      <>
        <Searchbar onSubmit={onSubmit} />
        <Main query={this.state.query} />
      </>
    );
  }
}

export default App;
