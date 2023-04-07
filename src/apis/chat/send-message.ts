import { ApiClient } from "@apis/base";
import { ApiMessage } from "@apis/models/chat";

export type SendMessagePayload = {
  prepareMessageId?: string;
  message?: string;
  replyToMessageId?: string;
  files?: FileList;
};

export const sendMessageApi = (chatId: string, payload: SendMessagePayload) => {
  const formData = new FormData();

  const { prepareMessageId, message, replyToMessageId, files } = payload;

  if (prepareMessageId) formData.append("prepareMessageId", prepareMessageId);
  if (message) formData.append("message", message);
  if (replyToMessageId) formData.append("replyToMessageId", replyToMessageId);

  if (files) {
    for (let index = 0; index <= files.length; index++) {
      let file = files.item(index);

      formData.append("files", file);
    }
  }

  return ApiClient.post<ApiMessage, ApiMessage>(
    `/api/chat-svc/chats/${chatId}/messages`,
    formData
  );
};
