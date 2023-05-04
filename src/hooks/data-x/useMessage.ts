import { useMessages } from "./useMessages";

export const useMessage = (chatId: string, messageId: string) => {
  const { findMessage, getLastMessage } = useMessages(chatId);

  const message = findMessage(messageId);

  const isLastMessage = message === getLastMessage();

  return { message, isLastMessage };
};
