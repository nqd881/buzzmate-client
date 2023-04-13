import { Message } from "src/models";
import { useMessages } from "./use-messages";

export const useMessage = (chatId: string, messageId: string) => {
  const { findMessage, setMessage } = useMessages(chatId);

  const message = findMessage(messageId);

  const update = (updateFn: (message: Message) => Message) => {
    return setMessage(messageId, updateFn);
  };

  return { message, update };
};
