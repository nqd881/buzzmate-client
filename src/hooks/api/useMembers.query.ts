import { getMembersApi } from "@apis/chat/get-members";
import { convertApiMember } from "@hooks/convert/member";
import { useMembers } from "@hooks/user-members";
import { useQuery } from "@tanstack/react-query";

export const useMembersQuery = (chatId: string) => {
  const { addMember, findMember } = useMembers(chatId);

  const query = useQuery({
    queryKey: ["chats", chatId, "members"],
    queryFn: () => getMembersApi(chatId),
    onSuccess: (data) => {
      data.map((apiMember) => {
        const member = convertApiMember(apiMember);

        const existMember = findMember(member.id);

        if (existMember) return;

        addMember(member);
      });
    },
    enabled: !!chatId,
  });

  return query;
};
