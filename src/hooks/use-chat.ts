import { Chat } from "src/models";
import { useChats } from "./use-chats";

export const useChat = (chatId: string) => {
  const { findChat, setChats } = useChats();

  const chat = findChat(chatId);

  const update = (updateFn: (chat: Chat) => Chat) => {
    setChats((chats) =>
      chats.map((chat) => {
        if (chat.id === chatId) {
          return updateFn(chat);
        }

        return chat;
      })
    );
  };

  return { chat, update };
};
