import { getAllChatsApi } from "@apis/chat/get-all-chats";
import { ApiChat } from "@apis/models/chat";
import { convertApiChat } from "@hooks/convert/chat";
import { convertApiMessage } from "@hooks/convert/message";
import { useChats } from "@hooks/data/use-chats";
import { useQuery } from "@tanstack/react-query";

export type UseInitialChatsOptions = {
  initialData: ApiChat[];
};

export const useInitialChatsQuery = (options?: UseInitialChatsOptions) => {
  const { chats, addChat } = useChats();

  const chatsQuery = useQuery({
    queryKey: ["chats"],
    queryFn: async () => getAllChatsApi(),
    onSuccess: (data) => {
      data.forEach((apiChat) => {
        const chat = convertApiChat(apiChat);

        if (apiChat?.lastMessage)
          chat.messages.push(convertApiMessage(apiChat.lastMessage));

        if (chats.some((localChat) => localChat.id === chat.id)) return;

        addChat(chat);
      });
    },
    initialData: options?.initialData,
    refetchInterval: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  return chatsQuery;
};
