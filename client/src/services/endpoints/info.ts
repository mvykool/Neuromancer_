import apiClient from "../client";

export const getInfo = async () => {
  // -- TODO: add proper endpoint
  return apiClient.get("/");
};
