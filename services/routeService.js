import { BASE_URL } from "../utils/constants";
import { handleApiError } from "../utils/errorHandling";

export async function getRoutes(params) {
  try {
    const url = new URL(`${BASE_URL}/routes`);
    if (params) {
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } else {
      return handleApiError(response);
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "An error occurred while fetching the routes.",
    };
  }
}
