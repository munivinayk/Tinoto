import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OAuthSuccess from './components/OAuthSuccess';
import Guide from './pages/WriteTravelGuide';
import ExplorePage from './pages/ExplorePage';
import NavBar from './components/NavBar';
import PlanPage from './pages/PlanPage'

import './styles/TinotoCommon.css';

const App = () => {
  const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., by checking for a valid token in localStorage)
    return localStorage.getItem('token') !== null;
  };

  return (
    <div className="tinoto-app">
    <NavBar/>
    <div className="tinoto-content">
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/" /> : <LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route 
          path="/home" 
          element={isAuthenticated() ?  <Navigate to="/" /> : <HomePage />}
        />
        <Route path="/guide" element={<Guide />} />
        <Route path="/explore/:name" element={<ExplorePage />} />
        <Route path="/plan/:planId" element={<PlanPage />} />
      </Routes>
      </div>
    </div>
    
  );
};

export default App;