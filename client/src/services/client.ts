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
    const cachedDate = localStorage.getItem("dashboardDataDate");
    const now = Date.now();
    const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD

    // Cache expires after 6 hours OR when the day changes
    const cacheExpiryTime = now - 6 * 60 * 60 * 1000;
    const isSameDay = cachedDate === today;

    if (
      cachedData &&
      cachedTimestamp &&
      parseInt(cachedTimestamp) > cacheExpiryTime &&
      isSameDay // Add day check
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

    // Cache the response with date information
    localStorage.setItem("dashboardData", JSON.stringify(data));
    localStorage.setItem("dashboardDataTimestamp", now.toString());
    localStorage.setItem("dashboardDataDate", today); // Store the date

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

export default {
  get: (endpoint: string) => fetchClient(endpoint),
};
