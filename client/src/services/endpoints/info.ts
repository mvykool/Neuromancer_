import apiClient from "../client";

export const getInfo = async () => {
  return apiClient.get("dashboard");
};

export const getDaily = async () => {
  return apiClient.get("stats/daily");
};
