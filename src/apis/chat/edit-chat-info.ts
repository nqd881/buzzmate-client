import { ApiClient } from "@apis/base";

export type EditChatInfoPayload = {
  title?: string;
  description?: string;
};

export const editChatInfoApi = (
  chatId: string,
  payload: EditChatInfoPayload
) => {
  return ApiClient.patch(`/api/chat-svc/chats/${chatId}`, payload);
};
