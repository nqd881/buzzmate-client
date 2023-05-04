import { getMembersApi } from "@apis/chat/get-members";
import { useQuery } from "@tanstack/react-query";
import { remoteKey } from "./keys";

export const REMOTE_MEMBERS = (chatId: string) =>
  remoteKey((chatId) => [chatId, "members"], chatId);

export const useMembersQuery = (chatId: string) => {
  return useQuery({
    queryKey: REMOTE_MEMBERS(chatId),
    queryFn: () => getMembersApi(chatId),
  });
};
