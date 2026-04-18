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
          {isMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke={isDark ? '#1a1b22' : '#fff'} strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <>
              <span />
              <span />
            </>
          )}
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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
