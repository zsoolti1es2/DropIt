import { AsyncStorage } from 'react-native';
import { API_URL } from '../utils/constants';
import { postData } from '../utils/apiUtils';

export const register = async (email, password, fullName) => {
  try {
    const response = await postData(`${API_URL}/users/register`, { email, password, fullName });
    const data = await response.json();

    if (response.ok) {
      const { token } = data;
      await AsyncStorage.setItem('token', token);
      return true;
    } else {
      const { message } = data;
      throw new Error(message);
    }
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await postData(`${API_URL}/users/login`, { email, password });
    const data = await response.json();

    if (response.ok) {
      const { token } = data;
      await AsyncStorage.setItem('token', token);
      return true;
    } else {
      const { message } = data;
      throw new Error(message);
    }
  } catch (error) {
    throw error;
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
