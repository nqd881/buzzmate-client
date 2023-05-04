import { useChats } from "./useChats";

export const useChat = (chatId: string) => {
  const { findChat } = useChats();

  return findChat(chatId);
};
