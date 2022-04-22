import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

class Searchbar extends Component {
  state = {
    query: '',
  };

  inputHandler = e => {
    this.setState(prev => ({ ...prev, query: e.target.value }));
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  render() {
    const { query } = this.state;
    const { inputHandler, submitHandler } = this;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={submitHandler}>
          <button type="submit" className="SearchForm-button">
            {/* <span className="SearchForm-button-label"></span> */}
            <AiOutlineSearch />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={inputHandler}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
