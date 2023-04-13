import { Chat } from "src/models";
import { useChats } from "./use-chats";

export const useChat = (chatId: string) => {
  const { findChat, setChat } = useChats();

  const chat = findChat(chatId);

  const update = (updateFn: (chat: Chat) => Chat) => {
    setChat(chatId, updateFn);
  };

  return { chat, update };
};
