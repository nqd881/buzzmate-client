import { useChatCtx } from "@contexts/ChatContext";
import _ from "lodash";
import { Chat } from "src/models";

export const useChats = () => {
  const { chats, setChats } = useChatCtx();

  const findChatIndex = (chatId: string) => {
    return chats.findIndex((chat) => chat?.id === chatId);
  };

  const findChat = (chatId: string) => {
    const index = findChatIndex(chatId);

    return chats[index];
  };

  const setChat = (
    chatId: string,
    updateChat: ((chat: Chat) => Chat) | Partial<Chat>,
    merge = false
  ) => {
    setChats((chats) =>
      chats.map((chat) => {
        if (chat.id === chatId) {
          if (typeof updateChat === "function") return updateChat(chat);

          return (!merge ? updateChat : _.merge(chat, updateChat)) as Chat;
        }

        return chat;
      })
    );
  };

  const addChat = (chat: Chat) => {
    setChats((chats) => {
      const existChat = findChat(chat.id);

      if (existChat) return chats;

      return [...chats, chat];
    });
  };

  const removeChat = (chatId: string) => {
    setChats((chats) => chats.filter((chat) => chat.id !== chatId));
  };

  return {
    chats,
    setChats,
    findChatIndex,
    findChat,
    setChat,
    addChat,
    removeChat,
  };
};
