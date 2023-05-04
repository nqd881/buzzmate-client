import { getUsersApi } from "@apis/chat/get-users";
import { useQuery } from "@tanstack/react-query";
import { remoteKey } from "./keys";

export const REMOTE_SEARCH_USERS = remoteKey(["search", "users"]);

export const useSearchUsersQuery = (emails: string[]) => {
  return useQuery({
    queryKey: REMOTE_SEARCH_USERS,
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
