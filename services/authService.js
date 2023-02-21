import { AsyncStorage } from 'react-native';
import { API_URL } from '../utils/constants';
import { postData } from '../utils/apiUtils';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      // login successful
      return { success: true };
    } else {
      // login failed
      return { success: false, message: data.message };
    }
  } catch (error) {
    // network or server error
    return { success: false, message: 'Network error' };
  }
};

export const register = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      // registration successful
      return { success: true };
    } else {
      // registration failed
      return { success: false, message: data.message };
    }
  } catch (error) {
    // network or server error
    return { success: false, message: 'Network error' };
  }
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    throw error;
  }
};

export const isAuthenticated = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token !== null;
  } catch (error) {
    throw error;
  }
};
