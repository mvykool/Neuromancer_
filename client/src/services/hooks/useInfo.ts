import { useQuery } from "@tanstack/react-query";
import { getInfo } from "../endpoints/info";

export const useInfo = (options = {}) => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getInfo,
    ...options,
  });
};
