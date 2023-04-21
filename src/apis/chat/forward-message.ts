import { ApiClient } from "@apis/base";

export type ForwardMessageApiOptions = {
  chatId: string;
  messageId: string;
  toChatId: string;
};

export const forwardMessageApi = (options: ForwardMessageApiOptions) => {
  const { chatId, messageId, toChatId } = options;

  return ApiClient.post<any, any>(
    `/api/chat-svc/chats/${chatId}/messages/${messageId}/forward`,
    {
      toChatId,
    }
  );
};
