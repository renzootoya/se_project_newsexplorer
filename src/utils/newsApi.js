const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const isProduction = import.meta.env.MODE === 'production';
const BASE_URL = isProduction
  ? 'https://nomoreparties.co/news/v2/everything'
  : 'https://newsapi.org/v2/everything';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const getDateRange = () => {
  const to = new Date();
  const from = new Date();
  from.setDate(from.getDate() - 7);
  const fmt = (d) => d.toISOString().split('T')[0];
  return { from: fmt(from), to: fmt(to) };
};

export const searchNews = (keyword) => {
  const { from, to } = getDateRange();
  const apiKeyParam = isProduction ? '' : `&apiKey=${API_KEY}`;
  const url = `${BASE_URL}?q=${encodeURIComponent(keyword)}&from=${from}&to=${to}&pageSize=100${apiKeyParam}`;

  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          throw new Error(data.message || 'Failed to fetch news');
        });
      }
      return res.json();
    })
    .then((data) => {
      return data.articles
        .filter((a) => a.title && a.title !== '[Removed]')
        .map((a) => ({
          ...a,
          formattedDate: formatDate(a.publishedAt),
        }));
    });
};
