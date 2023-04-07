import _ from "lodash";
import { Member } from "src/models";
import { useChat } from "./use-chat";

export const useMembers = (chatId: string) => {
  const { chat, update: updateChat } = useChat(chatId);

  const findMemberIndex = (memberId: string) => {
    return chat?.members.findIndex((member) => member.id === memberId);
  };

  const findMember = (memberId: string) => {
    return chat?.members.find((member) => member.id === memberId);
  };

  const findMemberByUserId = (userId: string) => {
    return chat?.members.find((member) => member.userId === userId);
  };

  const setMember = (
    memberId: string,
    updateMember: ((member: Member) => Member) | Partial<Member>,
    merge = false
  ) => {
    updateChat((chat) => ({
      ...chat,
      members: chat.members.map((member) => {
        if (member.id === memberId) {
          if (typeof updateMember === "function") return updateMember(member);

          return (
            !merge ? updateMember : _.merge(member, updateMember)
          ) as Member;
        }

        return member;
      }),
    }));
  };

  const addMember = (newMember: Member) => {
    updateChat((chat) => {
      const existMember = findMember(newMember.id);

      if (existMember) return chat;

      return {
        ...chat,
        members: [...chat.members, newMember],
      };
    });
  };

  const removeMember = (memberId: string) => {
    updateChat((chat) => ({
      ...chat,
      members: chat.members.filter((member) => member.id !== memberId),
    }));
  };

  return {
    members: chat?.members,
    findMemberIndex,
    findMember,
    findMemberByUserId,
    setMember,
    addMember,
    removeMember,
  };
};
