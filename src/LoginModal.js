import React from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose, darkMode, onSwitchToSignUp }) => {
  if (!isOpen) return null;

  const handleSubmit = (loginData) => {
    console.log('Login submitted:', loginData);
    // Implement your login logic here
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