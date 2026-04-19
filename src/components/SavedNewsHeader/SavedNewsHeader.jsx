import { useCurrentUser } from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

const SavedNewsHeader = ({ savedArticles }) => {
  const { currentUser } = useCurrentUser();

  const keywords = savedArticles.map((a) => a.keyword).filter(Boolean);
  const unique = [...new Set(keywords)];

  const keywordSummary = () => {
    if (unique.length === 0) return '';
    if (unique.length === 1) return unique[0];
    if (unique.length === 2) return `${unique[0]}, and ${unique[1]}`;
    return `${unique[0]}, ${unique[1]}, and ${unique.length - 2} others`;
  };

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__label">Saved articles</p>
      <h1 className="saved-news-header__title">
        {currentUser?.name}, you have {savedArticles.length} saved article
        {savedArticles.length !== 1 ? 's' : ''}
      </h1>
      {unique.length > 0 && (
        <p className="saved-news-header__keywords">
          By keywords:{' '}
          <span className="saved-news-header__keywords-highlight">
            {keywordSummary()}
          </span>
        </p>
      )}
    </section>
  );
};

export default SavedNewsHeader;
