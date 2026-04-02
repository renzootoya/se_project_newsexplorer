import { useCurrentUser } from '../../contexts/CurrentUserContext';
import './NewsCard.css';

const NewsCard = ({ article, onSave, onDelete, isSaved, keyword, showKeyword }) => {
  const { isLoggedIn } = useCurrentUser();

  const handleBookmarkClick = () => {
    if (!isLoggedIn) return;
    if (isSaved) {
      onDelete(article);
    } else {
      onSave(article);
    }
  };

  return (
    <li className="news-card">
      <a href={article.url} target="_blank" rel="noreferrer" className="news-card__link">
        {article.urlToImage && (
          <img
            className="news-card__image"
            src={article.urlToImage}
            alt={article.title}
          />
        )}
        <div className="news-card__content">
          <p className="news-card__date">{article.formattedDate || ''}</p>
          <h3 className="news-card__title">{article.title}</h3>
          <p className="news-card__description">{article.description}</p>
          <p className="news-card__source">{article.source?.name}</p>
        </div>
      </a>

      <div className="news-card__actions">
        {showKeyword && keyword && (
          <span className="news-card__keyword">{keyword}</span>
        )}
        <button
          className={`news-card__bookmark ${isSaved ? 'news-card__bookmark_active' : ''} ${!isLoggedIn ? 'news-card__bookmark_disabled' : ''}`}
          onClick={handleBookmarkClick}
          title={!isLoggedIn ? 'Sign in to save articles' : isSaved ? 'Remove from saved' : 'Save article'}
        >
          {!isLoggedIn && (
            <span className="news-card__tooltip">Sign in to save articles</span>
          )}
        </button>
      </div>
    </li>
  );
};

export default NewsCard;
