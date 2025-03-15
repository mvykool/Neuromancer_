import { useQuery } from "@tanstack/react-query";
import { getDaily, getInfo } from "../endpoints/info";

export const useInfo = (options = {}) => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getInfo,
    ...options,
  });
};

export const useDaily = (options = {}) => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getDaily,
    ...options,
  });
};
