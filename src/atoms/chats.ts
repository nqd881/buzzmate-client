import { ApiChat } from "@apis/models/chat";
import { produce } from "immer";
import _ from "lodash";
import { atom, useRecoilState } from "recoil";

export const ATOM_CHATS = "chats";

export const chatsAtom = atom<ApiChat[]>({
  key: ATOM_CHATS,
  default: [],
});

export type ChatUpdater = (chat: ApiChat) => void;

export const useChatsAtom = () => {
  const [chats, setChats] = useRecoilState(chatsAtom);

  const _compareChatId = (chatId: string) => (chat: ApiChat) =>
    chat.id === chatId;

  // const _sortChatsDesc = (chats: ApiChat[]) =>
  //   [...chats].sort((a, b) => {
  //     const aLastMessage =
  //       buildMessagesHandlers(queryClient, a.id).getLastMessage() ||
  //       a.lastMessage;

  //     const bLastMessage =
  //       buildMessagesHandlers(queryClient, b.id).getLastMessage() ||
  //       b.lastMessage;

  //     if (aLastMessage && bLastMessage)
  //       return compareDesc(
  //         new Date(aLastMessage?.date),
  //         new Date(bLastMessage?.date)
  //       );

  //     if (aLastMessage) return -1;

  //     if (bLastMessage) return 1;

  //     return 0;
  //   });

  const findChat = (chatId: string) => {
    return chats.find(_compareChatId(chatId));
  };

  const addChat = (newChat: ApiChat) => {
    setChats(
      produce((chats) => {
        const existingChat = chats.find(_compareChatId(newChat.id));

        if (!existingChat) chats.push(newChat);
      })
    );
  };

  const updateChat = (
    updateChatId: string,
    chatUpdater: Partial<ApiChat> | ChatUpdater
  ) => {
    setChats((chats) =>
      chats.map((chat) => {
        if (chat.id === updateChatId) {
          if (typeof chatUpdater === "function")
            return produce(chatUpdater)(chat);

          return _.merge(chat, chatUpdater);
        }

        return chat;
      })
    );
  };

  const replaceChat = (replaceChatId: string, replacedChat: ApiChat) => {
    setChats(
      produce((chats) => {
        const replaceIndex = chats.findIndex(_compareChatId(replaceChatId));

        chats[replaceIndex] = replacedChat;
      })
    );
  };

  const removeChat = (removeChatId: string) => {
    setChats((chats) =>
      chats.filter((chat) => !_compareChatId(removeChatId)(chat))
    );
  };

  const clearChats = () => {
    setChats([]);
  };

  return {
    chats,
    findChat,
    addChat,
    updateChat,
    replaceChat,
    removeChat,
    clearChats,
  };
};
