import { getUsersApi } from "@apis/chat/get-users";
import { convertApiChatUser } from "@hooks/convert/chat-user";
import { useQuery } from "@tanstack/react-query";

export const useSearchUsersQuery = (emails: string[]) => {
  return useQuery({
    queryKey: ["search", "users"],
    queryFn: async () => {
      console.log("call api with emails", emails);

      const users = await getUsersApi({
        emails,
      });

      return users.map((user) => convertApiChatUser(user));
    },
    // staleTime: 60 * 100,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: false,
    enabled: !!emails,
  });
};
