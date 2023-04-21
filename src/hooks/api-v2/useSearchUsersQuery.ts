import { getUsersApi } from "@apis/chat/get-users";
import { useQuery } from "@tanstack/react-query";

export const useSearchUsersQuery = (emails: string[]) => {
  return useQuery({
    queryKey: ["search", "users"],
    queryFn: () =>
      getUsersApi({
        emails,
      }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
    enabled: !!emails,
  });
};
