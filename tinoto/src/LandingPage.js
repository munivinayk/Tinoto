import React, { useState, useEffect } from 'react';
import { MapPin, Moon, Sun } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`landing-page ${darkMode ? 'dark' : ''}`}>
      <header className="header">
        <div className="logo">
          <MapPin className="logo-icon" />
          <span className="logo-text">Tinoto</span>
        </div>
        
        <nav className="nav">
          <button className="btn btn-login">Log in</button>
          <button className="btn btn-signup">Sign up</button>
          <button 
            onClick={toggleDarkMode} 
            className="btn btn-toggle"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <Sun className="toggle-icon" /> : <Moon className="toggle-icon" />}
          </button>
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
            <button className="btn btn-primary">Start planning</button>
            <button className="btn btn-secondary">Get the app</button>
          </div>
        </div>
        <div className="image-container">
          <img 
            src="/api/placeholder/800/600" 
            alt="Traveler overlooking a scenic landscape" 
            className="hero-image"
          />
          <div className="image-overlay"></div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
