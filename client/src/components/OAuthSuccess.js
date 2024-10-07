import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import authService from '../Services/authService';

const OAuthSuccess = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      authService.handleOAuthSuccess(token);
    }
  }, [location]);

  return (
    <div>
      <h2>Authentication successful</h2>
      <p>Redirecting...</p>
    </div>
  );
};

export default OAuthSuccess;
