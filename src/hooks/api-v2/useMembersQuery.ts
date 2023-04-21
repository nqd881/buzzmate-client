import { getMembersApi } from "@apis/chat/get-members";
import { useQuery } from "@tanstack/react-query";
import { KEY_LIST_MEMBERS_OF_CHAT } from "./keys";

export const useMembersQuery = (chatId: string) => {
  return useQuery({
    queryKey: KEY_LIST_MEMBERS_OF_CHAT(chatId),
    queryFn: () => getMembersApi(chatId),
  });
};
