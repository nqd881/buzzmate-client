import { useChatsAtom } from "./chats";

export const useChatAtom = (chatId: string) => {
  const { findChat } = useChatsAtom();

  return findChat(chatId);
};
