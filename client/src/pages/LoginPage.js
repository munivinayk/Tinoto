import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../Assets/logo.svg';
import LoginForm from '../components/LoginForm';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const handleSubmit = (loginData) => {
    console.log('Login submitted:', loginData);
    // Implement your login logic here
  };

  return (
    <div className="login-page">
      <Link to="/" className="login-logo">
        <Logo className="login-logo-icon" />
        <span className="login-logo-text">Tinoto</span>
      </Link>
      
      <div className="login-container">
        <h2 className="login-title">Log in to Tinoto</h2>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;