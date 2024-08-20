import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard'); // Redirect to your app's main page
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default OAuthSuccess;
