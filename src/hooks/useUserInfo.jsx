import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../api/Auth";

export const useUserInfo = (onError) => {
  return useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    onError:
      onError ||
      ((error) => {
        console.error("Failed to fetch user info:", error);
      }),
  });
};
