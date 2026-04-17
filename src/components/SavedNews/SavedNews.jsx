import Header from '../Header/Header';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCard from '../NewsCard/NewsCard';
import Footer from '../Footer/Footer';
import './SavedNews.css';

const SavedNews = ({ savedArticles, onDelete, onLogout }) => {
  return (
    <div className="saved-news-page">
      <Header
        onLogout={onLogout}
        theme="dark"
        hideSarch
      />
      <SavedNewsHeader savedArticles={savedArticles} />
      <main className="saved-news-page__main">
        {savedArticles.length === 0 ? (
          <div className="saved-news-page__empty">
            <p className="saved-news-page__empty-icon">🗂</p>
            <p className="saved-news-page__empty-title">Nothing saved yet</p>
            <p className="saved-news-page__empty-text">
              Go search for news and save the articles you like.
            </p>
          </div>
        ) : (
          <ul className="saved-news-page__cards">
            {savedArticles.map((article, idx) => (
              <NewsCard
                key={article._id || idx}
                article={{
                  title: article.title,
                  description: article.text,
                  publishedAt: article.date,
                  formattedDate: article.date,
                  urlToImage: article.image,
                  url: article.link,
                  source: { name: article.source },
                }}
                variant="saved"
                isSaved={true}
                onDelete={() => onDelete(article)}
                showKeyword={true}
                keyword={article.keyword}
              />
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SavedNews;
