const API_URL = 'https://myapi.com/';

export async function getRoutes() {
  try {
    const response = await fetch(`${API_URL}routes`);
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error retrieving routes' };
  }
}

export async function addRoute(route) {
  try {
    const response = await fetch(`${API_URL}routes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(route),
    });
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error adding route' };
  }
}

export async function updateRoute(route) {
  try {
    const response = await fetch(`${API_URL}routes/${route.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(route),
    });
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error updating route' };
  }
}

export async function deleteRoute(routeId) {
  try {
    const response = await fetch(`${API_URL}routes/${routeId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return { success: true };
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Error deleting route' };
  }
}
