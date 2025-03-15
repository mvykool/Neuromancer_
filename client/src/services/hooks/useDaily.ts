import { useQuery } from "@tanstack/react-query";
import { getDaily } from "../endpoints/daily";

export const useDaily = (options = {}) => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getDaily,
    ...options,
  });
};
