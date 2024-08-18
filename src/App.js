import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;