import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal';
import SavedNews from '../SavedNews/SavedNews';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { searchNews } from '../../utils/newsApi';
import { register, login, getUserInfo } from '../../utils/auth';
import { getSavedArticles, saveArticle, deleteArticle } from '../../utils/savedArticles';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState('');

  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentKeyword, setCurrentKeyword] = useState('');

  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) return;
    getUserInfo(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        return getSavedArticles(token);
      })
      .then((articles) => setSavedArticles(articles))
      .catch(() => localStorage.removeItem('jwt'));
  }, []);

  const handleSearch = (keyword) => {
    setCurrentKeyword(keyword);
    setIsSearching(true);
    setSearchError('');
    setHasSearched(true);
    setVisibleCount(3);
    searchNews(keyword)
      .then((articles) => {
        setSearchResults(articles);
        setIsSearching(false);
      })
      .catch((err) => {
        setSearchError(err.message || 'Something went wrong. Please try again.');
        setIsSearching(false);
      });
  };

  const handleLogin = ({ email, password }) => {
    return login({ email, password }).then((data) => {
      localStorage.setItem('jwt', data.token);
      return getUserInfo(data.token);
    }).then((user) => {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setActiveModal('');
      return getSavedArticles(localStorage.getItem('jwt'));
    }).then((articles) => {
      setSavedArticles(articles);
    });
  };

  const handleRegister = ({ email, password, name }) => {
    return register({ email, password, name }).then(() => {
      return handleLogin({ email, password });
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setSavedArticles([]);
  };

  const handleSaveArticle = (article) => {
    const token = localStorage.getItem('jwt');
    const articleData = {
      keyword: currentKeyword,
      title: article.title,
      text: article.description || '',
      date: article.publishedAt || '',
      source: article.source?.name || '',
      link: article.url,
      image: article.urlToImage || '',
    };
    saveArticle(token, articleData)
      .then((saved) => setSavedArticles((prev) => [...prev, saved]))
      .catch(console.error);
  };

  const handleDeleteArticle = (article) => {
    const token = localStorage.getItem('jwt');
    const saved = savedArticles.find((s) => s.link === article.url || s.url === article.url);
    if (!saved) return;
    deleteArticle(token, saved._id)
      .then(() => setSavedArticles((prev) => prev.filter((a) => a._id !== saved._id)))
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <BrowserRouter>
        <div className="page">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header
                    onSignIn={() => setActiveModal('login')}
                    onLogout={handleLogout}
                    onSearch={handleSearch}
                  />
                  <Main
                    searchResults={searchResults}
                    isSearching={isSearching}
                    searchError={searchError}
                    hasSearched={hasSearched}
                    savedArticles={savedArticles}
                    onSave={handleSaveArticle}
                    onDelete={handleDeleteArticle}
                    visibleCount={visibleCount}
                    onShowMore={() => setVisibleCount((c) => c + 3)}
                  />
                  <Footer />
                </>
              }
            />
            <Route
              path="/saved-news"
              element={
                <ProtectedRoute>
                  <SavedNews
                    savedArticles={savedArticles}
                    onDelete={handleDeleteArticle}
                    onLogout={handleLogout}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <LoginModal
          isOpen={activeModal === 'login'}
          onClose={() => setActiveModal('')}
          onLogin={handleLogin}
          onSwitchToRegister={() => setActiveModal('register')}
        />
        <RegisterModal
          isOpen={activeModal === 'register'}
          onClose={() => setActiveModal('')}
          onRegister={handleRegister}
          onSwitchToLogin={() => setActiveModal('login')}
        />
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
