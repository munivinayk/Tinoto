import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import './SignUpForm.css';

const SignUpForm = ({ onSubmit, darkMode, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
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
