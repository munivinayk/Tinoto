import React, { useState, useEffect } from 'react';
import { MapPin, Moon, Sun } from 'lucide-react';
import '../styles/LandingPage.css';
import LandingPagePic from '../Assets/TravellerLandingPageImage.png'
import { ReactComponent as Logo } from '../Assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { useTheme } from '../styles/ThemeContext';

const LandingPage = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useTheme();
    const navigate = useNavigate();
    
  const handleSwitchToSignUp = () => {
    setIsLoginModalOpen(false);
    setIsSignUpModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignUpModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    navigate('/dashboard'); // Redirect to dashboard after successful login
  };

  return (
    <div className={`landing-page ${darkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="logo">
          <Logo className="logo-icon" />
          <span className="logo-text">Tinoto</span>
        </div>
        
        <nav className="nav">
        <div className="cta-buttons">
          <button className="btn btn-primary" onClick={() => setIsLoginModalOpen(true)}>Log in</button>
          <button className="btn btn-signup" onClick={() => setIsSignUpModalOpen(true)}>Sign up</button>
          <button 
            onClick={toggleDarkMode}
            className="btn btn-toggle"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="toggle-icon" /> : <Moon className="toggle-icon" />}
          </button>
        </div>
        </nav>
      </header>

      <main className="main">
        <div className="content">
          <h1 className="title">A travel planner for everyone</h1>
          <p className="description">
            Organize flights & hotels and map your trips in a free travel app designed for
            vacation planning & road trips, powered by AI and advanced mapping technology.
          </p>
          <div className="cta-buttons">
            <Link to="/home">
            <button className="btn btn-primary">Start planning</button></Link>
            <button className="btn btn-secondary">Get the app</button>
          </div>
        </div>
        <div className="image-container">
          <img 
            src={LandingPagePic}
            alt="Traveler overlooking a scenic landscape"
            className="hero-image"
          />
          <div></div>
        </div>
      </main>
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        darkMode={darkMode}
        onSwitchToSignUp={handleSwitchToSignUp}
        onLoginSuccess={handleLoginSuccess}
      />
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={() => setIsSignUpModalOpen(false)} 
        darkMode={darkMode}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
};

export default LandingPage;
