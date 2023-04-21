import { useMessages } from "./useMessages";

export const useMessage = (chatId: string, messageId: string) => {
  const { messages, findMessage, findMessageIndex } = useMessages(chatId);

  const isLastMessage = findMessageIndex(messageId) === messages.length - 1;

  return { message: findMessage(messageId), isLastMessage };
};
