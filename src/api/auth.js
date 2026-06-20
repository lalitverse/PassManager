// This is the production API service layer.
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

const handleApiError = (error) => {
  if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
    throw new Error('Network Error: Could not connect to the backend server. Ensure it is running on port 5000.');
  }
  throw error;
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    
    if (data.token) {
      localStorage.setItem('cv_jwt_token', data.token);
    }
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};

export const submitNewPassword = async (email, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword })
    });
    const data = await response.json();
    if (!data.success) throw new Error(data.message);
    return data;
  } catch (error) {
    handleApiError(error);
  }
};
