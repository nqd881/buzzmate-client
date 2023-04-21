import { useMembers } from "./useMembers";

export const useMember = (chatId: string, memberId: string) => {
  const { findMember } = useMembers(chatId);

  return findMember(memberId);
};
