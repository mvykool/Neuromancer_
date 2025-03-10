import { RequestOptions } from "../types/types";

// -- TODO: create env. and add URL
const API_URL = import.meta.env.VITE_API_URl || "https://api.example.com";

async function fetchClient(endpoint: string, options: RequestOptions = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);

    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || response.statusText);
    }

    // Return null for 204 No Content
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export default {
  get: (endpoint: string) => fetchClient(endpoint),
};
