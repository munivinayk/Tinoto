import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import '../styles/LoginForm.css';

const LoginForm = ({ onSubmit, darkMode, onSwitchToSignUp }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <button type="button" className="social-login facebook">
        Log in with Facebook
      </button>
      <button type="button" className="social-login google">
        <span>G</span>
        Log in with Google
      </button>
      <button type="button" className="social-login apple">
        <span>🍎</span>
        Log in with Apple
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
      
      <div className="forgot-password">
        <a href="#">Forgot password</a>
      </div>
      
      <button type="submit" className="submit-button">
        Log in
      </button>
      
      <div className="signup-prompt">
        Don't have an account yet? <a href="#" onClick={(e) => {
          e.preventDefault();
          onSwitchToSignUp();
        }}>Sign up</a>
      </div>

    </form>
  );
};

export default LoginForm;