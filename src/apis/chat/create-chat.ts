import { ApiClient } from "@apis/base";

export type CreateChatPayload = {
  title: string;
  description: string;
  memberUserIds: string[];
};

export const createChatApi = (payload: CreateChatPayload) => {
  return ApiClient.post("/api/chat-svc/chats", payload);
};
