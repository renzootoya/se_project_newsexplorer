import { useCurrentUser } from '../../contexts/CurrentUserContext';
import bookmarkIcon from '../../assets/bookmark.svg';
import bookmarkActiveIcon from '../../assets/bookmark-active.svg';
import trashIcon from '../../assets/trash.svg';
import './NewsCard.css';

const NewsCard = ({ article, onSave, onDelete, isSaved, keyword, showKeyword, variant }) => {
  const { isLoggedIn } = useCurrentUser();
  const isSavedPage = variant === 'saved';

  const handleActionClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSavedPage) {
      onDelete(article);
    } else {
      if (!isLoggedIn) return;
      if (isSaved) {
        onDelete(article);
      } else {
        onSave(article);
      }
    }
  };

  const cardUrl = article.url || article.link || '#';

  return (
    <li className="news-card">
      <a href={cardUrl} target="_blank" rel="noreferrer" className="news-card__link">
        {article.urlToImage ? (
          <img className="news-card__image" src={article.urlToImage} alt={article.title} />
        ) : (
          <div className="news-card__image news-card__image_placeholder" />
        )}
        <div className="news-card__content">
          <p className="news-card__date">{article.formattedDate || ''}</p>
          <h3 className="news-card__title">{article.title}</h3>
          <p className="news-card__description">{article.description}</p>
          <p className="news-card__source">{article.source?.name}</p>
        </div>
      </a>

      {showKeyword && keyword && (
        <span className="news-card__keyword">{keyword}</span>
      )}

      <div className="news-card__actions">
        {isSavedPage ? (
          <button
            className="news-card__delete"
            onClick={handleActionClick}
            title="Remove from saved"
          >
            <img src={trashIcon} alt="Delete" />
          </button>
        ) : (
          <button
            className={`news-card__bookmark ${!isLoggedIn ? 'news-card__bookmark_disabled' : ''}`}
            onClick={handleActionClick}
            title={!isLoggedIn ? 'Sign in to save articles' : isSaved ? 'Remove from saved' : 'Save article'}
          >
            <img src={isSaved ? bookmarkActiveIcon : bookmarkIcon} alt="Bookmark" />
            {!isLoggedIn && (
              <span className="news-card__tooltip">Sign in to save articles</span>
            )}
          </button>
        )}
      </div>
    </li>
  );
};

export default NewsCard;
