import React, { useState, useEffect } from 'react';
import authService from '../Services/authService';
import { Eye, EyeOff } from 'lucide-react';
import '../styles/SignUpForm.css';

const SignUpForm = ({ onSubmit, darkMode, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await authService.register(email, password);
      onSubmit(data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
      console.error('Registration error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <button type="button" className="social-signup facebook">
        <span>f</span>
        Sign up with Facebook
      </button>
      <button type="button" className="social-signup google">
        <span>G</span>
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
