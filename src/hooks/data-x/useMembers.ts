import { ApiMember } from "@apis/models/chat";
import { localKey } from "@hooks/api-v2/keys";
import { useQueryClient } from "@tanstack/react-query";

export const LOCAL_MEMBERS = (chatId: string) =>
  localKey((chatId) => [chatId, "members"], chatId);

export const useMembers = (chatId: string) => {
  const queryClient = useQueryClient();

  const queryKey = LOCAL_MEMBERS(chatId);

  const members = queryClient.getQueryData<ApiMember[]>(queryKey) || [];

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
