import { ApiClient } from "@apis/base";
import { isUndefined } from "lodash";

export type PinMessagesApiOptions = {
  chatId: string;
  messageIds: string[];
  shouldPin?: boolean;
};

export const pinMessagesApi = (options: PinMessagesApiOptions) => {
  const { chatId, messageIds, shouldPin } = options || {};

  return ApiClient.post(`/api/chat-svc/chats/${chatId}/messages/pin`, {
    messageIds,
    shouldPin: isUndefined(shouldPin) ? false : Boolean(shouldPin),
  });
};
