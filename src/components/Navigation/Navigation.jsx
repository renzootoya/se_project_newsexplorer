import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import './Navigation.css';

const Navigation = ({ onSignIn, onLogout, theme }) => {
  const { isLoggedIn, currentUser } = useCurrentUser();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className={`navigation ${isDark ? 'navigation_theme_dark' : ''}`}>
        <button
          className={`navigation__burger ${isDark ? 'navigation__burger_dark' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navigation__menu ${isMenuOpen ? 'navigation__menu_open' : ''} ${isDark ? 'navigation__menu_dark' : ''}`}>
          <Link
            to="/"
            className={`navigation__link ${location.pathname === '/' ? 'navigation__link_active' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/saved-news"
                className={`navigation__link ${location.pathname === '/saved-news' ? 'navigation__link_active' : ''}`}
                onClick={closeMenu}
              >
                Saved articles
              </Link>
              <button className="navigation__logout-btn" onClick={() => { onLogout(); closeMenu(); }}>
                {currentUser?.name}
              </button>
            </>
          ) : (
            <button className="navigation__signin-btn" onClick={() => { onSignIn(); closeMenu(); }}>
              Sign in
            </button>
          )}
        </div>
      </nav>

      {isMenuOpen && (
        <div className="navigation__overlay" onClick={closeMenu} />
      )}
    </>
  );
};

export default Navigation;
