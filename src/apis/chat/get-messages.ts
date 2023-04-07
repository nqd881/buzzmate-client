import { ApiClient } from "@apis/base";
import { ApiMessage } from "@apis/models/chat";

export type GetMessagesApiOptions = {
  ids?: string[];
  limit?: number;
  beforeTime?: number | Date;
  afterTime?: number | Date;
  beforeMessageId?: string;
  afterMessageId?: string;
};

export const getMessagesApi = (
  chatId: string,
  options?: GetMessagesApiOptions
) => {
  const params = new URLSearchParams();

  if (options?.limit)
    params.append("limit", options.limit.toString() ?? undefined);

  if (options?.beforeTime)
    params.append(
      "before_time",
      new Date(options.beforeTime).getTime().toString()
    );

  if (options?.afterTime)
    params.append(
      "after_time",
      new Date(options.afterTime).getTime().toString()
    );

  if (options?.beforeMessageId)
    params.append("before_message_id", options.beforeMessageId);

  if (options?.afterMessageId)
    params.append("before_message_id", options.afterMessageId);

  if (options?.ids) options.ids.forEach((id) => params.append("id", id));

  return ApiClient.get<ApiMessage[], ApiMessage[]>(
    `/api/chat-svc/chats/${chatId}/messages?${params.toString()}`
  );
};

export const getMessageApi = (chatId: string, messageId: string) => {
  return ApiClient.get<ApiMessage, ApiMessage>(
    `/api/chat-svc/chats/${chatId}/messages/${messageId}`
  );
};
