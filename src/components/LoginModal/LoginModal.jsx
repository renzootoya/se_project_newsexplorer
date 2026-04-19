import { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    onLogin({ email, password }).catch((err) => {
      setError(err.message || 'Login failed. Please try again.');
    });
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <ModalWithForm
      title="Sign in"
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={handleSubmit}
      submitText="Sign in"
      altLink={{
        text: "Don't have an account?",
        linkText: 'Sign up',
        onClick: onSwitchToRegister,
      }}
    >
      <label className="modal__label" htmlFor="login-email">Email</label>
      <input
        id="login-email"
        className="modal__input"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label className="modal__label" htmlFor="login-password">Password</label>
      <input
        id="login-password"
        className="modal__input"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
};

export default LoginModal;
