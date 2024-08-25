import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OAuthSuccess from './components/OAuthSuccess';
import Guide from './pages/WriteTravelGuide';
import NavBar from './components/NavBar';
import './styles/TinotoCommon.css';

const App = () => {
  const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., by checking for a valid token in localStorage)
    return localStorage.getItem('token') !== null;
  };

  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={isAuthenticated() ? <Navigate to="/" /> : <LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route 
          path="/home" 
          element={isAuthenticated() ?  <Navigate to="/" /> : <HomePage />}
        />
        <Route path="/guide" element={<Guide />} />
      </Routes>
    </>
  );
};

export default App;