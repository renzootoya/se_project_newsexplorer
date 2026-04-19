import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';

const Header = ({ onSignIn, onLogout, onSearch, theme, hideSarch }) => {
  const isDark = theme === 'dark';

  return (
    <header className={`header ${isDark ? 'header_theme_dark' : ''}`}>
      <div className="header__content">
        <div className="header__top">
          <Link to="/" className={`header__logo ${isDark ? 'header__logo_dark' : ''}`}>
            NewsExplorer
          </Link>
          <Navigation onSignIn={onSignIn} onLogout={onLogout} theme={isDark ? 'dark' : ''} />
        </div>
        {!hideSarch && (
          <div className="header__hero">
            <h1 className="header__title">What&apos;s going on in the world?</h1>
            <p className="header__subtitle">
              Find the latest news on any topic and save them in your personal account.
            </p>
            <SearchForm onSearch={onSearch} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
