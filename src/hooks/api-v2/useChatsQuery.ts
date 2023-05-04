import { getAllChatsApi } from "@apis/chat/get-all-chats";
import { useChats } from "@hooks/data-x/useChats";
import { useQuery } from "@tanstack/react-query";
import { remoteKey } from "./keys";

export const REMOTE_CHATS = remoteKey(["chats"]);

export const useChatsQuery = () => {
  const { setChats } = useChats();

  return useQuery({
    queryKey: REMOTE_CHATS,
    queryFn: () => getAllChatsApi(),
    onSuccess: (chats) => {
      setChats(chats);
    },
  });
};
