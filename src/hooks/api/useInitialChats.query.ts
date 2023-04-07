import { getAllChatsApi } from "@apis/chat/get-all-chats";
import { ApiChat } from "@apis/models/chat";
import { convertApiChat } from "@hooks/convert/chat";
import { convertApiMessage } from "@hooks/convert/message";
import { useChats } from "@hooks/use-chats";
import { useQuery } from "@tanstack/react-query";

export type UseInitialChatsOptions = {
  initialData: ApiChat[];
};

export const useInitialChatsQuery = (options?: UseInitialChatsOptions) => {
  const { chats, addChat, setChats } = useChats();

  const chatsQuery = useQuery({
    queryKey: ["chats"],
    queryFn: async () => getAllChatsApi(),
    onSuccess: (data) => {
      data.forEach((apiChat) => {
        const chat = convertApiChat(apiChat);

        if (chats.some((localChat) => localChat.id === chat.id)) return;

        addChat(convertApiChat(apiChat));
      });
    },
    initialData: options?.initialData,
    refetchInterval: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return chatsQuery;
};
