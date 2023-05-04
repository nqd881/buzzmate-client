import { ApiChat } from "@apis/models/chat";
import { localKey } from "@hooks/api-v2/keys";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { compareDesc } from "date-fns";
import { produce } from "immer";
import _ from "lodash";
import { buildMessagesHandlers } from "./useMessages";

export type ChatUpdater = (chat: ApiChat) => ApiChat;

export const LOCAL_CHATS = localKey(["chats"]);

export const buildChatsHandlers = (queryClient: QueryClient) => {
  const _buildCompareChatId = (chatId: string) => (chat: ApiChat) =>
    chat.id === chatId;

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
    return queryClient.getQueryData<ApiChat[]>(LOCAL_CHATS) || [];
  };

  const setChats = (updater: ApiChat[] | ((chats: ApiChat[]) => ApiChat[])) =>
    queryClient.setQueryData(LOCAL_CHATS, updater);

  const findChat = (chatId: string) => {
    const chats = getChats();

    return chats.find((chat) => chat.id === chatId);
  };

  const addChat = (addedChat: ApiChat) => {
    const existChat = findChat(addedChat.id);

    if (existChat) return;

    setChats(
      produce((chats) => {
        chats.push(addedChat);
      })
    );
  };

  const updateChat = (
    updateChatId: string,
    chatUpdater: Partial<ApiChat> | ChatUpdater
  ) => {
    const compareChatId = _buildCompareChatId(updateChatId);

    setChats((chats) =>
      chats.map((chat) => {
        if (compareChatId(chat)) {
          if (typeof chatUpdater === "function") {
            return chatUpdater(chat);
          }

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

  return {
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

export const useChats = () => {
  const queryClient = useQueryClient();

  useQuery({
    queryKey: LOCAL_CHATS,
    queryFn: () => queryClient.getQueryData<ApiChat[]>(LOCAL_CHATS) || [],
    initialData: [],
    staleTime: 0,
  });

  const {
    sortChatsDesc,
    getChats,
    setChats,
    findChat,
    updateChat,
    replaceChat,
    addChat,
    removeChat,
  } = buildChatsHandlers(queryClient);

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
