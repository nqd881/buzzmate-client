import { useChat } from "./useChat";
import { useMessages } from "./useMessages";

export const useLastMessage = (chatId: string) => {
  const chat = useChat(chatId);

  const { messages } = useMessages(chatId);

  return messages[messages.length - 1] || chat.lastMessage;
};
