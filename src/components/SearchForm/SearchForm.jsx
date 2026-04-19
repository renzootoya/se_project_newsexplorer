import { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!keyword.trim()) {
      setError('Please enter a keyword');
      return;
    }
    setError('');
    onSearch(keyword.trim());
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__container">
        <input
          className="search-form__input"
          type="text"
          placeholder="Enter topic"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            if (error) setError('');
          }}
        />
        <button className="search-form__btn" type="submit">
          Search
        </button>
      </div>
      {error && <p className="search-form__error">{error}</p>}
    </form>
  );
};

export default SearchForm;
