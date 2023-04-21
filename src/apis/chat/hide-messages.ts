import { ApiClient } from "@apis/base";

export type HideMessagesApiOptions = {
  chatId: string;
  messageIds: string[];
};

export const hideMessagesApi = (options: HideMessagesApiOptions) => {
  const { chatId, messageIds } = options;

  return ApiClient.patch(`/api/chat-svc/chats/${chatId}/messages/hide`, {
    messageIds,
  });
};
