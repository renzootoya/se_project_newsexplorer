const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const checkResponse = (res) => {
  if (res.ok) return res.json();
  return res.json().then((data) => {
    throw new Error(data.message || `Error: ${res.status}`);
  });
};

export const register = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
};
