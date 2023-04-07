import { getChatApi } from "@apis/chat/get-chat";
import { convertApiChat } from "@hooks/convert/chat";
import { useChat } from "@hooks/use-chat";
import { useChats } from "@hooks/use-chats";
import { useQuery } from "@tanstack/react-query";

export const useChatQuery = (chatId: string) => {
  const { addChat } = useChats();

  const { chat } = useChat(chatId);

  return useQuery({
    queryKey: ["chats", chatId],
    queryFn: () => getChatApi(chatId),
    onSuccess: (data) => {
      console.log("Fetch chat success");

      if (!chat) {
        addChat(convertApiChat(data));
      }
    },
  });
};
