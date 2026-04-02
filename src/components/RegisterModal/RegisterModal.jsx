import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const RegisterModal = ({ isOpen, onClose, onRegister, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    onRegister({ email, password, name: username }).catch((err) => {
      setError(err.message || 'Registration failed. Please try again.');
    });
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setError('');
    onClose();
  };

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitText="Sign up"
      altLink={{
        text: 'Already have an account?',
        linkText: 'Sign in',
        onClick: onSwitchToLogin,
      }}
    >
      <label className="modal__label" htmlFor="register-email">Email</label>
      <input
        id="register-email"
        className="modal__input"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="modal__label" htmlFor="register-password">Password</label>
      <input
        id="register-password"
        className="modal__input"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label className="modal__label" htmlFor="register-username">Username</label>
      <input
        id="register-username"
        className="modal__input"
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
};

export default RegisterModal;
