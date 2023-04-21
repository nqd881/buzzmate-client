import { getAllChatsApi } from "@apis/chat/get-all-chats";
import { useChats } from "@hooks/data-x/useChats";
import { useQuery } from "@tanstack/react-query";

export const useChatsQuery = () => {
  const { setChats } = useChats();

  return useQuery({
    queryKey: ["chats"],
    queryFn: () => getAllChatsApi(),
    onSuccess: (chats) => {
      setChats(chats);
    },
  });
};
