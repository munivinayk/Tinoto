import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5001'}/api/auth`;
console.log('API_URL:', API_URL); // Add this line to check the value

const authService = {
  login: async (email, password) => {
    try {
      console.log('Attempting login with:', { email, password: '****' });
      const response = await axios.post(`${API_URL}/login`, { email, password });
      console.log('Login response:', response.data);
      
      if (response.data && response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      } else {
        throw new Error('Login failed: No token in response');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        throw new Error(error.response.data.message || 'Server responded with an error');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        throw new Error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        throw new Error('Error setting up request');
      }
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },

  register: async (email, password) => {
    try {
      console.log('Attempting to register with URL:', `${API_URL}/register`);
      const response = await axios.post(`${API_URL}/register`, { email, password });
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      throw error;
    }
  },

  handleOAuthSuccess: (token) => {
    localStorage.setItem('user', JSON.stringify({ token }));
    console.log("login sucess..!!")
    // Redirect to the desired page after successful OAuth login
    window.location.href = '/dashboard';
  },
};

export default authService;