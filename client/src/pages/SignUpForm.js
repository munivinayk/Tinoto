import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import authService from '../Services/authService';
import '../styles/SignUpForm.css';

const SignUpForm = ({ onSubmit, darkMode, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await authService.register(email, password);
      onSubmit(data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  };

  const handleGoogleSignUp = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
  };

  const handleFacebookSignUp = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/facebook`;
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      {error && <div className="error-message">{error}</div>}
      <button type="button" className="social-signup facebook" onClick={handleFacebookSignUp}>
        <FaFacebook />
        Sign up with Facebook
      </button>
      <button type="button" className="social-signup google" onClick={handleGoogleSignUp}>
        <FaGoogle />
        Sign up with Google
      </button>
      
      <div className="separator">or</div>
      
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="password-input">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      
      <button type="submit" className="submit-button">
        Sign up with email
      </button>
      <div className="login-prompt">
        Already have an account? <a href="#" onClick={(e) => {
          e.preventDefault();
          onSwitchToLogin();
        }}>Log in</a>
      </div>

    </form>
  );
};

export default SignUpForm;
