import { useChatCtx } from "@contexts/ChatContext";
import { Chat } from "src/models";

export const useChats = () => {
  const { chats, setChats } = useChatCtx();

  const findChatIndex = (chatId: string) => {
    return chats.findIndex((chat) => chat?.id === chatId);
  };

  const findChat = (chatId: string) => {
    const index = findChatIndex(chatId);

    return chats[index];
  };

  const addChat = (chat: Chat) => {
    // console.log(chat);

    setChats((chats) => {
      console.log(chats);

      return [...chats, chat];
    });
  };

  const removeChat = (chatId: string) => {
    setChats((chats) => chats.filter((chat) => chat.id !== chatId));
  };

  // const setChat = (chatId: string, chat: Chat) => {
  //   setChats((chats) => [...chats.filter((chat) => chat.id !== chatId), chat]);
  // };

  // const setChat = (chatId: string, updateFn: (chat: Chat) => Chat) => {
  //   setChats(chats => chats.map((chat) => {
  //     if (chat.id === chatId) {}
  //   }))
  // }

  return { chats, setChats, findChat, addChat, removeChat };
};
