import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import './Main.css';

const Main = ({
  searchResults,
  isSearching,
  searchError,
  hasSearched,
  savedArticles,
  onSave,
  onDelete,
  visibleCount,
  onShowMore,
}) => {
  const renderSearchSection = () => {
    if (isSearching) return <Preloader />;

    if (searchError) {
      return (
        <div className="main__status">
          <p className="main__status-text main__status-text_error">{searchError}</p>
        </div>
      );
    }

    if (hasSearched && searchResults.length === 0) {
      return (
        <div className="main__status">
          <p className="main__status-icon">🔍</p>
          <p className="main__status-title">Nothing found</p>
          <p className="main__status-text">
            Sorry, but nothing matched your search terms.
          </p>
        </div>
      );
    }

    if (hasSearched && searchResults.length > 0) {
      return (
        <NewsCardList
          articles={searchResults}
          savedArticles={savedArticles}
          onSave={onSave}
          onDelete={onDelete}
          visibleCount={visibleCount}
          onShowMore={onShowMore}
        />
      );
    }

    return null;
  };

  return (
    <main className="main">
      {renderSearchSection()}
      <About />
    </main>
  );
};

export default Main;
