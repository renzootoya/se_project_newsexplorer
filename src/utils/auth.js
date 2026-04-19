// Stage 1 stub auth — no real backend yet
// Simulates login/register using localStorage

export const register = ({ email, password, name }) => {
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem('_users') || '[]');
    if (users.find((u) => u.email === email)) {
      return reject(new Error('User with this email already exists'));
    }
    const user = { email, password, name, _id: Date.now().toString() };
    users.push(user);
    localStorage.setItem('_users', JSON.stringify(users));
    resolve({ message: 'User created' });
  });
};

export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const users = JSON.parse(localStorage.getItem('_users') || '[]');
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return reject(new Error('Incorrect email or password'));
    }
    const token = btoa(JSON.stringify({ _id: user._id, email: user.email }));
    resolve({ token });
  });
};

export const getUserInfo = (token) => {
  return new Promise((resolve, reject) => {
    try {
      const payload = JSON.parse(atob(token));
      const users = JSON.parse(localStorage.getItem('_users') || '[]');
      const user = users.find((u) => u._id === payload._id);
      if (!user) return reject(new Error('User not found'));
      resolve({ _id: user._id, email: user.email, name: user.name });
    } catch {
      reject(new Error('Invalid token'));
    }
  });
};
