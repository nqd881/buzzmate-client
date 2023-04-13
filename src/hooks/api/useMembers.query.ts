import { getMembersApi } from "@apis/chat/get-members";
import { convertApiMember } from "@hooks/convert/member";
import { useMembers } from "@hooks/data/user-members";
import { useQuery } from "@tanstack/react-query";

export const useMembersQuery = (chatId: string) => {
  const { addMember } = useMembers(chatId);

  const query = useQuery({
    queryKey: ["chats", chatId, "members"],
    queryFn: () => getMembersApi(chatId),
    onSuccess: (data) => {
      data.map((apiMember) => {
        const member = convertApiMember(apiMember);

        addMember(member);
      });
    },
    enabled: !!chatId,
  });

  return query;
};
