// Stage 1 stub — saves articles to localStorage, no backend yet

const STORAGE_KEY = '_savedArticles';

const getAll = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
const saveAll = (articles) => localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));

export const getSavedArticles = () => {
  return Promise.resolve(getAll());
};

export const saveArticle = (token, article) => {
  return new Promise((resolve) => {
    const articles = getAll();
    const saved = { ...article, _id: Date.now().toString() };
    articles.push(saved);
    saveAll(articles);
    resolve(saved);
  });
};

export const deleteArticle = (token, articleId) => {
  return new Promise((resolve) => {
    const articles = getAll().filter((a) => a._id !== articleId);
    saveAll(articles);
    resolve({ message: 'Article deleted' });
  });
};
