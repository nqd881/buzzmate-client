import { useMessages } from "./use-messages";

export const useMessage = (chatId: string, messageId: string) => {
  const { findMessage } = useMessages(chatId);

  return findMessage(messageId);
};
