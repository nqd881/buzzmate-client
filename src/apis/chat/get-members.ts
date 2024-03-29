import { ApiClient } from "@apis/base";
import { ApiMember } from "@apis/models/chat";

export type GetMembersOptions = {
  ids?: string[];
  limit?: number;
};

export const getMembersApi = (chatId: string, options?: GetMembersOptions) => {
  const queries = new URLSearchParams();

  if (options?.ids) {
    options.ids.forEach((id) => {
      queries.append("ids", id);
    });
  }

  if (options?.limit) queries.append("limit", options?.limit.toString());

  return ApiClient.get<ApiMember[], ApiMember[]>(
    `/api/chat-svc/chats/${chatId}/members?${queries}`
  );
};
