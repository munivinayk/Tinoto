import React from 'react';
import { X } from 'lucide-react';
import SignUpForm from '../components/SignUpForm';
import '../styles/SignUpModal.css';

const SignUpModal = ({ isOpen, onClose, darkMode, onSwitchToLogin }) => {
  if (!isOpen) return null;

  const handleSubmit = (signUpData) => {
    console.log('Sign up submitted:', signUpData);
    // Implement your sign up logic here
  };

  return (
    <div className={`modal-overlay ${darkMode ? 'dark' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Sign up to take your trip planning to the next level</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>
        <SignUpForm 
          onSubmit={handleSubmit} 
          darkMode={darkMode}
          onSwitchToLogin={onSwitchToLogin}
        />
      </div>
    </div>
  );
};

export default SignUpModal;
