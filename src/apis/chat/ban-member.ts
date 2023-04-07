import { ApiClient } from "@apis/base";

export type BanMembersPayload = {
  memberIds: string[];
  reason?: string;
};

export const banMemberApi = (chatId: string, payload: BanMembersPayload) => {
  return ApiClient.post(`/api/chat-svc/chats/${chatId}/members/ban`, payload);
};
