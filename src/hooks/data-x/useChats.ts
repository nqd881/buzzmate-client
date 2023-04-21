import { ApiChat } from "@apis/models/chat";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { compareDesc } from "date-fns";
import _ from "lodash";
import { buildMessagesHandlers } from "./useMessages";

export type UpdateChatsFn = (oldChats: ApiChat[]) => ApiChat[];

export type UpdateChatFn = (oldChat: ApiChat) => ApiChat;

export const useChats = () => {
  const queryClient = useQueryClient();

  const queryKey = ["local", "chats"];

  useQuery({
    queryKey,
    queryFn: () => queryClient.getQueryData<ApiChat[]>(queryKey) || [],
    initialData: [],
    staleTime: 0,
  });

  const sortChatsDesc = (chats: ApiChat[]) =>
    [...chats].sort((a, b) => {
      const aLastMessage =
        buildMessagesHandlers(queryClient, a.id).getLastMessage() ||
        a.lastMessage;

      const bLastMessage =
        buildMessagesHandlers(queryClient, b.id).getLastMessage() ||
        b.lastMessage;

      if (aLastMessage && bLastMessage)
        return compareDesc(
          new Date(aLastMessage?.date),
          new Date(bLastMessage?.date)
        );

      if (aLastMessage) return -1;

      if (bLastMessage) return 1;

      return 0;
    });

  const getChats = () => {
    return queryClient.getQueryData<ApiChat[]>(queryKey) || [];
  };

  const setChats = (updater: ApiChat[] | UpdateChatsFn) =>
    queryClient.setQueryData(queryKey, updater);
  // queryClient.setQueryData<ApiChat[]>(queryKey, (chats) => {
  //   if (typeof updater === "function") return sortChatsDesc(updater(chats));

  //   return sortChatsDesc(updater);
  // });

  const findChat = (chatId: string) => {
    const chats = getChats();

    return chats.find((chat) => chat.id === chatId);
  };

  const addChat = (addedChat: ApiChat) => {
    const existChat = findChat(addedChat.id);

    if (existChat) return;

    setChats((chats) => [...chats, addedChat]);
  };

  const updateChat = (
    updateChatId: string,
    chatUpdater: Partial<ApiChat> | UpdateChatFn
  ) => {
    setChats((chats) =>
      chats.map((chat) => {
        if (chat.id === updateChatId) {
          if (typeof chatUpdater === "function") return chatUpdater(chat);

          return _.merge(chat, chatUpdater);
        }

        return chat;
      })
    );
  };

  const replaceChat = (replaceChatId: string, chatReplaced: ApiChat) => {
    setChats((chats) =>
      chats.map((chat) => {
        if (chat.id === replaceChatId) {
          return chatReplaced;
        }

        return chat;
      })
    );
  };

  const removeChat = (removeChatId: string) => {
    setChats((chats) => chats.filter((chat) => chat.id !== removeChatId));
  };

  const chats = getChats();

  return {
    chats,
    sortChatsDesc,
    getChats,
    setChats,
    findChat,
    updateChat,
    replaceChat,
    addChat,
    removeChat,
  };
};
