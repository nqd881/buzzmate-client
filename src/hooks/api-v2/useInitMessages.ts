import { getMessagesApi } from "@apis/chat/get-messages";
import { useMessages } from "@hooks/data-x/useMessages";
import { useQuery } from "@tanstack/react-query";

export const useInitialMessages = (chatId: string) => {
  const { messages, setMessages } = useMessages(chatId);

  const queryKey = ["chats", chatId, "messages", "initial"];

  useQuery({
    queryKey,
    queryFn: () =>
      getMessagesApi(chatId, { beforeTime: new Date(), limit: 20 }),
    onSuccess: (messages) => {
      setMessages(messages);
    },
    enabled: !Boolean(messages.length),
  });
};
