import apiClient from "../client";

export const getInfo = async () => {
  return apiClient.get("dashboard");
};
