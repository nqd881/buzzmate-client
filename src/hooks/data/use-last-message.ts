import { useMessage } from "./use-message";
import { useMessages } from "./use-messages";

export const useLastMessageId = (chatId: string) => {
  const { messages } = useMessages(chatId);

  return messages[messages.length - 1]?.id;
};

export const useLastMessage = (chatId: string) => {
  const lastMessageId = useLastMessageId(chatId);

  return useMessage(chatId, lastMessageId);
};
