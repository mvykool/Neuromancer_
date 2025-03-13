import { RequestOptions } from "../types/types";

// -- TODO: create env. and add URL
const baseUrl = import.meta.env.VITE_URL;

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
    // Check if we have cached data that's not expired
    const cachedData = localStorage.getItem("dashboardData");
    const cachedTimestamp = localStorage.getItem("dashboardDataTimestamp");

    const now = Date.now();
    const cacheExpiryTime = now - 6 * 60 * 60 * 1000;

    if (
      cachedData &&
      cachedTimestamp &&
      parseInt(cachedTimestamp) > cacheExpiryTime
    ) {
      return JSON.parse(cachedData);
    }

    const response = await fetch(`${baseUrl}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || response.statusText);
    }

    if (response.status === 204) {
      return null;
    }

    const data = await response.json();

    // Cache the response and timestamp
    localStorage.setItem("dashboardData", JSON.stringify(data));
    localStorage.setItem("dashboardDataTimestamp", now.toString());

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export default {
  get: (endpoint: string) => fetchClient(endpoint),
};
