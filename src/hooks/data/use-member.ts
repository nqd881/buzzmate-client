import { Member } from "src/models";
import { useMembers } from "./user-members";

export const useMember = (chatId: string, memberId: string) => {
  const { findMember, setMember } = useMembers(chatId);

  const member = findMember(memberId);

  const update = (updateFn: (member: Member) => Member) => {
    setMember(memberId, updateFn);
  };

  return { member, update };
};
