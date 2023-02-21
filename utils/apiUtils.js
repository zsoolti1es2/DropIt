import axios from 'axios';

const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
};

const apiCall = async (url, method, data = null, headers = {}) => {
  const response = await axios({
    url,
    method,
    data,
    headers,
  });

  return handleResponse(response);
};

export default apiCall;
