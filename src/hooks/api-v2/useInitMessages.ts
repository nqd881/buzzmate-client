import { getMessagesApi } from "@apis/chat/get-messages";
import { useMessages } from "@hooks/data-x/useMessages";
import { useQuery } from "@tanstack/react-query";
import { remoteKey } from "./keys";

export const REMOTE_MESSAGES_INITIAL = (chatId: string) =>
  remoteKey((chatId: string) => [chatId, "messages", "initial"], chatId);

export const useInitialMessages = (chatId: string) => {
  const { messages, setMessages } = useMessages(chatId);

  useQuery({
    queryKey: REMOTE_MESSAGES_INITIAL(chatId),
    queryFn: () =>
      getMessagesApi(chatId, { beforeTime: new Date(), limit: 20 }),
    onSuccess: (messages) => {
      setMessages(messages);
    },
    enabled: !Boolean(messages.length),
  });
};
