import { API_URL } from '@env';

const register = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message);
    error.status = response.status;
    throw error;
  }

  return data;
};

const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message);
    error.status = response.status;
    throw error;
  }

  return data;
};

export { register, login };
