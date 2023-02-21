import { API_BASE_URL } from '@env';

export const getRoutes = async (accessToken) => {
  try {
    const response = await fetch(`${API_BASE_URL}/routes`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve routes');
    }

    const routes = await response.json();
    return {
      success: true,
      data: routes,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const getRouteDetails = async (accessToken, routeId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/routes/${routeId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve route details');
    }

    const routeDetails = await response.json();
    return {
      success: true,
      data: routeDetails,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error.message,
    };
  }
};
