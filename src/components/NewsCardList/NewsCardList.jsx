import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

const CARDS_PER_PAGE = 3;

const NewsCardList = ({ articles, savedArticles, onSave, onDelete, visibleCount, onShowMore }) => {
  const visible = articles.slice(0, visibleCount);
  const hasMore = articles.length > visibleCount;

  const isSaved = (article) =>
    savedArticles.some((saved) => saved.url === article.url);

  return (
    <section className="news-card-list">
      <h2 className="news-card-list__title">Search results</h2>
      <ul className="news-card-list__cards">
        {visible.map((article, idx) => (
          <NewsCard
            key={article.url || idx}
            article={article}
            isSaved={isSaved(article)}
            onSave={onSave}
            onDelete={onDelete}
          />
        ))}
      </ul>
      {hasMore && (
        <button className="news-card-list__show-more" onClick={onShowMore}>
          Show more
        </button>
      )}
    </section>
  );
};

export default NewsCardList;
