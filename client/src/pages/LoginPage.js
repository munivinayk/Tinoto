import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../Assets/logo.svg';
import LoginForm from '../components/LoginForm';
import authService from '../Services/authService';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (userData) => {
    try {
      const response = await authService.login(userData.email, userData.password);
      console.log('Login response:', response);
      
      if (response && response.token) {
        console.log('Login successful, navigating to dashboard');
        localStorage.setItem('user', JSON.stringify(response));
        navigate('/dashboard');
      } else {
        console.error('Login failed: No token in response');
        setError('Login failed: Please try again');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'An error occurred during login');
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="login-logo">
        <Logo className="login-logo-icon" />
        <span className="login-logo-text">Tinoto</span>
      </Link>
      
      <div className="login-container">
        <h2 className="login-title">Log in to Tinoto</h2>
        {error && <div className="error-message">{error}</div>}
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default LoginPage;