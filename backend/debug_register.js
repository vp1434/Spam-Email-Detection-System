const axios = require('axios');

const registerUser = async () => {
  const url = 'http://localhost:5000/api/auth/register';
  const userData = {
    name: 'Test Debugger',
    email: 'testdebug_' + Date.now() + '@example.com',
    password: 'password123'
  };

  try {
    console.log('Attempting registration at:', url);
    console.log('Data:', userData);
    const res = await axios.post(url, userData);
    console.log('Response Status:', res.status);
    console.log('Response Data:', res.data);
  } catch (err) {
    if (err.response) {
      console.error('Error Response Status:', err.response.status);
      console.error('Error Response Data:', err.response.data);
    } else if (err.request) {
      console.error('No response received:', err.request);
    } else {
      console.error('Error setting up request:', err.message);
    }
  }
};

registerUser();
