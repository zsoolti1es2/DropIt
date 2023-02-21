import { API_BASE_URL } from '../utils/constants';
import { handleResponse, handleError } from '../utils/apiUtils';

export const fetchRoutes = async (searchParams) => {
  const queryParams = new URLSearchParams(searchParams).toString();
  const response = await fetch(`${API_BASE_URL}/routes?${queryParams}`);
  return handleResponse(response);
};

export const fetchRouteDetails = async (routeId) => {
  const response = await fetch(`${API_BASE_URL}/routes/${routeId}`);
  return handleResponse(response);
};
