import { useChat } from "./use-chat";
import { useCurrentChatId } from "./useCurrentChatId";

export const useCurrentChat = () => {
  const currentChatId = useCurrentChatId();

  return useChat(currentChatId);
};
