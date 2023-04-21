import { ApiChatMember } from "@apis/models/chat";
import { KEY_LIST_MEMBERS_OF_CHAT } from "@hooks/api-v2/keys";
import { useQueryClient } from "@tanstack/react-query";

export const useMembers = (chatId: string) => {
  const queryClient = useQueryClient();

  const members =
    queryClient.getQueryData<ApiChatMember[]>(
      KEY_LIST_MEMBERS_OF_CHAT(chatId)
    ) || [];

  const findMember = (memberId: string) => {
    return members.find((member) => member.id === memberId);
  };

  const findMemberByUserId = (userId: string) => {
    return members.find((member) => member.userId === userId);
  };

  return {
    members,
    findMember,
    findMemberByUserId,
  };
};
