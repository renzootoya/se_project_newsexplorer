import { Link, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import './Navigation.css';

const Navigation = ({ onSignIn, onLogout, theme }) => {
  const { isLoggedIn, currentUser } = useCurrentUser();
  const location = useLocation();

  return (
    <nav className={`navigation ${theme === 'dark' ? 'navigation_theme_dark' : ''}`}>
      <Link
        to="/"
        className={`navigation__link ${location.pathname === '/' ? 'navigation__link_active' : ''}`}
      >
        Home
      </Link>

      {isLoggedIn ? (
        <>
          <Link
            to="/saved-news"
            className={`navigation__link ${location.pathname === '/saved-news' ? 'navigation__link_active' : ''}`}
          >
            Saved articles
          </Link>
          <button className="navigation__logout-btn" onClick={onLogout}>
            {currentUser?.name}
          </button>
        </>
      ) : (
        <button className="navigation__signin-btn" onClick={onSignIn}>
          Sign in
        </button>
      )}
    </nav>
  );
};

export default Navigation;
