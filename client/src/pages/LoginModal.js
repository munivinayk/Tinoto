import React from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import '../styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose, darkMode, onSwitchToSignUp, onLoginSuccess }) => {
  if (!isOpen) return null;

  const handleSubmit = (userData) => {
    console.log('Login successful:', userData);
    onLoginSuccess(userData);
    onClose();
  };

  return (
    <div className={`modal-overlay ${darkMode ? 'dark' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Log in to Tinoto</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>
        <LoginForm 
          onSubmit={handleSubmit} 
          darkMode={darkMode} 
          onSwitchToSignUp={onSwitchToSignUp}
        />
      </div>
    </div>
  );
};

export default LoginModal;