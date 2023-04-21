import { ApiChat } from "@apis/models/chat";
import { useQueryClient } from "@tanstack/react-query";
import { useChats } from "./useChats";

export const useChat = (chatId: string) => {
  const { findChat } = useChats();

  return findChat(chatId);
};
