import { apiClient } from "..";

export const getDaily = async () => {
  return apiClient.get("stats/daily");
};
