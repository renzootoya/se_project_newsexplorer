const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const checkResponse = (res) => {
  if (res.ok) return res.json();
  return res.json().then((data) => {
    throw new Error(data.message || `Error: ${res.status}`);
  });
};

export const getSavedArticles = (token) => {
  return fetch(`${BASE_URL}/articles`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
};

export const saveArticle = (token, article) => {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(article),
  }).then(checkResponse);
};

export const deleteArticle = (token, articleId) => {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
};
