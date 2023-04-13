import { getMessagesApi } from "@apis/chat/get-messages";
import { convertApiMessage } from "@hooks/convert/message";
import { useMessages } from "@hooks/data/use-messages";
import { useQuery } from "@tanstack/react-query";

export const useMessagesQuery = (chatId: string) => {
  const { addMessage, findMessage } = useMessages(chatId);

  const query = useQuery({
    queryKey: ["chats", chatId, "messages"],
    queryFn: () =>
      getMessagesApi(chatId, {
        beforeTime: Date.now(),
        limit: 20,
      }),
    onSuccess: (data) => {
      data.map((apiMessage) => {
        const message = convertApiMessage(apiMessage);

        addMessage(message);
      });
    },
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    cacheTime: 10 * 60 * 1000,
    enabled: !!chatId,
  });

  return query;
};
